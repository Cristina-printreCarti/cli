import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list-clients',
  templateUrl: './list-clients.component.html',
  styleUrls: ['./list-clients.component.css']
})
export class ListClientsComponent implements OnInit {
  items: Observable<any[]>;

  constructor(firestore: AngularFirestore) { 
    this.items = firestore.collection('clients').valueChanges();
  }

  ngOnInit(): void {
  }

}
