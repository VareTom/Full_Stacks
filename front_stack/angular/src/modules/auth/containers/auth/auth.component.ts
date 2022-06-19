import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/shared/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }
  
  onGoogleAuth(): void {
    this.authService.googleConnection();
  }
  
  onTwitterAuth(): void {
    this.authService.twitterConnection();
  }
}
