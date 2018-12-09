import { Component } from '@angular/core';
import { ViewController, Events, NavController, LoadingController } from 'ionic-angular'

import { AuthenticationServiceProvider } from '../../providers/authentication-service/authentication-service'

import { IRegister } from '../../models/authentication';

import { ImagePicker } from '@ionic-native/image-picker';
import { Base64 } from '@ionic-native/base64';

import { MainTabComponent } from '../../components/main-tab/main-tab'

import { FirebaseApp } from 'angularfire2';

import { File } from '@ionic-native/file';

@Component({
  selector: 'signup',
  templateUrl: 'signup.html'
})
export class SignupComponent {

  dlinl: any = "";
  register: IRegister = {
    name: "",
    surname: "",
    email: "",
    password: "",
    confirmPassword: "",
    profilePictureStorageURL: "",
    localPictureStorageURL: "assets/img/user.png"
  };


  constructor(public imagePicker: ImagePicker, public navCtrl: NavController,
    public viewCtrl: ViewController, public base64: Base64, public events: Events, public f: File,
    public fs: FirebaseApp, public aService: AuthenticationServiceProvider, public loadingCtrl: LoadingController) {
  }

  signup() {
    //let r = this.register;
    //  this.authService.signup(r.name, r.surname, r.email, r.password, r.confirmPassword, r.profilePictureStorageURL);
  }

  goBack() {
    this.viewCtrl.dismiss();
  }

  selectPhoto() {
    let filePath: string;
    this.imagePicker.getPictures({
      maximumImagesCount: 1
    }).then((results) => {
      for (var i = 0; i < results.length; i++) {
        filePath = results[i];
        this.register.localPictureStorageURL = results[i];
      }

      let n = this.register.localPictureStorageURL.lastIndexOf("/") + 1;
      let fn = (this.register.localPictureStorageURL.substring(n));
      let dr = (this.register.localPictureStorageURL.substring(0, n));

      this.f.readAsArrayBuffer(dr, fn)
        .then(data => {
          this.dlinl = data;
        })

    }, (err) => { alert(err); });
  }



  evt() {

    if (this.register.name.length > 3) {
      let loader = this.loadingCtrl.create({ content: "Saving and Uploading Profile!" });
      loader.present();
      this.fs.storage().ref('/' + this.register.name + "" + Math.floor(Math.random() * 999999))
        .put(this.dlinl)
        .then(data => {
          this.f.writeExistingFile(this.f.cacheDirectory, "betstar", this.register.name + "$" + data.downloadURL)
            .then(r => {
              loader.dismiss();
              //salert("Successfully Logged in!");
              this.aService.global_username = this.register.name;
              this.aService.global_dp = data.downloadURL;
              this.navCtrl.push(MainTabComponent);
            })

            .catch(r => {
              alert(r.message);
              loader.dismiss();
            })
        }).catch(err => {
          alert(err.message);
          loader.dismiss();
        })
    }
    else {
      alert("Username must be over 3 characters!")
    }

  }




}
