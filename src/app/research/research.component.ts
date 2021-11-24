import {
  Component,
  TemplateRef,
  OnInit
} from '@angular/core';

import {
  EdserService
} from '../edser.service';

import {
  DomSanitizer,
  SafeResourceUrl,
  SafeUrl
} from '@angular/platform-browser';

// modal service
import {
  BsModalService
} from 'ngx-bootstrap/modal';
import {
  BsModalRef
} from 'ngx-bootstrap/modal/bs-modal-ref.service';

import {
  ToastrService
} from 'ngx-toastr';
import {ViewEncapsulation} from '@angular/core';
import {
  Router,
  ActivatedRoute,
  Params
} from '@angular/router';

@Component({
  selector: 'app-research',
  templateUrl: './research.component.html',
  styleUrls: ['./research.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ResearchComponent implements OnInit {

  modalRef: BsModalRef;

  // array holding researchitems
  researchArray = [];

  publicationArray = [];

  currentResearchTitle = '';
  currentResearchWysig = '';
  currentResearchStatus ='';
  currentResearchPeople = '';


  currentCoverUrl = '';

  constructor(private edSer: EdserService,
    private thisrouter: Router,
    private modalService: BsModalService,
    private sanitizer: DomSanitizer,
    private toastr: ToastrService) {
    this.edSer.updatedMin(false);
  }


  ngOnInit() {
    // scroll to top
    window.scrollTo(0, 0);
    // get publications
    this.edSer.API_getresearch().subscribe(value => this.gotResearch(value));
    this.edSer.API_getpublications().subscribe(value => this.gotPublications(value));
  }

  gotResearch(_event) {
    this.edSer.debugLog(_event);
    this.researchArray = _event;
    this.researchArray.reverse();
  }

  gotPublications(_event) {
    this.edSer.debugLog(_event);
    this.publicationArray = _event;
    this.publicationArray.reverse();
  }

  

  // opening a modal
  openModal(template: TemplateRef < any > , _id ) {
    this.researchArray.forEach(element => {
      if (element.id === _id) {
        this.edSer.debugLog('we have a hit');
        this.currentResearchTitle = element.uname;
        this.currentResearchWysig = element.wysig;
        this.currentCoverUrl = element.coverurl;
        this.currentResearchPeople = element.initiative;
        this.currentResearchStatus = element.status;
      }
    });
    
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );  }

}
