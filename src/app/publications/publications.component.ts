import { Component, OnInit } from '@angular/core';

import { EdserService } from '../edser.service';

@Component({
  selector: 'app-publications',
  templateUrl: './publications.component.html',
  styleUrls: ['./publications.component.css']
})
export class PublicationsComponent implements OnInit {

  constructor(private edSer: EdserService) {
      this.edSer.updatedMin(false);
  }


  ngOnInit() {
    // scroll to top
    window.scrollTo(0, 0);
  }

}
