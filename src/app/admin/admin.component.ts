import { Component, OnInit } from '@angular/core';

import { EdserService } from '../edser.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private edSer: EdserService) {
      this.edSer.updatedMin(true);
  }

  ngOnInit() {
    // scroll to top
    window.scrollTo(0, 0);
  }

}
