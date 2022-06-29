import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Commande} from "../../models/commande";
import {Client} from "../../models/client";
import {Router} from "@angular/router";
import {CommandeService} from "../../services/commande.service";
import {ClientService} from "../../services/client.service";
import {NzMessageService} from "ng-zorro-antd/message";
import {NzFormTooltipIcon} from "ng-zorro-antd/form";

@Component({
  selector: 'app-add-commande-with-client',
  templateUrl: './add-commande-with-client.component.html',
  styleUrls: ['./add-commande-with-client.component.css']
})
export class AddCommandeWithClientComponent implements OnInit {
  isVisible = false;
  isOkLoading = false;
  validateForm!: FormGroup;
  commande: Commande;
  clients: Client[];
  tooltipIcon: NzFormTooltipIcon = {
    type: 'info-circle',
    theme: 'twotone'
  };

  constructor(private fb: FormBuilder,
              private router: Router,
              private commandeService: CommandeService,
              private clientService: ClientService,
              private msg: NzMessageService) {
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      dateCommande: [null, [Validators.required]],
      client: [null, [Validators.required]],
      dateRetrait: [null],
      avance: [null],
      reste: [null],
      coutTotal: [null],
      notes: [null],
      echeance: ['HNONE', [Validators.required]],
      useMesureStandard: [false, [Validators.required]],
    });
    this.clientService.getAllClient().subscribe({
      next: value => {
        this.clients = value;
      }
    })
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  handleOk(): void {

    this.isOkLoading = true;
    if (this.validateForm.valid) {


      this.commande = this.validateForm.value;
      const client = this.validateForm.value.client;
      this.commande.client = null;
      if (this.validateForm.value.coutTotal != null
        && this.validateForm.value.avance != null) {
        this.validateForm.value.reste = this.validateForm.value.coutTotal - this.validateForm.value.avance;
      }

      if (this.validateForm.value.mesureStandards && !client.existMesureStandard) {
        this.msg.error('Ce client ne possède pas de mesures standards' );
        this.isOkLoading = false;
        return;
      }
      console.log(this.commande);
      this.commandeService.saveCommande(client.id, this.commande).subscribe({
        next: value => {
          this.isOkLoading = false;
          this.isVisible = false;
          this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
            this.router.navigate(['/commande']);
          });
        },
        error: err => {
          this.isOkLoading = false;
          console.log(err);


        }
      });

    } else {
      this.isOkLoading = false;
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({onlySelf: true});
        }
      });
    }
  }

  showModal(): void {
    this.isVisible = true;
  }

}
