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

  userGroupFiles = [];

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
    // this.userFiles = _response;
    const groupNameArray = [];
    this.userFiles = _response;
    // this one is the actual one
    const masterArray = [];

    // double loop see if exist
    for (let z = 0; z < this.userFiles.length; z++) {
      
      let exis = false;
      for (let o = 0; o < groupNameArray.length; o++) {
        if (this.userFiles[z].groupname === groupNameArray[o]) {
          exis = true;
        }
      }

      if (exis === false) {
        const newArray = [];
        groupNameArray.push(this.userFiles[z].groupname);
        newArray.push(this.userFiles[z]);
        // make new array
        // push to masterarray
        masterArray.push(newArray);
      } else if (exis === true) {
        for (let index = 0; index < masterArray.length; index++) {
          if (this.userFiles[z].groupname === masterArray[index][0].groupname) {
            masterArray[index].push(this.userFiles[z]);
          }
        }
      }

    }

    this.userFiles = masterArray;

    // now we know in what array to add it
    console.log(groupNameArray);
    console.log(this.userFiles);
    


  }

}
