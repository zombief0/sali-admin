import {Component, Input, OnInit} from '@angular/core';
import {Commande} from "../../models/commande";
import {Client} from "../../models/client";
import {Mesure} from "../../models/mesure";
import {MesureService} from "../../services/mesure.service";
import {Router} from "@angular/router";
import {NzModalRef, NzModalService} from "ng-zorro-antd/modal";

@Component({
  selector: 'app-commande-item',
  templateUrl: './commande-item.component.html',
  styleUrls: ['./commande-item.component.css']
})
export class CommandeItemComponent implements OnInit {
  index1 = 0;
  @Input() commande: Commande;
  @Input() selectedClient: Client;
  @Input() index: number;
  confirmModal?: NzModalRef;
  constructor(private mesureService: MesureService,
              private router: Router, private modalService: NzModalService) { }

  ngOnInit(): void {
  }

  deleteMesure(mesure: Mesure) {
    this.confirmModal = this.modalService.confirm({
      nzTitle: 'Voulez vous vraiment vous supprimer?',
      nzContent: '',
      nzOnOk: () => {
        this.mesureService.deleteMesure(mesure.id).subscribe({
          next: value => {
            this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
              this.router.navigate(['/commande/' + this.commande.id]);
            });
          }
        });
      }
    });
  }

}
