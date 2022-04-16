import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListeClientComponent} from "../liste-client/liste-client.component";
import {WelcomeComponent} from "./welcome.component";
import {ClientCommandesComponent} from "../liste-client/client-commandes/client-commandes.component";

const routes: Routes = [
  { path: '', component: WelcomeComponent,
  children: [
    {path: 'client', pathMatch: 'full', component: ListeClientComponent},
    {path: 'client/:id/commandes', component: ClientCommandesComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WelcomeRoutingModule { }
