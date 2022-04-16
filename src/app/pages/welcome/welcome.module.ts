import { NgModule } from '@angular/core';

import { WelcomeRoutingModule } from './welcome-routing.module';

import { WelcomeComponent } from './welcome.component';
import {NzLayoutModule} from "ng-zorro-antd/layout";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzMenuModule} from "ng-zorro-antd/menu";
import {ListeClientComponent} from "../liste-client/liste-client.component";
import {NzTableModule} from "ng-zorro-antd/table";
import {NzDropDownModule} from "ng-zorro-antd/dropdown";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzSpinModule} from "ng-zorro-antd/spin";
import {NzUploadModule} from "ng-zorro-antd/upload";
import {NzMessageService} from "ng-zorro-antd/message";
import {ClientCommandesComponent} from "../liste-client/client-commandes/client-commandes.component";
import {NzCardModule} from "ng-zorro-antd/card";
import {NzTabsModule} from "ng-zorro-antd/tabs";
import {NzGridModule} from "ng-zorro-antd/grid";
import {MesureFilter} from "../liste-client/client-commandes/MesureFilter";


@NgModule({
  imports: [WelcomeRoutingModule, NzLayoutModule, NzIconModule, NzMenuModule, NzTableModule, NzDropDownModule, FormsModule, CommonModule, NzInputModule, NzButtonModule, NzSpinModule, NzUploadModule, NzCardModule, NzTabsModule, NzGridModule,],
  declarations: [WelcomeComponent, ListeClientComponent, ClientCommandesComponent, MesureFilter],
  providers: [NzMessageService]
})
export class WelcomeModule { }
