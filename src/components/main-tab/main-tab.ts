import { Component, ViewChild } from '@angular/core';

import { Platform, Tabs, LoadingController } from 'ionic-angular';

import { PublicStreamComponent } from '../public-stream/public-stream'
import { PrivateStreamComponent } from '../private-stream/private-stream'
import { AuthenticationServiceProvider } from '../../providers/authentication-service/authentication-service'

import { ImagePicker } from '@ionic-native/image-picker';
import { Base64 } from '@ionic-native/base64';
import { File } from '@ionic-native/file';

import { FirebaseApp } from 'angularfire2';

@Component({
  templateUrl: 'main-tab.html'
})
export class MainTabComponent {

  tab1 = PublicStreamComponent;
  tab2 = PrivateStreamComponent;
  local_dl = "";
  local_u = "";
  dlink: any = "";
  filePath: string;// = this.aServ.global_username;

  constructor(public aServ: AuthenticationServiceProvider, public imagePicker: ImagePicker, public f: File, public loadingCtrl: LoadingController, public fs: FirebaseApp) {
    this.local_dl = this.aServ.global_dp;
    this.filePath = this.aServ.global_dp;
    this.local_u = this.aServ.global_username;
  }

  updateProfile() {

    if (this.local_u.length > 3) {
      let loader = this.loadingCtrl.create({ content: "Uploading Profile, Please Wait!" });
      loader.present({});
      this.fs.storage().ref('/' + this.local_u + "" + Math.floor(Math.random() * 999999))
        .put(this.dlink)
        .then(data => {
          //this.f.removeFile(this.f.cacheDirectory, "betstar");
          this.f.writeFile(this.f.cacheDirectory, "betstar", this.local_u + "$" + data.downloadURL, { replace: true })
            .then(r => {
              loader.dismiss();
              this.aServ.global_username = this.local_u;
              this.aServ.global_dp = data.downloadURL;
              alert("Successfully Updated Profile");
            })

            .catch(r => alert(r.message))
        }).catch(err => alert(err.message))
    }
    else {
      alert("Username must be over 3 characters!")
    }

  }

  selectPhoto() {

    this.imagePicker.getPictures({
      maximumImagesCount: 1
    }).then((results) => {
      for (var i = 0; i < results.length; i++) {
        this.filePath = results[i];
      }
      let n = this.filePath.lastIndexOf("/") + 1;
      let fn = (this.filePath.substring(n));
      let dr = (this.filePath.substring(0, n));
      this.f.readAsArrayBuffer(dr, fn)
        .then(data => {
          this.dlink = data;
        })
    }, (err) => { alert(err); });
  }

}