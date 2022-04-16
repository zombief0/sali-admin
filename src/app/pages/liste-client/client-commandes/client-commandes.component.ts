import { Component, OnInit } from '@angular/core';
import {Commande} from "../../../models/commande";
import {CommandeService} from "../../../services/commande.service";
import {ActivatedRoute} from "@angular/router";
import {Mesure} from "../../../models/mesure";

@Component({
  selector: 'app-client-commandes',
  templateUrl: './client-commandes.component.html',
  styleUrls: ['./client-commandes.component.css']
})
export class ClientCommandesComponent implements OnInit {
  listeCommande: Commande[];
  isLoading = false;
  listeMesurePantalon: Mesure[];
  listeMesureVeste: Mesure[];
  listeMesureChemise: Mesure[];
  constructor(private commandeService: CommandeService, private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(
      params => {
        const id = +params['id'];
        this.getCommandeByIdClient(id);
      }
    );
  }

  g

  getCommandeByIdClient(id: number) {
    this.isLoading = true;
    this.commandeService.getCommandeClient(id).subscribe({
      next: value => {
        this.listeCommande = value;
        this.isLoading= false;
      },
      error: err => {
        console.log(err);
        this.isLoading = false;
      }
    })
  }

  getMesurePantalonCommande(): Mesure[] {
    return this.listeCommande[0].mesures.filter((mesure) => mesure.typeMesure === 'PANTALON');
  }
}
