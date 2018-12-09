import { Component } from '@angular/core';

import { IPrivateCard } from '../../models/authentication'

import { TabServiceProvider } from '../../providers/tab-service/tab-service'
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'private-access',
  templateUrl: 'private-access.html'
})
export class PrivateAccessComponent {

  items: FirebaseListObservable<any>;

  predictions = [];

  gameCards: IPrivateCard[] = [
    { description: "Manchester United vs Liverpool", headerOne: "Prediction 3 - 1", headerTwo: "Another header", color: "danger", isChecked: true },
    { description: "Real Mandrid vs Barcelona", headerOne: "Prediction 0 - 1", headerTwo: "Another header", color: "primary", isChecked: true },
    { description: "Arsenal vs Barcelona", headerOne: "Prediction 9 - 1", headerTwo: "Another header", color: "primary", isChecked: false }
  ];

  constructor(public tabService: TabServiceProvider, public fd: AngularFireDatabase) {
    console.log('Hello PrivateAccessComponent Component');
    if (this.tabService.predictions.length != 0) {
      this.predictions = this.tabService.predictions;
      console.log(this.predictions);
    }
    else {
      this.items = this.fd.list('predictions/', { preserveSnapshot: true });
      this.items.subscribe(snapshots => {
        this.predictions = [];
        snapshots.forEach(snapshot => {
          this.predictions.push(snapshot.val());
        });
      })
    }
  }

  getImg(item) {
    if(item.color=="primary")
      return "assets/img/checked.png";
    else if(item.color=="danger")
      return "assets/img/cancel.png";
    else
      return "assets/img/null.png";
  }

}
