import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Client} from "../models/client";
import {MessageModel} from "../models/message-model";

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private CLIENT_URL = environment.baseApiUrl + "client";
  constructor(private http: HttpClient) { }

  getAllClient(): Observable<Client[]> {
    return this.http.get<Client[]>(this.CLIENT_URL);
  }

  saveClient(client: Client): Observable<MessageModel>{
    return this.http.post<MessageModel>(this.CLIENT_URL, client);
  }

  updateClient(client: Client, id: number): Observable<null> {
    return this.http.put<null>(this.CLIENT_URL + '/' + id, client);
  }

}
