import {
  Component,
  OnInit,
  TemplateRef,
  ViewChild
} from '@angular/core';

import {
  BsModalService
} from 'ngx-bootstrap/modal';
import {
  BsModalRef
} from 'ngx-bootstrap/modal/bs-modal-ref.service';

import {
  DatatableComponent
} from '@swimlane/ngx-datatable';

import {
  ToastrService
} from 'ngx-toastr';

import {
  EdserService
} from '../edser.service';

import { environment } from '../../environments/environment';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  @ViewChild(DatatableComponent) table: DatatableComponent;

  // what kind of datatable rows do we have?
  userRows = [];
  tempUserRows = [];

  groupRows = [];
  tempGroupRows = [];

  publicationRows = [];
  tempPublicationsRows = [];

  researchRows = [];
  tempResearchRows = [];
  // FilesRow?

  // custom messages
  // Custom messages for datatable
  tableMessages = {
    emptyMessage: `
      <div>
        <span class="classname">Geen resultaten gevonden</span>
      </div>
    `
  };

  modalRef: BsModalRef;
  showLoginSpinner = false;
  adminModalRef;
  // @ViewChild('adminmodal', { read: TemplateRef }) _adminModalRef: TemplateRef<any>;
  adminisLoggedIn = false;


  admId;
  admPwd;

  constructor(private edSer: EdserService, private modalService: BsModalService, private toastr: ToastrService) {
    this.edSer.updatedMin(true);
    // NOTE Trying to trigger via code
    // this.modalRef = this.modalService.show(this._adminModalRef);
  }

  openModal(template: TemplateRef < any > ) {
    console.log(template);
    this.modalRef = this.modalService.show(template);
  }

  ngOnInit() {
    // scroll to top
    window.scrollTo(0, 0);

    // if admin do unlock
    if (environment.production === false) {
      this.adminisLoggedIn = true;
    } else {
    }
  }


  adminLoginAttempt() {
    if (this.admId !== '' && this.admPwd !== '') {
      this.showLoginSpinner = true;
      setTimeout(() => {
        this.adminisLoggedIn = true;
        this.modalRef.hide();
      }, 1000);
    }
  }

  LogOut() {
    this.adminisLoggedIn = false;

  }

  // Update filter for datatable
  // Functionality for the searching filter in the tables
  updateFilter(_type, event) {
    const val = event.target.value.toLowerCase();
    // lets switch it up ;)
    // in what table are we searching
    switch (_type) {
      case 'username':
        // filter our data
        const temp = this.tempUserRows.filter(function (d) {
          return d.name.toLowerCase().indexOf(val) !== -1 || !val;
        });
        // update the rows
        this.userRows = temp;
        break;
      case 'groupname':
        // filter our data
        const temp2 = this.tempGroupRows.filter(function (d) {
          return d.name.toLowerCase().indexOf(val) !== -1 || !val;
        });
        // update the rows
        this.groupRows = temp2;
        break;
      case 'pubname':
        // filter our data
        const temp3 = this.tempPublicationsRows.filter(function (d) {
          return d.name.toLowerCase().indexOf(val) !== -1 || !val;
        });
        // update the rows
        this.publicationRows = temp3;
        break;
      case 'researchname':
        // filter our data
        const temp4 = this.tempResearchRows.filter(function (d) {
          return d.name.toLowerCase().indexOf(val) !== -1 || !val;
        });
        // update the rows
        this.researchRows = temp4;
        break;
    }
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

}
