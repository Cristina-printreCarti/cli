import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private firestore: AngularFirestore) { }

  addClient(client: any): Promise<any>{
    return this.firestore.collection('clients').add(client);
  }

  getClients():Observable<any>{
    return this.firestore.collection('clients', ref => ref.orderBy('name', 'asc')).snapshotChanges();
  }

  deleteClient(id: string){
    return this.firestore.collection('clients').doc(id).delete();
  }

  getClient(id: string): Observable<any>{
    return this.firestore.collection('clients').doc().snapshotChanges();
  }

}
