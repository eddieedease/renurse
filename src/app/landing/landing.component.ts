import { Component, TemplateRef, OnInit, ViewEncapsulation } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';


import { EdserService } from '../edser.service';

import {
  Router,
  ActivatedRoute,
  Params
} from '@angular/router';

import {
  BsModalService
} from 'ngx-bootstrap/modal';
import {
  BsModalRef
} from 'ngx-bootstrap/modal/bs-modal-ref.service';



@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class LandingComponent implements OnInit {


  logoArray = [];
 
  modalRef: BsModalRef;

  constructor(private edSer: EdserService, private _sanitizer: DomSanitizer, private modalService: BsModalService) {
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


// opening a modal
openModal(template: TemplateRef < any > , _id ) {
 
  
  this.modalRef = this.modalService.show(
    template,
    Object.assign({}, { class: 'gray modal-lg' })
  );  }


  




}
