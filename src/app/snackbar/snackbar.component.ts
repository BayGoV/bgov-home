import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { SnackbarState } from '../store/snackbar.reducer';
import { snackbar } from '../store/snackbar.actions';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss'],
})
export class SnackbarComponent implements OnInit {
  snackbar$;

  constructor(private store: Store<{ snackbar: SnackbarState }>) {}

  ngOnInit() {
    this.snackbar$ = this.store.pipe(select('snackbar'));
  }

  dismiss() {
    this.store.dispatch(snackbar({ active: false }));
  }
}
