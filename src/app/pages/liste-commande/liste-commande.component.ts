import {Component, OnInit} from '@angular/core';
import {CommandeService} from "../../services/commande.service";
import {Commande} from "../../models/commande";
import {Client} from "../../models/client";
import {environment} from "../../../environments/environment";
import {NzUploadChangeParam} from "ng-zorro-antd/upload";
import {NzMessageService} from "ng-zorro-antd/message";
import {Router} from "@angular/router";

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
  urlBaseExcel = environment.baseApiUrl + "excel";

  constructor(private commandeService: CommandeService,
              private msg: NzMessageService, private router: Router) {
  }

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
        return (item.client.noms + ' ' + item.client.prenoms).includes(this.searchValue.toUpperCase());
      });
  }

  handleChange(info: NzUploadChangeParam): void {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      this.msg.success(`${info.file.name} Chargement Réussi`);
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate(['/commande']);
      });
    } else if (info.file.status === 'error') {
      this.msg.error(`${info.file.name} Chargement échoué`);
    }
  }

  getBackgroundColor(commande: Commande): string {
    let dateEcheance = new Date(commande.dateCommande);
    let dateActuelle = new Date();
    dateActuelle.setHours(17, 0,0);
    switch (commande.echeance) {
      case 'H24':
        dateEcheance = new Date(dateEcheance.getTime() + 24 * 3600 * 1000);
        if (dateActuelle.getTime() <= dateEcheance.getTime())
          return 'tomato';
        break;
      case 'H48':
        dateEcheance = new Date(dateEcheance.getTime() + 48 * 3600 * 1000);
        if (dateActuelle.getTime() <= dateEcheance.getTime())
          return '#FFFE71';
        break;
      case 'H72':
        dateEcheance = new Date(dateEcheance.getTime() + 72 * 3600 * 1000);
        if (dateActuelle.getTime() <= dateEcheance.getTime())
          return '#299617';
        break;
    }
    return 'white';
  }
}
