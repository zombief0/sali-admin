import { Component, OnInit } from '@angular/core';
import {Commande} from "../../../models/commande";
import {CommandeService} from "../../../services/commande.service";
import {ActivatedRoute} from "@angular/router";
import {CommandesClient} from "../../../models/commandes-client";

@Component({
  selector: 'app-client-commandes',
  templateUrl: './client-commandes.component.html',
  styleUrls: ['./client-commandes.component.css']
})
export class ClientCommandesComponent implements OnInit {
  listeCommande: CommandesClient;
  isLoading = false;
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

}
