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
      phone: ['', Validators.required],
      address: ['', Validators.required]
    })
    this.id = this.aRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.editClient();
  }

  addClient(){
    this.submitted = true;

    if(this.creatClient.invalid){
      return;
    }
    const client: any = {
      name: this.creatClient.value.name,
      phone: this.creatClient.value.phone,
      address: this.creatClient.value.address,
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
      this._clientService.getClient(this.id).subscribe(data => {
        console.log(data.payload.data()['name']);
        this.creatClient.setValue({
          name: data.payload.data()['name'],
          phone: data.payload.data()['phone'],
          address: data.payload.data()['address']
        })
      })
    }
  }


  


}
