import { Component, OnInit } from '@angular/core';

import { EdserService } from '../edser.service';

@Component({
  selector: 'app-locked',
  templateUrl: './locked.component.html',
  styleUrls: ['./locked.component.css']
})
export class LockedComponent implements OnInit {

  constructor(private edSer: EdserService) {
      this.edSer.updatedMin(false);
  }


  ngOnInit() {
    // scroll to top
    window.scrollTo(0, 0);

    
  }

}
