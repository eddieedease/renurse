import {
  Http,
  Response,
  Headers,
  RequestOptions
} from '@angular/http';
import {
  Injectable
} from '@angular/core';
import {
  Router
} from '@angular/router';
// import { Observable, Subject, asapScheduler, pipe, of, from, interval, merge, fromEvent } from 'rxjs';
import {
  Observable,
  Subject
} from 'rxjs';

import {
  throttleTime
} from 'rxjs/operators';
import {
  map
} from 'rxjs/operators';


// import evironment for current dev bunlde
import {
  environment
} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EdserService {

  constructor(private http_: Http, private router: Router) { 

  }

  // debugfunction for test dev
  debugLog(_debug: any) {
    if (environment.production !== true) {
      console.log(_debug);
    }
  }


   // testcall
  // API TESTCALL
  API_testCall(): Observable < any > {
    const url = environment.apilink + 'testcall?rnd=' + new Date().getTime();
    const headers = new Headers({
      'Content-Type': 'application/json'
    });

    const options = new RequestOptions({
      headers: headers
    });
    return this.http_.get(url, options)
      .pipe(throttleTime(5000))
      .pipe(map(res => res.json()));
  }
}
