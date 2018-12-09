import { Injectable, Injector } from '@angular/core';
import { ViewController, NavController, Events } from 'ionic-angular'
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { IRegister, ILogin } from '../../models/authentication';


import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseApp } from 'angularfire2';

import { File } from '@ionic-native/file';

import * as firebase from 'firebase';


@Injectable()
export class AuthenticationServiceProvider {

  constructor(public afAuth: AngularFireAuth, public events: Events, public f: File, public fs: FirebaseApp) {
    console.log('Hello AuthenticationServiceProvider Provider');
  }

  global_username = "u";
  global_dp = "u";

  login(email, password) {
    if ((email != "") || (password != "")) {
      if (password.length >= 8 && this.hasNumber(password)) {
        this.afAuth.auth.signInWithEmailAndPassword(email, password)
          .then((userInfo) => {
            // if(firebase.auth().currentUser.emailVerified){
            this.events.publish('login:ok');
            console.log("ol");
            alert('Logged in successfully!');

            // }
            // else{
            // alert('Please Verify Your Email!');
            // }
          })
          .catch(
          err => alert(err)
          );
      }
      else {
        alert('Password must contain a number and must be over at least 8 characters!')
      }
    }
    else {
      alert('These fields cannot be empty!');
    }
  }

  signup(name, surname, email, password, confirm, photourl) {

    alert(photourl);
    if(name.length>3){
      
    this.fs.storage().ref('/' + name+""+Math.floor(Math.random()*999999))
      .putString(photourl, 'base64', { contentType: 'image/png' })
      .then(data => {
        alert(data);
        this.f.writeExistingFile(this.f.cacheDirectory, "betstar", name + "$" + data.downloadURL)
          .then(r => {
            alert("Successfully Logged in!");
            //push navctrl
          })

          .catch(r => alert("Could not Sign you in! Please check your internet connection!"))
      }).catch(err => alert(err.message))
    }
    else{
      alert("Username must be ober 3 characters!")
    }

  }

  reset(email) {
    firebase.auth().sendPasswordResetEmail(email)
      .then(() => {
        alert('Password Successfully Reset!');
        //this.goBack();
      })
      .catch((err) => alert(err));
  }

  hasNumber(myString) {
    return /\d/.test(myString);
  }

}
