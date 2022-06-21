import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { browserSessionPersistence, TwitterAuthProvider } from "firebase/auth";
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

// Services
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private readonly baseRoute: string = environment.serverUrl + Config.prefix + Config.auth;
  
  constructor(
    private translate: TranslateService,
    private readonly notificationService: NotificationService,
    private angularFireAuth: AngularFireAuth,
    private store: Store,
    private http: HttpClient) {
  }

  auth(userInfo: any): Observable<User> {
    return this.http.post(`${this.baseRoute}`, userInfo)
      .pipe(
        map((connectedUser: any) => {
          localStorage.setItem('token', connectedUser.token);
          const user = new User(connectedUser.user);
          this.store.set('connectedUser', user);
          return user;
        }),
        catchError(err => throwError(err))
      )
  }

  googleConnection(): any {
    this.angularFireAuth.setPersistence(browserSessionPersistence)
      .then(() => {

    })
  }
  
  twitterConnection(): any {
    const provider = new TwitterAuthProvider();
    this.angularFireAuth.signInWithPopup(provider)
      .then((result: any) => {
        console.log(result);
        // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
        // You can use these server side with your app's credentials to access the Twitter API.
        const credential = TwitterAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const secret = credential.secret;
        //
        // // The signed-in user info.
        // const user = result.user;
        console.log(credential, token, secret)
        // ...
      }).catch((error) => {
        this.notificationService.showError('Une erreur est survenue lors de la connexion Google!');
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      //const email = error.customData.email;
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

