import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/shared/services/auth.service';

import { GoogleAuthProvider } from "firebase/auth";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NotificationService } from 'src/shared/services/notification.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private angularFireAuth: AngularFireAuth,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
  }

  private connect(userInfos: any): void {
    if (userInfos) this.authService.auth(userInfos).subscribe((result) => { console.log(result); });
  }

  async onGoogleAuth(): Promise<void> {
    const provider = new GoogleAuthProvider();
    this.angularFireAuth.signInWithPopup(provider)
      .then(async (result: any) => {
        this.connect(result.additionalUserInfo);
      }).catch((error) => {
        console.log(error);
        this.notificationService.showError('Une erreur est survenue lors de la connexion Google!');
      });
  }
  
  onTwitterAuth(): void {
    this.authService.twitterConnection();
  }
}
