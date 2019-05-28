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
import {
  debug
} from 'util';

@Injectable({
  providedIn: 'root'
})
export class EdserService {

  // subject admin var
  private dMin = new Subject < any > ();


  __serUserGroups;
  __serUserID;
  __serUserType;

  __loggedIn = false;

  constructor(private http_: Http, private router: Router) {

  }




  // debugfunction for test dev
  debugLog(_debug: any) {
    if (environment.production !== true) {
      console.log(_debug);
    }
  }

  setCurrent(_case, _val) {
    switch (_case) {
      case 'usergroups':
        this.__serUserGroups = _val;
        break;
      case 'userid':
        this.__serUserID = _val;
        break;
      case 'usertype':
        this.__serUserType = _val;
        break;
    }
  }

  // Service store app wide
  getCurrent(_case) {
    let vall;
    switch (_case) {
      case 'usergroups':
        vall = this.__serUserGroups;
        break;
      case 'userid':
        vall = this.__serUserID;
        break;
      case 'usertype':
        vall = this.__serUserType;
        break;
    }
    return vall;
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
    const url = environment.apilink + 'createuser?rnd=' + new Date().getTime();
    // let blobReplaceUserId = jsonblobstring.replace('__userid__', '' + this.curID);
    this.debugLog(_name);
    const upt = {
      'uname': _name,
      'lastname': _lastname,
      'email': _email,
      'pwd': _pwd
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
  API_edituser(_id, _name, _lastname, _email, _pwd): Observable < any > {
    // tslint:disable-next-line:max-line-length
    const url = environment.apilink + 'edituser/' + _id + '?rnd=' + new Date().getTime();
    // let blobReplaceUserId = jsonblobstring.replace('__userid__', '' + this.curID);
    const upt = {
      'uname': _name,
      'lastname': _lastname,
      'email': _email,
      'pwd': _pwd
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


  // CHANGE PWD
  // TODO: Isn't implemented yet
  API_changepwd(_id, _oldpwd, _newpwd): Observable < any > {
    const url = environment.apilink + 'changepwd/' + _id + new Date().getTime();
    // tslint:disable-next-line:prefer-const
    const headers = new Headers({
      'Content-Type': 'application/json'
    });

    const upt = {
      'oldpwd': _oldpwd,
      'newpwd': _newpwd
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
    const url = environment.apilink + 'creategroup?rnd=' + new Date().getTime();
    // let blobReplaceUserId = jsonblobstring.replace('__userid__', '' + this.curID);
    const upt = {
      'name': _groupname,
      'wysig': _groupwysig
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
  API_getGroups(): Observable < any > {
    const url = environment.apilink + 'getgroups?rnd=' + new Date().getTime();
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


  API_editGroup(_groupdid, _groupname, _groupwysig): Observable < any > {
    // tslint:disable-next-line:max-line-length
    const url = environment.apilink + 'editgroup/' + _groupdid + '?rnd=' + new Date().getTime();
    // let blobReplaceUserId = jsonblobstring.replace('__userid__', '' + this.curID);
    const upt = {
      'name': _groupname,
      'wysig': _groupwysig
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

  // ASSIGN USER TO GROUP
   API_userToGroup(_userid, _groupid): Observable < any > {
    const url = environment.apilink + 'usertogroup/' + _userid + '/' + _groupid + '?rnd=' + new Date().getTime();
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

   // ASSIGN USER TO GROUP
   API_userfromgroup(_userid, _groupid): Observable < any > {
     console.log(_groupid);
    const url = environment.apilink + 'userfromgroup/' + _userid + '/' + _groupid + '?rnd=' + new Date().getTime();
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

  // ASSIGN USER TO GROUP
  API_getgroupusers(_groupid): Observable < any > {
    const url = environment.apilink + 'getgroupusers/' + _groupid + '?rnd=' + new Date().getTime();
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


  API_getusersgroupsandfiles(_userid): Observable < any > {
    const url = environment.apilink + 'getusersgroupsandfiles/' + _userid + '?rnd=' + new Date().getTime();
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
  API_createresearch(_name, _wysig, _status, _initiative): Observable < any > {
    // tslint:disable-next-line:max-line-length
    const url = environment.apilink + 'createresearch?rnd=' + new Date().getTime();
    // let blobReplaceUserId = jsonblobstring.replace('__userid__', '' + this.curID);
    const upt = {
      'researchname': _name,
      'researchwysig': _wysig,
      'researchstatus': _status,
      'researchinitiative': _initiative
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
  API_editresearch(_id, _name, _wysig, _status, _initiative): Observable < any > {
    // tslint:disable-next-line:max-line-length
    const url = environment.apilink + 'editresearch/ ' + _id + '?rnd=' + new Date().getTime();
    // let blobReplaceUserId = jsonblobstring.replace('__userid__', '' + this.curID);
    const upt = {
      'name': _name,
      'wysig': _wysig,
      'researchstatus': _status,
      'researchinitiative': _initiative
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
    const url = environment.apilink + 'createpublication?rnd=' + new Date().getTime();
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
    const url = environment.apilink + 'editpublication/ ' + _id + '?rnd=' + new Date().getTime();
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



// news news news
  // news news news
  // news news news
  // news news news

  // GET ALL news
  API_getnews(): Observable < any > {
    const url = environment.apilink + 'getnews?rnd=' + new Date().getTime();
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

  

  // Create news
  API_createnews(_name, _wysig): Observable < any > {
    // tslint:disable-next-line:max-line-length
    const url = environment.apilink + 'createnews?rnd=' + new Date().getTime();
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


  // Create news
  API_editnews(_id, _name, _wysig): Observable < any > {
    // tslint:disable-next-line:max-line-length
    const url = environment.apilink + 'editnews/ ' + _id + '?rnd=' + new Date().getTime();
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


  // DELETE news
  API_deletenews(news_id): Observable < any > {
    const url = environment.apilink + 'deletenews/' + news_id + '?rnd=' + new Date().getTime();
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
  




  // who who who
  // who who who
  // who who who
  // who who who

  // GET ALL who
  API_getwhoiswho(): Observable < any > {
    const url = environment.apilink + 'getwhoiswho?rnd=' + new Date().getTime();
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

  

  // Create who
  API_createwho(_name, _wysig): Observable < any > {
    // tslint:disable-next-line:max-line-length
    const url = environment.apilink + 'createwho?rnd=' + new Date().getTime();
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


  // Create who
  API_editwho(_id, _name, _wysig): Observable < any > {
    // tslint:disable-next-line:max-line-length
    const url = environment.apilink + 'editwho/ ' + _id + '?rnd=' + new Date().getTime();
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


  // DELETE who
  API_deletewho(who_id): Observable < any > {
    const url = environment.apilink + 'deletewho/' + who_id + '?rnd=' + new Date().getTime();
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

  // NOTE: IS NOT IMPLEMENTED!!! UPLOAD THUMB INSTEAD!
  // Create research
  // FOR BOTH RESEARCH AND PUBLICATIONS AND GROUPS, NEWS AND WHOISWHO
  // NOTE: IS NOT IMPLEMENTED!!!
  API_changecover(_id, _type, _url): Observable < any > {
    // tslint:disable-next-line:max-line-length
    let url;
    // let blobReplaceUserId = jsonblobstring.replace('__userid__', '' + this.curID);
    switch (_type) {
      case 'research':
        url = environment.apilink + 'setresearchcover/ ' + _id + '?rnd=' + new Date().getTime();
        break;
      case 'publication':
        url = environment.apilink + 'setpublicationcover/ ' + _id + '?rnd=' + new Date().getTime();
        break;
      case 'group':
        url = environment.apilink + 'setgroupcover/ ' + _id + '?rnd=' + new Date().getTime();
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



  // The thumbupload will take an fileevent, case (course, lesson, user), and assigned id
  API_uploadthumb($event, _case, _id): Observable < any > {
    // _case can be 'research' , 'publication' or 'orglogo΅
    const files = $event.target.files || $event.srcElement.files;
    const file = files[0];
    const url = environment.apilink + 'uploadthumb/' + _case + '/' + _id + '?rnd=' + new Date().getTime();
    const formData = new FormData();
    formData.append('file', file);
    const headers = new Headers({
      // 'Authorization': 'bearer ' + this.curTOKEN

    });
    const options = new RequestOptions({
      headers
    });


    return this.http_.post(url, formData, options)
      .pipe(throttleTime(5000))
      .pipe(map(res => res.json()));
  }

  // DELETE publication
  API_getgroupfiles(_groupid): Observable < any > {
    const url = environment.apilink + 'getfilesfromgroup/' + _groupid + '?rnd=' + new Date().getTime();
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

   // GET ALL publication
   API_getlogos(): Observable < any > {
    const url = environment.apilink + 'getlogos?rnd=' + new Date().getTime();
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


    // DELETE user
    API_deletelogo(logo_id): Observable < any > {
      const url = environment.apilink + 'deletelogo/' + logo_id + '?rnd=' + new Date().getTime();
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


  API_filetogroup($event, _groupsid): Observable < any > {
    // _case can be 'research' , 'publication' or 'orglogo΅
    const files = $event.target.files || $event.srcElement.files;
    const file = files[0];
    const url = environment.apilink + 'filetogroup/' + _groupsid + '?rnd=' + new Date().getTime();
    const formData = new FormData();
    formData.append('file', file);
    const headers = new Headers({
      // 'Authorization': 'bearer ' + this.curTOKEN

    });
    const options = new RequestOptions({
      headers
    });


    return this.http_.post(url, formData, options)
      .pipe(throttleTime(5000))
      .pipe(map(res => res.json()));
  }


  
   // DELETE publication
  API_removefilefromgroup(file_id): Observable < any > {
    const url = environment.apilink + 'removefilefromgroup/' + file_id + '?rnd=' + new Date().getTime();
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

    // GET ALL USERS
    API_gettextblocks(): Observable < any > {
      const url = environment.apilink + 'gettextblocks?rnd=' + new Date().getTime();
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
  API_edittextblock(_id, _wysig): Observable < any > {
    // tslint:disable-next-line:max-line-length
    const url = environment.apilink + 'edittextblock/ ' + _id + '?rnd=' + new Date().getTime();
    // let blobReplaceUserId = jsonblobstring.replace('__userid__', '' + this.curID);
    const upt = {
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


  // Get admin email
   // DELETE publication
   API_getadminemail(): Observable < any > {
    const url = environment.apilink + 'getadminemail?rnd=' + new Date().getTime();
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
  API_saveadminemail(_mail): Observable < any > {
    // tslint:disable-next-line:max-line-length
    const url = environment.apilink + 'saveadminemail?rnd=' + new Date().getTime();
    // let blobReplaceUserId = jsonblobstring.replace('__userid__', '' + this.curID);
    const upt = {
      'email': _mail,
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
  API_sendcontactform(_mail, _name, _subject, _message): Observable < any > {
    // tslint:disable-next-line:max-line-length
    const url = environment.apilink + 'sendcontactform?rnd=' + new Date().getTime();
    // let blobReplaceUserId = jsonblobstring.replace('__userid__', '' + this.curID);
    const upt = {
      'email': _mail,
      'name': _name,
      'subject' : _subject,
      'message': _message
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

}
