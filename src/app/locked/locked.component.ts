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

  groupIdArray = [];

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

    this.groupIdArray =  this.edSer.getCurrent('usergroups');
    this.edSer.debugLog(this.groupIdArray);
  }

}
