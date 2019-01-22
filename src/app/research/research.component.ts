import {
  Component,
  TemplateRef,
  OnInit
} from '@angular/core';

import {
  EdserService
} from '../edser.service';

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

import {
  Router,
  ActivatedRoute,
  Params
} from '@angular/router';

@Component({
  selector: 'app-research',
  templateUrl: './research.component.html',
  styleUrls: ['./research.component.css']
})
export class ResearchComponent implements OnInit {

  modalRef: BsModalRef;

  constructor(private edSer: EdserService,
    private thisrouter: Router,
    private modalService: BsModalService,
    private toastr: ToastrService) {
    this.edSer.updatedMin(false);
  }


  ngOnInit() {
    // scroll to top
    window.scrollTo(0, 0);
  }



  // opening a modal
  openModal(template: TemplateRef < any > ) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );  }

}
