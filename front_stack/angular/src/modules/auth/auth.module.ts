import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

// Custom Modules
import { SharedModule } from 'src/shared/shared.module';

// Containers
import { AuthComponent } from './containers/auth/auth.component';

const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
  }
]

@NgModule({
  declarations: [
    // Containers
    AuthComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    
    SharedModule.forRoot()
  ]
})
export class AuthModule { }
