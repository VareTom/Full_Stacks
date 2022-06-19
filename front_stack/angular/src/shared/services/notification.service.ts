import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

// Enums
import { ToastStatus } from 'src/shared/enums/ToastStatus';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private snackBar: MatSnackBar) { }

  showSuccess(message: string){
    this.snackBar.open(message, null, {
      panelClass: ToastStatus.SUCCESS
    })
  }

  showError(message: string) {
    this.snackBar.open(message, null, {
      panelClass: ToastStatus.ERROR
    })
  }
}
