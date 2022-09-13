import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.css']
})
export class CreateClientComponent implements OnInit {
  creatClient: UntypedFormGroup;
  submitted = false;
  loading = false;
  id: string | null;
  title = "Add client";

  constructor(private fb: UntypedFormBuilder, private _clientService: ClientService, private router: Router, private toastr: ToastrService, private aRoute: ActivatedRoute) { 
    this.creatClient = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      county: ['', Validators.required],
      iban1: ['', Validators.required],
      iban2: ['', Validators.required]
    })
    this.id = this.aRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.editClient();
  }

  addEditClient(){
    this.submitted = true;

    if(this.creatClient.invalid){
      return;
    }

    if(this.id === null){
      this.addClient();
    }else{
      this.edClient(this.id);
    }

  }

  addClient(){
    const client: any = {
      name: this.creatClient.value.name,
      email: this.creatClient.value.email,
      phone: this.creatClient.value.phone,
      address: this.creatClient.value.address,
      city: this.creatClient.value.city,
      county: this.creatClient.value.county,
      iban1: this.creatClient.value.iban1,
      iban2: this.creatClient.value.iban2,
    }
    
    this.loading = true;
    this._clientService.addClient(client).then(() =>{
      this.toastr.success('Client added with success!', 'Client added', {positionClass: 'toast-bottom-right'});
      this.loading = false;
      this.router.navigate(['/list-clients'])
    }).catch(err => {
      console.log(err);
      this.loading = false;
    })
  }

  editClient(){
    this.title = 'Edit client';
    if(this.id !== null){
      this.loading = true;
      this._clientService.getClient(this.id).subscribe(data => {
        this.loading = false;
        this.creatClient.setValue({
          name: data.payload.data()['name'],
          email: data.payload.data()['email'],
          phone: data.payload.data()['phone'],
          address: data.payload.data()['address'],
          city: data.payload.data()['city'],
          county: data.payload.data()['county'],
          iban1: data.payload.data()['iban1'],
          iban2: data.payload.data()['iban2']
        })
      })
    }
  }


  edClient(id:string){
    this.loading = true;
    const client: any = {
      name: this.creatClient.value.name,
      phone: this.creatClient.value.phone,
      address: this.creatClient.value.address,
    }
    this._clientService.actualClient(id, client);
    this._clientService.actualClient(id, client).then( () => {
      this.loading =false;
      this.toastr.info('Client updated', 'Client modified',{
        positionClass: 'toast-bottom-right'
      })
      this.router.navigate(['/list-clients'])
    })
    
  }


}
