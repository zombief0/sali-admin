import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Commande} from "../models/commande";

@Injectable({
  providedIn: 'root'
})
export class CommandeService {
  private COMMANDE_URL = environment.baseApiUrl + "commande/";
  constructor(private http: HttpClient) { }

  getCommandeClient(id: number): Observable<Commande[]> {
    return this.http.get<Commande[]>(this.COMMANDE_URL + id);
  }
}
