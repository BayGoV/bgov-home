import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {HttpClient} from '@angular/common/http';
import {filter, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  constructor(private store: Store<{ login: { username: '', token: '' } }>, private http: HttpClient) {
  }

  ngOnInit() {
  }

}
