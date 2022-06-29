import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Client} from "../../models/client";
import {ClientService} from "../../services/client.service";
import {Router} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
  selector: 'app-add-edit-client',
  templateUrl: './add-edit-client.component.html',
  styleUrls: ['./add-edit-client.component.css']
})
export class AddEditClientComponent implements OnInit {
  isVisible = false;
  isOkLoading = false;
  validateForm!: FormGroup;
  @Input() client: Client;
  @Input() editMode: number;

  constructor(private fb: FormBuilder,
              private clientService: ClientService,
              private router: Router, private msg: NzMessageService) {
  }

  ngOnInit(): void {
    if (this.editMode != 1) {
      this.validateForm = this.fb.group({
        email: [null, [Validators.email]],
        noms: [null, [Validators.required]],
        sexe: ['FEMININ', [Validators.required]],
        prenoms: [null],
        telephone: [null, [Validators.required]],
        anniversaire: [null],
      });
    } else {
      this.validateForm = this.fb.group({
        email: [this.client.email, [Validators.email]],
        noms: [this.client.noms, [Validators.required]],
        sexe: [this.client.sexe, [Validators.required]],
        prenoms: [this.client.prenoms],
        telephone: [this.client.telephone, [Validators.required]],
        anniversaire: [this.client.anniversaire],
      });
    }

  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isOkLoading = true;
    if (this.validateForm.valid) {

      if (this.editMode == 1) {
        const id = this.client.id;
        this.client = this.validateForm.value;
        this.clientService.updateClient(this.client, id).subscribe({
          next: value => {
            this.isOkLoading = false;
            this.isVisible = false;
            this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
              this.router.navigate(['/client']);
            });
          },
          error: err => {
            this.isOkLoading = false;
            console.log(err);
            const message = err.error.message;
            if (message === 'CLIENT_ALREADY_EXIST') {
              this.msg.error('Un client de même nom et prénom existe déjà');
            }
          }
        })
      } else {
        this.client = this.validateForm.value;
        this.clientService.saveClient(this.client).subscribe({
          next: value => {
            this.isOkLoading = false;
            this.isVisible = false;
            this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
              this.router.navigate(['/client']);
            });
          },
          error: err => {
            this.isOkLoading = false;
            console.log(err);
            const message = err.error.message;
            if (message === 'CLIENT_ALREADY_EXIST') {
              this.msg.error('Un client de même nom et prénom existe déjà');
            }

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

  handleCancel(): void {
    this.isVisible = false;
  }

}
