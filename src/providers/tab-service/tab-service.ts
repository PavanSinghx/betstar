import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { AuthenticationServiceProvider } from '../authentication-service/authentication-service'


import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';


@Injectable()
export class TabServiceProvider {

  predictions = [];
  listing = [];
  items: FirebaseListObservable<any>;

  constructor(public fd: AngularFireDatabase, public fa: AngularFireAuth, public authService: AuthenticationServiceProvider) {
    console.log('Hello TabServiceProvider Provider');
  }

  setItem(msg) {
    this.fd.app.database().ref('post/').push({
      name: this.authService.global_username,
      photoURL: this.authService.global_dp,
      message: msg
    })
  }

  getItems() {
    this.items = this.fd.list('post/', { preserveSnapshot: true });
    this.items.subscribe(snapshots => {
      this.listing = [];
      snapshots.forEach(snapshot => {
        this.listing.push(snapshot.val());
      });
      //this.listing.reverse();
    })
  }

  getPredictions() {
    this.items = this.fd.list('predictions/', { preserveSnapshot: true });
    this.items.subscribe(snapshots => {
      this.predictions = [];
      snapshots.forEach(snapshot => {
        this.predictions.push(snapshot.val());
      });
    })
  }

}
