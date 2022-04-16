import {Component, OnInit} from '@angular/core';
import {Client} from "../../models/client";
import {ClientService} from "../../services/client.service";
import {NzMessageService} from "ng-zorro-antd/message";
import {NzUploadChangeParam} from "ng-zorro-antd/upload";
import {Router} from "@angular/router";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-liste-client',
  templateUrl: './liste-client.component.html',
  styleUrls: ['./liste-client.component.css']
})
export class ListeClientComponent implements OnInit {
  searchValue = '';
  urlBaseExcel = environment.baseApiUrl + "excel";
  visible = false;
  listeClients: Client[];
  listOfDisplayData = [];
  isLoading = false;

  constructor(private clientService: ClientService,
              private msg: NzMessageService, private router: Router,) {
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.clientService.getAllClient().subscribe({
        next: value => {
          this.isLoading = false;
          this.listeClients = value;
          this.listOfDisplayData = [...this.listeClients];

        },
        error: err => {
          console.log(err);
          this.isLoading = false;
        }
      }
    );
  }

  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.visible = false;
    console.log(this.searchValue);

    this.listOfDisplayData = this.listeClients
      .filter((item: Client) => item.noms.includes(this.searchValue.toUpperCase()));
  }

  handleChange(info: NzUploadChangeParam): void {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      this.msg.success(`${info.file.name} Chargement Réussi`);
      location.reload();
    } else if (info.file.status === 'error') {
      this.msg.error(`${info.file.name} Chargement échoué`);
    }
  }
}
