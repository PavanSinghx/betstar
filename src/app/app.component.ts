import { Component, OnInit } from '@angular/core';
import { Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { SignupComponent } from '../components/signup/signup';
import { MainTabComponent } from '../components/main-tab/main-tab'
import { ImagePicker } from '@ionic-native/image-picker';
import { File } from '@ionic-native/file';

import { TabServiceProvider } from '../providers/tab-service/tab-service';
import { AuthenticationServiceProvider } from '../providers/authentication-service/authentication-service';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Firebase } from '@ionic-native/firebase';

import { Http } from '@angular/http';

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

//import { FCM } from '@ionic-native/fcm';

declare var cordova: any;

@Component({
  templateUrl: 'app.html'
})
export class MyApp implements OnInit {
  rootPage: any;
  items: FirebaseListObservable<any>;


  ngOnInit() {
    this.tabService.getItems();
    this.tabService.getPredictions();
  }
  getwifiinfo(){

    alert(cordova.plugins.firebase);

  }  


  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
    public imagePicker: ImagePicker, public tabService: TabServiceProvider, public f: File,
    public a: AuthenticationServiceProvider, public fd: AngularFireDatabase, public fba: Firebase) {

    platform.ready().then(() => {

      this.fba.getToken()
      //.then(data=>alert(data))
      //.catch(data=>alert(data))

      if (this.f.checkFile(this.f.cacheDirectory, "betstar")) {
        this.f.readAsText(this.f.cacheDirectory, "betstar")
          .then(data => {
            if (data.length > 1) {
              let info = data.split("$");
              this.a.global_username = info[0];
              this.a.global_dp = info[1];
              this.rootPage = MainTabComponent;
            }
          })
          .catch((c) => this.rootPage = MainTabComponent)
      }
      else {
        this.rootPage = MainTabComponent;
      }

      this.items = this.fd.list('post/', { preserveSnapshot: true });
      this.items.subscribe(snapshots => {
        this.tabService.listing = [];
        snapshots.forEach(snapshot => {
          this.tabService.listing.push(snapshot.val());
        });
        splashScreen.hide();
      })

      statusBar.styleDefault();

    });

  /*  fcm.subscribeToTopic('marketing');

    fcm.getToken().then(token => {
      backend.registerToken(token);
    })

    fcm.onNotification().subscribe(data => {
      if (data.wasTapped) {
        console.log("Received in background");
      } else {
        console.log("Received in foreground");
      };
    })

    fcm.onTokenRefresh().subscribe(token => {
      backend.registerToken(token);
    })

    fcm.unsubscribeFromTopic('marketing');*/

  }
}

