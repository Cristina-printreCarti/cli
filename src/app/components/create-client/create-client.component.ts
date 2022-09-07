import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
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


  constructor(private fb: UntypedFormBuilder, private _clientService: ClientService, private toastr: ToastrService ) { 
    this.creatClient = this.fb.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required]
    })
  }

  ngOnInit(): void {
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
    
    this._clientService.addClient(client).then(() =>{
      this.toastr.success('Client added with success!', 'Client added')
    }).catch(err => {
      console.log(err);
    })

  }

}
