import { Component, OnInit } from '@angular/core';
import {CommandeService} from "../../services/commande.service";
import {Commande} from "../../models/commande";
import {Client} from "../../models/client";

@Component({
  selector: 'app-liste-commande',
  templateUrl: './liste-commande.component.html',
  styleUrls: ['./liste-commande.component.css']
})
export class ListeCommandeComponent implements OnInit {
  searchValue = '';
  commandes: Commande[];
  isLoading = false;
  listOfDisplayData = [];
  visible = false;
  constructor(private commandeService: CommandeService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.commandeService.getAllCommande().subscribe({
      next: value => {
        this.isLoading = false;
        this.commandes = value;
        this.listOfDisplayData = [...this.commandes];
      },
      error: err => {
        console.log(err);
      }
    })
  }

  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.visible = false;
    console.log(this.searchValue);

    this.listOfDisplayData = this.commandes
      .filter((item: Commande) => {
        return (item.client.noms+' ' +item.client.prenoms).includes(this.searchValue.toUpperCase());
      });
  }
}
