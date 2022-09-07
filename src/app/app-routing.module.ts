import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateClientComponent } from './components/create-client/create-client.component';
import { ListClientsComponent } from './components/list-clients/list-clients.component';

const routes: Routes = [
  { path: '', redirectTo: 'list-clients', pathMatch: 'full'},
  { path: 'list-clients', component: ListClientsComponent },
  { path: 'create-client', component: CreateClientComponent },
  { path: '**', redirectTo: 'list-clients', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
