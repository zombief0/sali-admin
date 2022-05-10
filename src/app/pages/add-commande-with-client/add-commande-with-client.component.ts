import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Commande} from "../../models/commande";
import {Client} from "../../models/client";
import {Router} from "@angular/router";
import {CommandeService} from "../../services/commande.service";
import {ClientService} from "../../services/client.service";

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

  constructor(private fb: FormBuilder,
              private router: Router,
              private commandeService: CommandeService,
              private clientService: ClientService) {
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      dateCommande: [null, [Validators.required]],
      client: [null, [Validators.required]],
      dateRetrait: [null, [Validators.required]],
      avance: [null],
      reste: [null],
      coutTotal: [null],
      notes: [null],
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
      const idClient = this.validateForm.value.client;
      this.commande.client = null;
      this.commandeService.saveCommande(idClient, this.commande).subscribe({
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
