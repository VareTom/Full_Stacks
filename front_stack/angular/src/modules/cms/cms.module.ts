import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

// Guards
import { AuthGuard } from 'src/shared/guards/auth.guard';

// Components
import { CmsComponent } from './containers/cms/cms.component';

// Custom Modules
import { SharedModule } from 'src/shared/shared.module';


const routes: Routes = [
  {
    path: '', component: CmsComponent, canActivate: [AuthGuard], children: [ //
      { path: '', pathMatch: 'full', redirectTo: 'requests' },
      { path: 'stacks', loadChildren: () => import('./stacks/stacks.module').then(m => m.StacksModule) },
      { path: 'profile', loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule) }
    ]
  }
]

@NgModule({
  declarations: [
    CmsComponent
  ],
  imports: [
    CommonModule,

    RouterModule.forChild(routes),

    // Modules
    SharedModule.forRoot()
  ]
})
export class CmsModule { }
