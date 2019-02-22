import { Component, OnInit } from '@angular/core';

import { EdserService } from '../edser.service';

import {
  Router
} from '@angular/router';

@Component({
  selector: 'app-locked',
  templateUrl: './locked.component.html',
  styleUrls: ['./locked.component.css']
})
export class LockedComponent implements OnInit {

  userId = [];

  userFiles = [];

  constructor(private edSer: EdserService, private router: Router) {

      if (this.edSer.__loggedIn === false) {
        this.router.navigate(['']);
      } else {
        this.edSer.updatedMin(false);
      
      }
  }


  ngOnInit() {
    // scroll to top
    window.scrollTo(0, 0);
    this.userId =  this.edSer.getCurrent('userid');
    this.edSer.debugLog(this.userId);

    // get assigned files
    this.edSer.API_getusersgroupsandfiles(this.userId).subscribe(value => this.gotUserFiles(value));

  }

  gotUserFiles(_response) {
    this.edSer.debugLog(_response);
    this.userFiles = _response;
  }

}
