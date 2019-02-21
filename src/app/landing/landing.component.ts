import { Component, TemplateRef, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';


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


  logoArray = [];
 

  constructor(private edSer: EdserService, private _sanitizer: DomSanitizer) {
      this.edSer.updatedMin(false);
    // scroll to top
      window.scrollTo(0, 0);
      
  }


  ngOnInit() {
    this.edSer.API_getlogos().subscribe(value => this.gotLogos(value));

  }

  gotLogos(_response){
    this.edSer.debugLog('logos loaded');
    this.edSer.debugLog(_response);
    this.logoArray = _response;
  }

  safeLogo(image) {
    console.log(image);
    return this._sanitizer.bypassSecurityTrustStyle('uploads/' + image);
}


  




}
