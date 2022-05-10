import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CommandeService} from "../../../services/commande.service";
import {Commande} from "../../../models/commande";

@Component({
  selector: 'app-details-commande',
  templateUrl: './details-commande.component.html',
  styleUrls: ['./details-commande.component.css']
})
export class DetailsCommandeComponent implements OnInit {
  commande: Commande;
  isLoading = false;

  constructor(private activateRoute: ActivatedRoute,
              private commandeService: CommandeService) {
  }

  ngOnInit(): void {
    this.activateRoute.params.subscribe(
      params => {
        const id = +params['id'];
        this.getCommandeById(id);
      }
    );
  }

  getCommandeById(id: number) {
    this.isLoading = true;
    this.commandeService.getCommandeById(id)
      .subscribe({
          next: value => {
            this.commande = value;
            this.isLoading = false;
          }
        }
      )
  }
}
