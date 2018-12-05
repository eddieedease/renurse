import { Component, OnInit } from '@angular/core';

import { EdserService } from '../edser.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  constructor(private edSer: EdserService) {
      this.edSer.updatedMin(false);
  }


  ngOnInit() {
  }

}
