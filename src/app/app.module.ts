import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, NavController } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { ImagePicker } from '@ionic-native/image-picker';
import { Base64 } from '@ionic-native/base64';
import { File } from '@ionic-native/file';
import { Camera, CameraOptions } from '@ionic-native/camera';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { LoginComponent } from '../components/login/login';
import { SignupComponent } from '../components/signup/signup';
import { PasswordResetComponent } from '../components/password-reset/password-reset';

import { PublicStreamComponent } from '../components/public-stream/public-stream'
import { PrivateStreamComponent } from '../components/private-stream/private-stream'
import { MainTabComponent } from '../components/main-tab/main-tab'

import { PrivateAccessComponent } from '../components/private-access/private-access'


import { AuthenticationServiceProvider } from '../providers/authentication-service/authentication-service';
import { TabServiceProvider } from '../providers/tab-service/tab-service';


import { AngularFireModule } from 'angularfire2';

import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';

import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free';
import { FCM } from '@ionic-native/fcm';
import { Firebase } from '@ionic-native/firebase';
import { NativeKeyboard } from '@ionic-native/native-keyboard';

export const firebaseConfig = {
    apiKey: "AIzaSyCmxdMhhWWXoC6pkq-G3Y1r9txt6xQx0U0",
    authDomain: "betstar-e5059.firebaseapp.com",
    databaseURL: "https://betstar-e5059.firebaseio.com",
    projectId: "betstar-e5059",
    storageBucket: "betstar-e5059.appspot.com",
    messagingSenderId: "463675748101"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginComponent,
    SignupComponent,
    PasswordResetComponent,
    PrivateStreamComponent,
    PublicStreamComponent,
    MainTabComponent,
    PrivateAccessComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {

      scrollAssist: false,    // Valid options appear to be [true, false]
      autoFocusAssist: true, // Valid options appear to be ['instant', 'delay', false]
      tabsPlacement: 'top',
      tabsHideOnSubPages: true


    }),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginComponent,
    SignupComponent,
    PasswordResetComponent,
    PrivateStreamComponent,
    PublicStreamComponent,
    MainTabComponent,
    PrivateAccessComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthenticationServiceProvider,
    ImagePicker,
    Base64,
    TabServiceProvider,
    Camera,
    File,
    AdMobFree,
    FCM,
    Firebase,
    NativeKeyboard
  ]
})
export class AppModule { }
