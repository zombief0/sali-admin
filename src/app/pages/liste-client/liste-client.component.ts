import {Component, OnInit} from '@angular/core';
import {Client} from "../../models/client";
import {ClientService} from "../../services/client.service";

@Component({
  selector: 'app-liste-client',
  templateUrl: './liste-client.component.html',
  styleUrls: ['./liste-client.component.css']
})
export class ListeClientComponent implements OnInit {
  searchValue = '';
  visible = false;
  listeClients: Client[];
  listOfDisplayData = [];
  isLoading = false;

  constructor(private clientService: ClientService) {
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
      .filter((item: Client) => {
          return (item.noms + ' ' + item.prenoms).includes(this.searchValue.toUpperCase());
        }
      );
  }

}
