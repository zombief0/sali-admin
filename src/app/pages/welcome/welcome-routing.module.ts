import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListeClientComponent} from "../liste-client/liste-client.component";
import {WelcomeComponent} from "./welcome.component";
import {ClientCommandesComponent} from "../liste-client/client-commandes/client-commandes.component";
import {ListeCommandeComponent} from "../liste-commande/liste-commande.component";
import {DetailsCommandeComponent} from "../liste-commande/details-commande/details-commande.component";

const routes: Routes = [
  { path: '', component: WelcomeComponent,
  children: [
    {path: 'client', pathMatch: 'full', component: ListeClientComponent},
    {path: 'commande', pathMatch: 'full', component: ListeCommandeComponent},
    {path: 'commande/:id',component: DetailsCommandeComponent},
    {path: 'client/:id/commandes', component: ClientCommandesComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WelcomeRoutingModule { }
