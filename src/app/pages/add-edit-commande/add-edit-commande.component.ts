import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Commande} from "../../models/commande";
import {Router} from "@angular/router";
import {CommandeService} from "../../services/commande.service";
import {ClientService} from "../../services/client.service";
import {Client} from "../../models/client";
import {NzFormTooltipIcon} from "ng-zorro-antd/form";
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
  selector: 'app-add-edit-commande',
  templateUrl: './add-edit-commande.component.html',
  styleUrls: ['./add-edit-commande.component.css']
})
export class AddEditCommandeComponent implements OnInit {
  isVisible = false;
  isOkLoading = false;
  validateForm!: FormGroup;
  @Input() commande: Commande;
  @Input() editMode: number;
  @Input() selectedClient: Client;
  tooltipIcon: NzFormTooltipIcon = {
    type: 'info-circle',
    theme: 'twotone'
  };
  constructor(private fb: FormBuilder, private router: Router,
              private commandeService: CommandeService, private msg: NzMessageService) { }

  ngOnInit(): void {
    if (this.editMode != 1) {
      this.validateForm = this.fb.group({
        dateCommande: [null, [Validators.required]],
        echeance: ['HNONE', [Validators.required]],
        mesureStandards: [false, [Validators.required]],
        dateRetrait: [null],
        avance: [null],
        reste: [null],
        coutTotal: [null],
        notes: [null],
      });
    } else {

      this.validateForm = this.fb.group({
        dateCommande: [this.commande.dateCommande, [Validators.required]],
        echeance: [this.commande.echeance, [Validators.required]],
        useMesureStandard: [this.commande.useMesureStandard, [Validators.required]],
        dateRetrait: [this.commande.dateRetrait],
        avance: [this.commande.avance],
        reste: [this.commande.reste],
        coutTotal: [this.commande.coutTotal],
        notes: [this.commande.notes],
      });
    }

  }

  handleCancel(): void {
    this.isVisible = false;
  }

  handleOk(): void {

    this.isOkLoading = true;
    if (this.validateForm.valid) {

      if (this.validateForm.value.coutTotal != null
        && this.validateForm.value.avance != null) {
        this.validateForm.value.reste = this.validateForm.value.coutTotal - this.validateForm.value.avance;
      }

      if (this.validateForm.value.useMesureStandard && !this.selectedClient.existMesureStandard) {
        this.msg.error('Ce client ne possède pas de mesures standards' );
        this.isOkLoading = false;
        return;
      }
      if (this.editMode == 1) {
        const id = this.commande.id;
        this.commande = this.validateForm.value;
        this.commandeService.updateCommande(id, this.commande).subscribe({
          next: value => {
            this.isOkLoading = false;
            this.isVisible = false;
            this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
              this.router.navigate(['/commande/' + id]);
            });
          },
          error: err => {
            this.isOkLoading = false;
            console.log(err);

          }
        })
      } else {
        this.commande = this.validateForm.value;
        this.commandeService.saveCommande(this.selectedClient.id, this.commande).subscribe({
          next: value => {
            this.isOkLoading = false;
            this.isVisible = false;
            this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
              this.router.navigate(['/client/' + this.selectedClient.id + '/commandes']);
            });
          },
          error: err => {
            this.isOkLoading = false;
            console.log(err);


          }
        })
      }
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
