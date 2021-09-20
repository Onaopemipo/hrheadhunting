import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { User } from '../_models/user';
import { customConfig } from '../custumConfig';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
// import firebase from 'firebase/compat/app';

// import { AngularFireAuth } from 'angularfire2/auth';
import { Auth } from "firebase/auth";
// v9 compat packages are API compatible with v8 code
import { getAuth, signInWithPopup, FacebookAuthProvider, TwitterAuthProvider, GoogleAuthProvider } from "firebase/auth";

@Injectable()
export class AuthService {
  Urlbase: string = customConfig.baseUrl;
  main_id = 0;
  user: User = {};
  authstatus: boolean = false;
  Gprovider = new GoogleAuthProvider();
  constructor(public authServ: AuthenticationService, private fAuth: AngularFireAuth,
    public http: HttpClient, public navCtrl: Router) { }

  public async isAuthenticated() {
    return new Promise((resolve, reject) => {
      this.authServ.getuser().then(async (users: any) => {
        if (users) {
          if (users.length > 0) {
            //  console.log(users[0]);
            this.user = users[0];
            // console.log(this.user)
            if (this.user) {
              const auStatus = true;
              resolve(true);
              this.authstatus = auStatus;
            } else {
              this.authServ.clearusers();
              resolve(false);
            }
          } else {
            this.authServ.clearusers();
            resolve(false);
          }
       } else {
        this.authServ.clearusers();
        resolve(false);
      }

      });
    });

  }

  logout() {
    this.authServ.clearusers();
    this.navCtrl.navigate(['auth']);
  }

   private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      return of(error);
    };
  }

 async doGoogleLogin(){
  return new Promise<any>((resolve, reject) => {
    const provider = new GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    this.fAuth.signInWithPopup(provider)
    .then(res => {
      resolve(res.user);
      console.log('Google', res.user)
    })
  }).catch((error) => {
    // Handle Errors here.
    let errorCode = error.code;
    console.log(errorCode)
    let errorMessage = error.message;
    // The email of the user's account used.
    let email = error.email;
    console.log(email)
    // The firebase.auth.AuthCredential type that was used.
    let credential = error.credential;
    // ...
    console.log(CredentialsContainer)
  });

  }



async doTwitterLogin(){
  return new Promise<any>((resolve, reject) => {
  const auth = getAuth();
  const provider = new TwitterAuthProvider();
    this.fAuth.signInWithPopup(provider)
    .then((result) => {
      // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
      // You can use these server side with your app's credentials to access the Twitter API.
      // const credential = TwitterAuthProvider.credentialFromResult(result);
      // const token = credential.accessToken;
      // const secret = credential.secret;

      // The signed-in user info.
      resolve(result.user);
      // ...
    })
  }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = TwitterAuthProvider.credentialFromError(error);
      // ...
    });


}

  async doFacebookLogin(){
    return new Promise<any>((resolve, reject) => {
    const auth = getAuth();
    const provider = new FacebookAuthProvider();
    this.fAuth.signInWithPopup(provider)
      .then((result) => {
        // The signed-in user info.
        resolve(result.user);
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        // const credential = FacebookAuthProvider.credentialFromResult(result);
        // const accessToken = credential.accessToken;

        // ...
      })
    })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = FacebookAuthProvider.credentialFromError(error);

        // ...
      });
 }

}
