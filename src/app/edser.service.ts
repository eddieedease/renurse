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

  // subject admin var
  private dMin = new Subject < any > ();

  constructor(private http_: Http, private router: Router) {

  }




  // debugfunction for test dev
  debugLog(_debug: any) {
    if (environment.production !== true) {
      console.log(_debug);
    }
  }



  // Communication between ADMIN and layoutview components
  updatedMin(dmin: boolean) {
    this.dMin.next(dmin);
  }

  getdMin(): Observable < any > {
    return this.dMin.asObservable();
  }

  // API BRIDGE API BRIDGE
  // API BRIDGE API BRIDGE
  // API BRIDGE API BRIDGE


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



  // USR API CALLS
  // LOGIN, if succcesfull, responds with secret
  API_login(_email, _password): Observable < any > {
    // tslint:disable-next-line:max-line-length
    const url = environment.apilink + 'login/' + _email + '?rnd=' + new Date().getTime();
    // let blobReplaceUserId = jsonblobstring.replace('__userid__', '' + this.curID);
    const upt = {
      'pwd': _password
    };
    const body = JSON.stringify(upt);
    // const howmanykb = this.byteCount(body);
    // Line beneath show how many KB
    // console.log('JSONBLOB = ' + howmanykb + ' Bytes');
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Cache-control': 'no-cache',
      'Expires': '0',
      'Pragma': 'no-cache'
      /*  ,'Authorization': 'bearer ' + this.curTOKEN */
    });
    const options = new RequestOptions({
      headers: headers,
      method: 'post'
    });
    return this.http_.post(url, body, options)
      .pipe(throttleTime(5000))
      .pipe(map(res => res.json()));
  }


  // GET ALL USERS
  API_getusers(): Observable < any > {
    const url = environment.apilink + 'getusers?rnd=' + new Date().getTime();
    // tslint:disable-next-line:prefer-const
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

  // USERS
  // Insert new user
  // GROUPS API
  // GROUPS
  API_createuser(_name, _lastname, _email, _pwd): Observable < any > {
    // tslint:disable-next-line:max-line-length
    const url = environment.apilink + 'createuser/?rnd=' + new Date().getTime();
    // let blobReplaceUserId = jsonblobstring.replace('__userid__', '' + this.curID);
    const upt = {
      'name': _name,
      'lastname': _lastname,
      'email' : _email,
      'pwd' : _pwd
    };
    const body = JSON.stringify(upt);
    // const howmanykb = this.byteCount(body);
    // Line beneath show how many KB
    // console.log('JSONBLOB = ' + howmanykb + ' Bytes');
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Cache-control': 'no-cache',
      'Expires': '0',
      'Pragma': 'no-cache'
      /*  ,'Authorization': 'bearer ' + this.curTOKEN */
    });
    const options = new RequestOptions({
      headers: headers,
      method: 'post'
    });
    return this.http_.post(url, body, options)
      .pipe(throttleTime(5000))
      .pipe(map(res => res.json()));
  }

  // Edit user
  API_edituser(_id, _email, _name, _lastname): Observable < any > {
    const url = environment.apilink +  'edituser/' + _id  + new Date().getTime();
    // tslint:disable-next-line:prefer-const
    const headers = new Headers({
      'Content-Type': 'application/json'
    });

    const upt = {
      'name': _name,
      'lastname': _lastname,
      'email' : _email
    };
    const body = JSON.stringify(upt);

    const options = new RequestOptions({
      headers: headers
    });

    return this.http_.post(url, body, options)
      .pipe(throttleTime(5000))
      .pipe(map(res => res.json()));
  }

  // CHANGE PWD
  API_changepwd(_id, _oldpwd, _newpwd): Observable < any > {
    const url = environment.apilink +  'changepwd/' + _id  + new Date().getTime();
    // tslint:disable-next-line:prefer-const
    const headers = new Headers({
      'Content-Type': 'application/json'
    });

    const upt = {
      'oldpwd': _oldpwd,
      'newpwd' : _newpwd
    };

    const body = JSON.stringify(upt);


    const options = new RequestOptions({
      headers: headers
    });

    return this.http_.post(url, body, options)
      .pipe(throttleTime(5000))
      .pipe(map(res => res.json()));
  }

  // DELETE user
  API_deleteuser(usr_id): Observable < any > {
    const url = environment.apilink + 'deleteuser/' + usr_id + '?rnd=' + new Date().getTime();
    // tslint:disable-next-line:prefer-const
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


  // GROUPS API
  // GROUPS
  API_createGroup(_groupname, _groupwysig): Observable < any > {
    // tslint:disable-next-line:max-line-length
    const url = environment.apilink + 'creategroup/?rnd=' + new Date().getTime();
    // let blobReplaceUserId = jsonblobstring.replace('__userid__', '' + this.curID);
    const upt = {
      'groupname': _groupname,
      'groupwysig': _groupwysig
    };
    const body = JSON.stringify(upt);
    // const howmanykb = this.byteCount(body);
    // Line beneath show how many KB
    // console.log('JSONBLOB = ' + howmanykb + ' Bytes');
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Cache-control': 'no-cache',
      'Expires': '0',
      'Pragma': 'no-cache'
      /*  ,'Authorization': 'bearer ' + this.curTOKEN */
    });
    const options = new RequestOptions({
      headers: headers,
      method: 'post'
    });
    return this.http_.post(url, body, options)
      .pipe(throttleTime(5000))
      .pipe(map(res => res.json()));
  }

  // GROUPS API Bridge
  // GROUPS GROUPS GROUPS
  // GROUPS GROUPS GROUPS
  // GROUPS GROUPS GROUPS

  API_editGroup(_groupname, _groupwysig): Observable < any > {
    // tslint:disable-next-line:max-line-length
    const url = environment.apilink + 'editgroup/?rnd=' + new Date().getTime();
    // let blobReplaceUserId = jsonblobstring.replace('__userid__', '' + this.curID);
    const upt = {
      'groupname': _groupname,
      'groupwysig': _groupwysig
    };
    const body = JSON.stringify(upt);
    // const howmanykb = this.byteCount(body);
    // Line beneath show how many KB
    // console.log('JSONBLOB = ' + howmanykb + ' Bytes');
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Cache-control': 'no-cache',
      'Expires': '0',
      'Pragma': 'no-cache'
      /*  ,'Authorization': 'bearer ' + this.curTOKEN */
    });
    const options = new RequestOptions({
      headers: headers,
      method: 'post'
    });
    return this.http_.post(url, body, options)
      .pipe(throttleTime(5000))
      .pipe(map(res => res.json()));
  }


  // DELETE group
  API_deletegroup(group_id): Observable < any > {
    const url = environment.apilink + 'deletegroup/' + group_id + '?rnd=' + new Date().getTime();
    // tslint:disable-next-line:prefer-const
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



  // RESEARCH RESEARCH RESEARCH
  // RESEARCH RESEARCH RESEARCH
  // RESEARCH RESEARCH RESEARCH
  // RESEARCH RESEARCH RESEARCH

  // GET ALL RESEARCH
  API_getresearch(): Observable < any > {
  const url = environment.apilink + 'getresearches?rnd=' + new Date().getTime();
  // tslint:disable-next-line:prefer-const
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

// Create research
API_createresearch(_name, _wysig): Observable < any > {
  // tslint:disable-next-line:max-line-length
  const url = environment.apilink + 'createresearch/?rnd=' + new Date().getTime();
  // let blobReplaceUserId = jsonblobstring.replace('__userid__', '' + this.curID);
  const upt = {
    'name': _name,
    'wysig': _wysig
  };
  const body = JSON.stringify(upt);
  // const howmanykb = this.byteCount(body);
  // Line beneath show how many KB
  // console.log('JSONBLOB = ' + howmanykb + ' Bytes');
  const headers = new Headers({
    'Content-Type': 'application/json',
    'Cache-control': 'no-cache',
    'Expires': '0',
    'Pragma': 'no-cache'
    /*  ,'Authorization': 'bearer ' + this.curTOKEN */
  });
  const options = new RequestOptions({
    headers: headers,
    method: 'post'
  });
  return this.http_.post(url, body, options)
    .pipe(throttleTime(5000))
    .pipe(map(res => res.json()));
}


// Create research
API_editresearch(_id, _name, _wysig): Observable < any > {
  // tslint:disable-next-line:max-line-length
  const url = environment.apilink + 'editresearch/ ' + _id  + '?rnd=' + new Date().getTime();
  // let blobReplaceUserId = jsonblobstring.replace('__userid__', '' + this.curID);
  const upt = {
    'name': _name,
    'wysig': _wysig
  };
  const body = JSON.stringify(upt);
  // const howmanykb = this.byteCount(body);
  // Line beneath show how many KB
  // console.log('JSONBLOB = ' + howmanykb + ' Bytes');
  const headers = new Headers({
    'Content-Type': 'application/json',
    'Cache-control': 'no-cache',
    'Expires': '0',
    'Pragma': 'no-cache'
    /*  ,'Authorization': 'bearer ' + this.curTOKEN */
  });
  const options = new RequestOptions({
    headers: headers,
    method: 'post'
  });
  return this.http_.post(url, body, options)
    .pipe(throttleTime(5000))
    .pipe(map(res => res.json()));
}


// DELETE research
API_deleteresearch(research_id): Observable < any > {
  const url = environment.apilink + 'deleteresearch/' + research_id + '?rnd=' + new Date().getTime();
  // tslint:disable-next-line:prefer-const
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


// publication publication publication
  // publication publication publication
  // publication publication publication
  // publication publication publication

  // GET ALL publication
  API_getpublications(): Observable < any > {
    const url = environment.apilink + 'getpublications?rnd=' + new Date().getTime();
    // tslint:disable-next-line:prefer-const
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
  
  // Create publication
  API_createpublication(_name, _wysig): Observable < any > {
    // tslint:disable-next-line:max-line-length
    const url = environment.apilink + 'createpublication/?rnd=' + new Date().getTime();
    // let blobReplaceUserId = jsonblobstring.replace('__userid__', '' + this.curID);
    const upt = {
      'name': _name,
      'wysig': _wysig
    };
    const body = JSON.stringify(upt);
    // const howmanykb = this.byteCount(body);
    // Line beneath show how many KB
    // console.log('JSONBLOB = ' + howmanykb + ' Bytes');
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Cache-control': 'no-cache',
      'Expires': '0',
      'Pragma': 'no-cache'
      /*  ,'Authorization': 'bearer ' + this.curTOKEN */
    });
    const options = new RequestOptions({
      headers: headers,
      method: 'post'
    });
    return this.http_.post(url, body, options)
      .pipe(throttleTime(5000))
      .pipe(map(res => res.json()));
  }
  
  
  // Create publication
  API_editpublication(_id, _name, _wysig): Observable < any > {
    // tslint:disable-next-line:max-line-length
    const url = environment.apilink + 'editpublication/ ' + _id  + '?rnd=' + new Date().getTime();
    // let blobReplaceUserId = jsonblobstring.replace('__userid__', '' + this.curID);
    const upt = {
      'name': _name,
      'wysig': _wysig
    };
    const body = JSON.stringify(upt);
    // const howmanykb = this.byteCount(body);
    // Line beneath show how many KB
    // console.log('JSONBLOB = ' + howmanykb + ' Bytes');
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Cache-control': 'no-cache',
      'Expires': '0',
      'Pragma': 'no-cache'
      /*  ,'Authorization': 'bearer ' + this.curTOKEN */
    });
    const options = new RequestOptions({
      headers: headers,
      method: 'post'
    });
    return this.http_.post(url, body, options)
      .pipe(throttleTime(5000))
      .pipe(map(res => res.json()));
  }
  
  
  // DELETE publication
  API_deletepublication(publication_id): Observable < any > {
    const url = environment.apilink + 'deletepublication/' + publication_id + '?rnd=' + new Date().getTime();
    // tslint:disable-next-line:prefer-const
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


// Create research
// FOR BOTH RESEARCH AND PUBLICATIONS AND GROUPS
API_changecover(_id, _type, _url): Observable < any > {
  // tslint:disable-next-line:max-line-length
  let url;
  // let blobReplaceUserId = jsonblobstring.replace('__userid__', '' + this.curID);
  switch (_type) {
    case 'research':
      url = environment.apilink + 'setresearchcover/ ' + _id  + '?rnd=' + new Date().getTime();
      break;
    case 'publication':
      url = environment.apilink + 'setpublicationcover/ ' + _id  + '?rnd=' + new Date().getTime();
    break;
    case 'group':
      url = environment.apilink + 'setgroupcover/ ' + _id  + '?rnd=' + new Date().getTime();
    break;
  }
  const upt = {
    'coverurl': _url
  };
  const body = JSON.stringify(upt);
  const headers = new Headers({
    'Content-Type': 'application/json',
    'Cache-control': 'no-cache',
    'Expires': '0',
    'Pragma': 'no-cache'
    });
  const options = new RequestOptions({
    headers: headers,
    method: 'post'
  });
  return this.http_.post(url, body, options)
    .pipe(throttleTime(5000))
    .pipe(map(res => res.json()));
}


}
