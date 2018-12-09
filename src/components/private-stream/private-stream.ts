import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { ViewController, Events, NavController } from 'ionic-angular'

import { PrivateAccessComponent } from '../../components/private-access/private-access'
import { AuthenticationServiceProvider } from '../../providers/authentication-service/authentication-service';


@Component({
  selector: 'private-stream',
  templateUrl: 'private-stream.html'
})
export class PrivateStreamComponent {

  items: FirebaseListObservable<any>;

  password = {
    text: ""
  }
  accessCodes = [];
  predictions = [];

  name = "";

  constructor(public af: AngularFireAuth, public navCtrl: NavController, public afd: AngularFireDatabase, public aService:AuthenticationServiceProvider) {
    this.name = aService.global_username;
    this.requestKeys();
  }

  requestKeys() {
    this.items = this.afd.list('keys/', { preserveSnapshot: true });
    this.items.subscribe(snapshots => {
      snapshots.forEach(snapshot => {
        //this.accessCodes.push(snapshot.val());
        let keys = Object.keys(snapshot.val());
        keys.forEach(element => {
          this.accessCodes.push(snapshot.val()[element]+"");
        });
      });
    })
    console.log(this.accessCodes);
  }

  access() {
    if (this.accessCodes.length != 0) {
     console.log(this.password.text);
      if (this.accessCodes.indexOf(this.password.text)>-1) {

        this.navCtrl.push(PrivateAccessComponent);
      }
      else {
        alert("Invalid Passcode!");
      }
    }
    else{
      console.log("Requesting Keys");
    }
  }

}
