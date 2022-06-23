import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

// Services
import { AuthService } from 'src/shared/services/auth.service';
import { NotificationService } from 'src/shared/services/notification.service';

// Google
import { GoogleAuthProvider, TwitterAuthProvider } from "firebase/auth";
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  private readonly jwtHelper = new JwtHelperService();

  constructor(
    private authService: AuthService,
    private angularFireAuth: AngularFireAuth,
    private router: Router,
    private translate: TranslateService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      const token = this.jwtHelper.decodeToken(localStorage.getItem('token'))
      this.authService.get(token.userUuid).subscribe({
        next: () => this.router.navigateByUrl('stacks'),
        error: () => { }
      });
    }
  }

  private connect(userInfos: any): void {
    if (userInfos) this.authService.auth(userInfos).subscribe(() => { });
  }

  async onGoogleAuth(): Promise<void> {
    const provider = new GoogleAuthProvider();
    this.angularFireAuth.signInWithPopup(provider)
      .then((result) => {
        console.log(result);
        const userInfos = {
          isNewUser: result.additionalUserInfo.isNewUser,
          provider: result.additionalUserInfo.providerId,
          profile: result.additionalUserInfo.profile
        }
        this.connect(userInfos);
      }).catch((error) => {
        console.log(error);
        this.notificationService.showError(this.translate.instant('errors.login.google'));
      });
  }
  
  onTwitterAuth(): void {
    const provider = new TwitterAuthProvider();
    this.angularFireAuth.signInWithPopup(provider)
      .then((result) => {
        console.log(result);
        const userInfos = {
          isNewUser: result.additionalUserInfo.isNewUser,
          username: result.additionalUserInfo.username,
          provider: result.additionalUserInfo.providerId,
          profile: result.additionalUserInfo.profile
        }
        this.connect(userInfos);
      }).catch((error) => {
        console.log(error);
        this.notificationService.showError(this.translate.instant('errors.login.twitter'));
      });
  }
}
