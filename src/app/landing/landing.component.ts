import { Component, TemplateRef, OnInit } from '@angular/core';

import { EdserService } from '../edser.service';

import {
  Router,
  ActivatedRoute,
  Params
} from '@angular/router';



@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {



 

  constructor(private edSer: EdserService) {
      this.edSer.updatedMin(false);
    // scroll to top
      window.scrollTo(0, 0);
      
  }


  ngOnInit() {
  }


  




}
