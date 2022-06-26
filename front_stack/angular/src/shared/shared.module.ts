import { ReactiveFormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

// Service
import { AuthService } from './services/auth.service';
import { NotificationService } from './services/notification.service';

// Components
import { ButtonComponent } from './components/button/button.component';
import { FooterComponent } from './components/footer/footer.component';

// Material
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarConfig, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';

// Firebase
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

const matSnackbarDefaultConfig: MatSnackBarConfig = {
  verticalPosition: 'bottom',
  horizontalPosition: 'center',
  duration: 4000,
};

@NgModule({
  declarations: [
    // Components
    ButtonComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    
    // Firebase
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,

    // Material
    MatSnackBarModule,
    MatTableModule,
    MatSortModule,
    MatDialogModule
  ],
  exports: [
    TranslateModule,
    ReactiveFormsModule,

    // Material
    MatSnackBarModule,
    MatTableModule,
    MatSortModule,
    MatDialogModule,

    // Components
    ButtonComponent,
    FooterComponent
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [
        // Services
        AuthService,
        NotificationService,

        {
          provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
          useValue: matSnackbarDefaultConfig,
        }
      ]
    }
  }
}
