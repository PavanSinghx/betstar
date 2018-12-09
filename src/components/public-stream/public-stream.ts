import { Component, AfterContentInit, ViewChild } from '@angular/core';
import { Events, LoadingController, Content } from 'ionic-angular';
import 'rxjs/add/operator/map';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { TabServiceProvider } from '../../providers/tab-service/tab-service';
import { AuthenticationServiceProvider } from '../../providers/authentication-service/authentication-service';


import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free';

import { NativeKeyboard } from '@ionic-native/native-keyboard';


const bannerConfig: AdMobFreeBannerConfig = {
  isTesting: true,
  autoShow: true,
  id: "ca-app-pub-3081206448509772/9513311331"
};

@Component({
  selector: 'public-stream',
  templateUrl: 'public-stream.html'
})
export class PublicStreamComponent implements AfterContentInit {
@ViewChild(Content) content: Content;


  ngAfterContentInit() {
    this.update();
  }

  chatMessage = {
    message: ""
  };
  listing = [];
  items: FirebaseListObservable<any>;
  cancelLoader = false;
  h:HTMLElement = document.getElementById('content');

  scrollToBottom() {
      setInterval(() => {
          console.log("AIIII");
      });
  }

  constructor(public tabService: TabServiceProvider, public fd: AngularFireDatabase,
    public events: Events, public loadingCtrl: LoadingController, public authService: AuthenticationServiceProvider, public admobFree: AdMobFree, private nativeKeyboard: NativeKeyboard) {

    this.listing = this.tabService.listing;

    this.admobFree.banner.config(bannerConfig);

    this.admobFree.banner.prepare()
      .then(() => {
        this.admobFree.banner.show();
        // banner Ad is ready
        // if we set autoShow to false, then we will need to call the show method here
      })
      .catch(e => console.log(e));
  }


  getPos(i, msg) {
    if (msg.name == this.authService.global_username)
      return "profile-pic right";
    return "profile-pic left";
  }

  getPos1(i, msg) {
    if (msg.name == this.authService.global_username)
      return "chat-bubble right";
    return "chat-bubble left";
  }

  update() {
    this.items = this.fd.list('post/', { preserveSnapshot: true });
    this.items.subscribe(snapshots => {
      this.listing = [];
      snapshots.forEach(snapshot => {
        this.listing.push(snapshot.val());
      });
     // this.listing.reverse();
    })
  }

  sendMessage() {
    if (this.chatMessage.message != "") {
      this.tabService.setItem(this.chatMessage.message);
      this.chatMessage.message = "";
    }
    else {
      alert("You cannot send a blank message!");
    }
  }

}
