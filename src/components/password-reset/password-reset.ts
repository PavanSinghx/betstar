import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular'

import { AuthenticationServiceProvider } from '../../providers/authentication-service/authentication-service'

import { IResetPassword } from '../../models/authentication';

@Component({
  selector: 'password-reset',
  templateUrl: 'password-reset.html'
})
export class PasswordResetComponent {

  passwordReset: IResetPassword = {
    email: ""
  }

  constructor(public authService: AuthenticationServiceProvider, public viewCtrl: ViewController) {
    console.log('Hello PasswordResetComponent Component');
  }

  goBack() {
    this.viewCtrl.dismiss();
  }
  
  reset() {
    this.authService.reset(this.passwordReset.email);
  }

}
