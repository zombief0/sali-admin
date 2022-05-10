import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Mesure} from "../models/mesure";
import {Observable} from "rxjs";
import {MessageModel} from "../models/message-model";

@Injectable({
  providedIn: 'root'
})
export class MesureService {
  private MESURE_URL = environment.baseApiUrl + 'mesure/'

  constructor(private http: HttpClient) { }

  saveMesure(idCommande: number, mesure: Mesure): Observable<MessageModel> {
    return this.http.post<MessageModel>(this.MESURE_URL + idCommande, mesure);
  }

  updateMesure(id: number, mesure: Mesure): Observable<MessageModel> {
    return this.http.put<MessageModel>(this.MESURE_URL + id, mesure);
  }

  deleteMesure(id: number): Observable<MessageModel> {
    return this.http.delete<MessageModel>(this.MESURE_URL + id);
  }
}
