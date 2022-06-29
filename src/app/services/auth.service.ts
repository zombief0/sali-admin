import {Injectable} from '@angular/core';
import {BehaviorSubject, catchError, Observable, tap, throwError} from "rxjs";
import {UserModel} from "../models/user.model";
import {AuthResponseModel} from "../models/auth-response.model";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject<UserModel>(null);
  tokenExpirationTimer: any;
  constructor(private http: HttpClient, private router: Router) { }

  login(login: string, password: string): Observable<AuthResponseModel> {
    const URL_LOGIN = environment.baseApiUrl + "utilisateur/login";
    return this.http.post<AuthResponseModel>(URL_LOGIN, {
      login,
      password
    }).pipe(catchError(err => {
      let error = 'Erreur inconnue';
      if (err.status === 401 || err.status === 403) {
        error = 'Username ou password invalide';
      }
      return throwError(() => error);
    }), tap(responseData => {
      const expirationDate =  new Date( new Date().getTime() + responseData.expiresIn);
      const userModel = new UserModel();
      userModel.username = responseData.username;
      userModel.role = responseData.role;
      userModel.token = responseData.token;
      userModel.tokenExpirationDate = expirationDate;
      this.user.next(userModel);
      localStorage.setItem("userData", JSON.stringify(userModel));
    }))
  }

  logout(): void {
    this.user.next(null);
    this.router.navigate(['/login']);
    localStorage.removeItem('userData');

    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogin(): void {
    const userString: {
      role: string,
      token: string,
      username: string,
      tokenExpirationDate: string
    } = JSON.parse(localStorage.getItem('userData'));

    if (!userString) {
      return;
    }

    const loadedUser = new UserModel();
    loadedUser.role = userString.role;
    loadedUser.username = userString.username;
    loadedUser.token = userString.token;
    loadedUser.tokenExpirationDate = new Date(userString.tokenExpirationDate);

    if (loadedUser.getToken) {
      this.user.next(loadedUser);
      const expirationDuration = new Date(userString.tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  autoLogout(expirationDuration: number): void {
    console.log(expirationDuration);
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }
}
