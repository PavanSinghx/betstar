import { Component } from '@angular/core';
import { NavController, ModalController, Events } from 'ionic-angular';
import { ImagePicker } from '@ionic-native/image-picker';

import { SignupComponent } from '../signup/signup'
import { PasswordResetComponent } from '../password-reset/password-reset'

import { ILogin } from '../../models/authentication';

import { AuthenticationServiceProvider } from '../../providers/authentication-service/authentication-service'

import { MainTabComponent } from '../../components/main-tab/main-tab'


@Component({
  selector: 'login',
  templateUrl: 'login.html'
})
export class LoginComponent {

  login: ILogin = {
    email: "",
    password: ""
  };

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public authService: AuthenticationServiceProvider, public events: Events) {
    console.log(document.getElementById("user"));// = (parseInt(document.getElementById("user").style.height.valueOf) *0.5).toString();
    this.events.subscribe('login:ok', () => {
      this.navCtrl.push(MainTabComponent);
    });
  }

  signup() {
    let profileModal = this.modalCtrl.create(SignupComponent);
    profileModal.present();
  }

  reset() {
    let profileModal = this.modalCtrl.create(PasswordResetComponent);
    profileModal.present();
  }

  signin() {
    this.authService.login(this.login.email, this.login.password);
  }

}
