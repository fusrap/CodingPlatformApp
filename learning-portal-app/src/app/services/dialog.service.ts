import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  private dialogState = new BehaviorSubject<{ visible: boolean; data?: any }>({ visible: false });

  openDialog(data?: any): void {
    this.dialogState.next({ visible: true, data });
  }

  closeDialog(): void {
    this.dialogState.next({ visible: false });
  }

  getDialogState(): Observable<{ visible: boolean; data?: any }> {
    return this.dialogState.asObservable();
  }
}
