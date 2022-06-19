import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TwitterAuthProvider } from "firebase/auth";
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Store } from 'src/store';

// Firebase
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, signOut, GoogleAuthProvider } from "firebase/auth";

import Config from 'src/app/config/serverUrls.json';

// Models
import { User } from 'src/shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private readonly baseRoute: string = environment.serverUrl + Config.prefix + Config.auth + '/eee';
  
  constructor(
    private translate: TranslateService,
    private angularFireAuth: AngularFireAuth,
    private store: Store,
    private http: HttpClient) {
  }
  
  googleConnection(): any {
    const provider = new GoogleAuthProvider();
    this.angularFireAuth.signInWithPopup(provider)
      .then((result) => {
        console.log(result)
        return this.http.post(`${this.baseRoute}`, result.additionalUserInfo)
          .pipe(
            map((connectedUser: any) => {
              localStorage.setItem('token', connectedUser.token);
              const user = new User(connectedUser.user);
              this.store.set('connectedUser', user);
            }),
            catchError(err => throwError(err))
          )
      }).catch((error) => {
        console.log(error);
    });
  
  }
  
  twitterConnection(): any {
    const provider = new TwitterAuthProvider();
    this.angularFireAuth.signInWithPopup(provider)
      .then((result) => {
        console.log(result);
        // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
        // You can use these server side with your app's credentials to access the Twitter API.
        //const credential = TwitterAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        // const secret = credential.secret;
        //
        // // The signed-in user info.
        // const user = result.user;
        // ...
      }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = TwitterAuthProvider.credentialFromError(error);
      // ...
    });
  }
  
  logOut(): void {
    const auth = getAuth();
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  }
}

