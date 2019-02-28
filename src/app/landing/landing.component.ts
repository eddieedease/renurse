import {
  Component,
  TemplateRef,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import {
  DomSanitizer,
  SafeResourceUrl,
  SafeUrl
} from '@angular/platform-browser';


import {
  EdserService
} from '../edser.service';

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

  textBlocks;

  currentHtml;
  currentBlockTitle;
  currentBlockId;

  constructor(private edSer: EdserService, private _sanitizer: DomSanitizer, private modalService: BsModalService) {
    this.edSer.updatedMin(false);
    // scroll to top
    window.scrollTo(0, 0);

  }


  ngOnInit() {
    this.edSer.API_getlogos().subscribe(value => this.gotLogos(value));
    this.edSer.API_gettextblocks().subscribe(value => this.gotTextBlocks(value));
  }

  gotTextBlocks(_resp) {
    this.textBlocks = _resp;
  }

  gotLogos(_response) {
    this.edSer.debugLog('logos loaded');
    this.edSer.debugLog(_response);
    this.logoArray = _response;
  }

  safeLogo(image) {
    console.log(image);
    return this._sanitizer.bypassSecurityTrustStyle('uploads/' + image);
  }


  // opening a modal
  openModal(template: TemplateRef < any > , _id) {
    this.textBlocks.forEach(textblock => {
        if (+textblock.id === _id){
          this.edSer.debugLog('we have a hit');
          this.currentHtml = textblock.wysig;
          this.currentBlockId = _id;
          switch (_id) {
            case 1:
            this.currentBlockTitle =  'Visie';
              break;
              case 2:
            this.currentBlockTitle =  'Oprichting';
              break;
              case 3:
            this.currentBlockTitle =  'Onderzoeksprogramma';
              break;
              case 4:
            this.currentBlockTitle =  'Agenda';
              break;
          
         
           
          }
        };
    });

    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, {
        class: 'gray modal-lg'
      })
    );
  }







}
