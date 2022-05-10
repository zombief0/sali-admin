import {NgModule} from '@angular/core';

import {WelcomeRoutingModule} from './welcome-routing.module';

import {WelcomeComponent} from './welcome.component';
import {NzLayoutModule} from "ng-zorro-antd/layout";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzMenuModule} from "ng-zorro-antd/menu";
import {ListeClientComponent} from "../liste-client/liste-client.component";
import {NzTableModule} from "ng-zorro-antd/table";
import {NzDropDownModule} from "ng-zorro-antd/dropdown";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
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
import {NzBreadCrumbModule} from "ng-zorro-antd/breadcrumb";
import {NzToolTipModule} from "ng-zorro-antd/tooltip";
import {CommandeItemComponent} from "../commande-item/commande-item.component";
import {ListeCommandeComponent} from "../liste-commande/liste-commande.component";
import {DetailsCommandeComponent} from "../liste-commande/details-commande/details-commande.component";
import {AddEditClientComponent} from "../add-edit-client/add-edit-client.component";
import {NzModalModule} from "ng-zorro-antd/modal";
import {NzFormModule} from "ng-zorro-antd/form";
import {AddEditCommandeComponent} from "../add-edit-commande/add-edit-commande.component";
import {NzDatePickerModule} from "ng-zorro-antd/date-picker";
import {NzInputNumberModule} from "ng-zorro-antd/input-number";
import {AddEditMesureComponent} from "../add-edit-mesure/add-edit-mesure.component";
import {NzRadioModule} from "ng-zorro-antd/radio";
import {NzSelectModule} from "ng-zorro-antd/select";
import {AddCommandeWithClientComponent} from "../add-commande-with-client/add-commande-with-client.component";


@NgModule({
  imports: [WelcomeRoutingModule, NzLayoutModule, NzIconModule, NzMenuModule, NzTableModule, NzDropDownModule, FormsModule, CommonModule, NzInputModule, NzButtonModule, NzSpinModule, NzUploadModule, NzCardModule, NzTabsModule, NzGridModule, NzBreadCrumbModule, NzToolTipModule, NzModalModule, NzFormModule, ReactiveFormsModule, NzDatePickerModule, NzInputNumberModule, NzRadioModule, NzSelectModule,],
  declarations: [
    WelcomeComponent,
    ListeClientComponent,
    ClientCommandesComponent,
    MesureFilter,
    CommandeItemComponent,
    ListeCommandeComponent,
    DetailsCommandeComponent,
    AddEditClientComponent,
    AddEditCommandeComponent,
    AddEditMesureComponent,
    AddCommandeWithClientComponent
  ],
  providers: [NzMessageService]
})
export class WelcomeModule {
}
