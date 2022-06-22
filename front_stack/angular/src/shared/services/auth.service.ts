import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from 'src/store';
import Config from 'src/app/config/serverUrls.json';

// Firebase
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, signOut } from "firebase/auth";

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
    private router: Router,
    private store: Store,
    private http: HttpClient) {
  }

  auth(userInfo: any): Observable<void> {
    return this.http.post(`${this.baseRoute}`, userInfo)
      .pipe(
        map((result: any) => {
          if (result) {
            localStorage.setItem('token', result.token);
            const user = new User(result.user);
            this.store.set('connectedUser', user);
            this.router.navigateByUrl('cms');
          }
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

