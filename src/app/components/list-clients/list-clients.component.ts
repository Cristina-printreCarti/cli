import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-list-clients',
  templateUrl: './list-clients.component.html',
  styleUrls: ['./list-clients.component.css'],
})
export class ListClientsComponent implements OnInit {
  clients: any[] = [];

  constructor(private _clientService: ClientService, private toastr: ToastrService, private router: Router) { 
    
  }

  ngOnInit(): void {
    this.getClients();
  }

  getClients(){
    this._clientService.getClients().subscribe(data => {
      this.clients = [];
      data.forEach((element:any) => {
        this.clients.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
      console.log(this.clients);
    })
  }

  deleteClient(id: string){
    this._clientService.deleteClient(id).then(() => {
      console.log('Client deleted');
      this.toastr.error('Client deleted with success!', 'Client deleted', {positionClass: 'toast-bottom-right'});
    }).catch(err => {
      console.log(err);
    })
  }

}
