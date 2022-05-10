import {Component, Input, OnInit} from '@angular/core';
import {Commande} from "../../models/commande";
import {Client} from "../../models/client";

@Component({
  selector: 'app-commande-item',
  templateUrl: './commande-item.component.html',
  styleUrls: ['./commande-item.component.css']
})
export class CommandeItemComponent implements OnInit {
  index1 = 0;
  @Input() commande: Commande;
  @Input() index: number;
  constructor() { }

  ngOnInit(): void {
  }

}
