import {Injectable} from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import {BehaviorSubject, Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  login$: BehaviorSubject<{ username: '', token: '' }> = new BehaviorSubject(null);

  constructor(private store: Store<{ login: { username: '', token: '' } }>) {
    store.pipe(select('login')).subscribe(this.login$);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    const authToken = this.login$.getValue().token;
    const authReq = req.clone({
      headers: req.headers.set('Authorization', authToken),
    });
    return next.handle(authReq);
  }
}
