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

  logOut(): void {
    const auth = getAuth();
    signOut(auth).then(() => {
      localStorage.clear();
      this.store.set('connectedUser', undefined);
    }).catch((error) => {
      console.log(error);
      this.notificationService.showError(this.translate.instant('errors.logout'));
    });
  }
}

