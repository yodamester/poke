import { Component, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { ListClearedAction } from 'src/app/store/actions/pokemonList.action';
import { SnackbarService } from 'src/app/services/snackbar/snackbar.service';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ConfirmDialogComponent {
  constructor(
    private store: Store,
    public dialog: MatDialog,
    private snackbarService: SnackbarService
    ) {}

  confirm() {
    this.store.dispatch(new ListClearedAction());
    this.snackbarService.openSnackBar('Votes cleared');
    this.dialog.closeAll();
  }

  close() {
    this.dialog.closeAll();
  }
}
