import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './containers/auth/auth.component';
import { SharedModule } from 'src/shared/shared.module';

@NgModule({
  declarations: [
    // Containers
    AuthComponent
  ],
  imports: [
    CommonModule,
    
    SharedModule.forRoot()
  ]
})
export class AuthModule { }
