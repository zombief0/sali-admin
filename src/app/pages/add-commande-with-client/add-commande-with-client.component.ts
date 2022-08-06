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
      useMesureStandardPantalon: [false, [Validators.required]],
      useMesureStandardChemise: [false, [Validators.required]],
      useMesureStandardVeste: [false, [Validators.required]],
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

      if (this.validateForm.value.useMesureStandardPantalon && !client.existMesureStandardPantalon) {
        this.msg.error('Ce client ne possède pas de mesures standards pantalon' );
        this.isOkLoading = false;
        return;
      }

      if (this.validateForm.value.useMesureStandardVeste && !client.existMesureStandardVeste) {
        this.msg.error('Ce client ne possède pas de mesures standards veste' );
        this.isOkLoading = false;
        return;
      }

      if (this.validateForm.value.useMesureStandardChemise && !client.existMesureStandardChemise) {
        this.msg.error('Ce client ne possède pas de mesures standards chemise' );
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

  updateDateRetrait() {
    if (this.validateForm.value.dateCommande != null) {
      let dateRetrait = new Date(this.validateForm.value.dateCommande);
      switch (this.validateForm.value.echeance){

        case 'H24':
          dateRetrait.setTime(dateRetrait.getTime() + 24 * 3600 * 1000);
          this.validateForm.controls['dateRetrait'].setValue(dateRetrait);
          this.validateForm.controls['dateRetrait'].disable({onlySelf: true});


          break;
        case 'H48':
          dateRetrait.setTime(dateRetrait.getTime() + 48 * 3600 * 1000);
          this.validateForm.controls['dateRetrait'].setValue(dateRetrait);
          break;
        case 'H72':
          dateRetrait.setTime(dateRetrait.getTime() + 72 * 3600 * 1000);
          this.validateForm.controls['dateRetrait'].setValue(dateRetrait);

          break;
        case 'HNONE':
          this.validateForm.controls['dateRetrait'].setValue('');
          break;
      }
    }

  }

  updateReste() {
    if (this.validateForm.value.coutTotal != null && this.validateForm.value.avance != null) {
      this.validateForm.controls['reste'].setValue(this.validateForm.value.coutTotal - this.validateForm.value.avance);
    }
  }
}
