import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Mesure} from "../../models/mesure";
import {MesureService} from "../../services/mesure.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-edit-mesure',
  templateUrl: './add-edit-mesure.component.html',
  styleUrls: ['./add-edit-mesure.component.css']
})
export class AddEditMesureComponent implements OnInit {
  isVisible = false;
  isOkLoading = false;
  validateForm!: FormGroup;
  typeMesureChemise = ['AB', 'B', 'C', 'CA', 'CD', 'COL',
    'E', 'L', 'LM', 'P', 'T', 'TM', 'V', 'm'];
  @Input() editMode: number;
  @Input() mesure: Mesure;
  @Input() idCommande: number;

  constructor(private fb: FormBuilder,
              private mesureService: MesureService,
              private router: Router) { }

  ngOnInit(): void {
    if (this.editMode != 1) {
      this.validateForm = this.fb.group({
        typeVetement: ['CHEMISE', [Validators.required]],
        typeMesure: [null, [Validators.required]],
        valeur: [null, [Validators.required]],
      });
    } else {
      this.validateForm = this.fb.group({
        typeVetement: [this.mesure.typeVetement, [Validators.required]],
        typeMesure: [this.mesure.typeMesure, [Validators.required]],
        valeur: [this.mesure.valeur, [Validators.required]],
      });
    }

  }

  showModal(): void {
    this.isVisible = true;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  handleOk(): void {
    this.isOkLoading = true;
    if (this.validateForm.valid) {

      if (this.editMode == 1) {
        const id = this.mesure.id;
        this.mesure = this.validateForm.value;
        this.mesureService.updateMesure(id, this.mesure).subscribe({
          next: value => {
            this.isOkLoading = false;
            this.isVisible = false;
            this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
              this.router.navigate(['/commande/' + this.idCommande]);
            });
          },
          error: err => {
            this.isOkLoading = false;
            console.log(err);

          }
        })
      } else {
        this.mesure = this.validateForm.value;
        this.mesureService.saveMesure(this.idCommande, this.mesure).subscribe({
          next: value => {
            this.isOkLoading = false;
            this.isVisible = false;
            this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
              this.router.navigate(['/commande/' + this.idCommande]);
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

  loadType() {

  }
}
