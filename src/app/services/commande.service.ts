import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Commande} from "../models/commande";
import {MessageModel} from "../models/message-model";
import {CommandesClient} from "../models/commandes-client";

@Injectable({
  providedIn: 'root'
})
export class CommandeService {
  private COMMANDE_URL = environment.baseApiUrl + "commande/";
  constructor(private http: HttpClient) { }

  getCommandeClient(idClient: number): Observable<CommandesClient> {
    return this.http.get<CommandesClient>(this.COMMANDE_URL + "by-client/"+ idClient);
  }

  getAllCommande(): Observable<Commande[]> {
    return this.http.get<Commande[]>(this.COMMANDE_URL);
  }

  getCommandeById(id: number): Observable<Commande> {
    return this.http.get<Commande>(this.COMMANDE_URL + id);
  }

  saveCommande(idClient: number, commande: Commande): Observable<MessageModel> {
    return this.http.post<MessageModel>(this.COMMANDE_URL + idClient, commande);
  }

  updateCommande(id: number, commande: Commande): Observable<MessageModel> {
    return this.http.put<MessageModel>(this.COMMANDE_URL + id, commande);
  }

  livrerCommande(id: number): Observable<any>{
    return this.http.patch<any>(this.COMMANDE_URL + "livrer-non-livrer/" + id, null);
  }
}
