import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { User } from '../_models/user';
import { customConfig } from '../custumConfig';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import "firebase/auth";

@Injectable()
export class AuthService {
  Urlbase: string = customConfig.baseUrl;
  main_id = 0;
  user: User = {};
  authstatus: boolean = false;
  constructor(public authServ: AuthenticationService, public afAuth: AngularFireAuth,
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


  doGoogleLogin(){
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      this.afAuth.auth
      .signInWithPopup(provider)
      .then(res => {
        resolve(res.user);
      })
    })
  }


doTwitterLogin(){
  return new Promise<any>((resolve, reject) => {
    let provider = new firebase.auth.TwitterAuthProvider();
    firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      /** @type {firebase.auth.OAuthCredential} */
      var credential = result.credential;
      resolve(result.user);
      // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
      // You can use these server side with your app's credentials to access the Twitter API.
      // var token = credential.accessToken;
      // var secret = credential.secret;

      // The signed-in user info.
      var user = result.user;
      // ...
    }).catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  })

}

  doFacebookLogin(){
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.FacebookAuthProvider();
      this.afAuth.auth
      .signInWithPopup(provider)
      .then(res => {
        resolve(res.user);
      }, err => {
        console.log(err);
        reject(err);
      })
    })
 }


}
