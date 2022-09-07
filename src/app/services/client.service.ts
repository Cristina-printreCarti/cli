import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private firestore: AngularFirestore) { }

  addClient(client: any): Promise<any>{
    return this.firestore.collection('clients').add(client);
  }
}
