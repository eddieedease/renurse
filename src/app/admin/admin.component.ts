import {
  Component,
  EventEmitter,
  OnInit,
  ViewChild,
  TemplateRef,
  AfterViewInit
} from '@angular/core';

import {
  BsModalService
} from 'ngx-bootstrap/modal';
import {
  BsModalRef
} from 'ngx-bootstrap/modal/bs-modal-ref.service';

import {
  Router
} from '@angular/router';

import {
  DatatableComponent
} from '@swimlane/ngx-datatable';

import {
  UploadOutput,
  UploadInput,
  UploadFile,
  humanizeBytes,
  UploaderOptions
} from 'ngx-uploader';

import {
  DomSanitizer,
  SafeResourceUrl,
  SafeUrl
} from '@angular/platform-browser';

import {
  ToastrService
} from 'ngx-toastr';

import {
  EdserService
} from '../edser.service';

import {
  environment
} from '../../environments/environment';

import {
  WysigComponent
} from '../wysig/wysig.component';
import {
  ViewEncapsulation
} from '@angular/core';

import {
  WysigPipe
} from '../wysig-pipe.pipe';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [WysigPipe]
})
export class AdminComponent implements OnInit, AfterViewInit {

  loading = false;

  @ViewChild(DatatableComponent) table: DatatableComponent;

  // tinymce component
  public wysigComponent: WysigComponent;
  //  we want control over the WYsigComponent
  @ViewChild(WysigComponent) public tinyComponent: WysigComponent;
  sureModalTask;

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

  // Modal Values
  currentResearchTitle;
  currentResearchcover;
  currentResearchWysig;



  currentPublicationTitle;
  currentPublicationCover;
  currentPublicationWysig;

  currentGroupTitle;
  currentGroupSumUsers;
  currentGroupWysig;

  currentUserName;
  currentUserLastName;
  curentUserEmail;

  // references for new or edit
  // false = edit
  newResearch = false;
  newPublication = false;
  newGroup = false;
  newUser = false;

  // another for the current WYSIG
  currentwysig;

  // uploader
  optionsUploader: UploaderOptions;
  formData: FormData;
  files: UploadFile[];
  uploadInput: EventEmitter < UploadInput > ;
  humanizeBytes: Function;



  constructor(private wysigpipe: WysigPipe, private edSer: EdserService, private router: Router, public sanitizer: DomSanitizer, private toastr: ToastrService, private modalService: BsModalService) {
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
      this.edSer.API_getresearch().subscribe(value => this.gotResearches(value));
    } else {}
  }

  ngAfterViewInit() {

  }



  adminLoginAttempt() {
    // TODO: Implement ADMIN LOGIN



    if (this.admId !== '' && this.admPwd !== '') {
      this.showLoginSpinner = true;
      // TODO: 4 now simulate
      setTimeout(() => {
        this.adminisLoggedIn = true;
        this.edSer.API_getresearch().subscribe(value => this.gotResearches(value));
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


  // opening a modal
  openLargeModal(template: TemplateRef < any > , _whichwhat) {
    this.currentwysig = '';
    switch (_whichwhat) {
      case 'newresearch':
        this.newResearch = true;
        break;
      case 'newpublication':
        this.newPublication = true;
        break;
      case 'newgroup':
        this.newGroup = true;
        break;
      case 'newuser':
        this.newUser = true;
        break;
        // TODO: For the fetching for editting, we will need an additional parameter id
      case 'editresearch':
        this.newResearch = false;
        break;
      case 'editpublication':
        this.newPublication = false;
        break;
      case 'editgroup':
        this.newGroup = false;
        break;
      case 'edituser':
        this.newUser = false;
        break;
    }

    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, {
        class: 'gray modal-lg'
      })
    );
  }



  /**
   * The TinyMCE key up-handler
   */
  keyupHandlerFunction(das) {
    this.currentwysig = das;
    // this.tinyComponent.callFromParent(das);
  }

  /**
   * For future Use, give back current carrotposition in TinyMCE
   */
  giveRangeBack(_carPos) {
    this.edSer.debugLog(_carPos);
    // this.serser.debugLog('carret position = ' + _carPos);
  }


  getSome(_getwhat) {
    switch (_getwhat) {
      case 'research':
        this.getResearches();
        break;
      case 'publications':
        this.getPublications();
        break;
      case 'groups':
        this.getGroups();
        break;
      case 'users':
        this.getUsers();
        break;
    }
  }

  // HTTP API CALLS HANDLING VIA SERVICE
  // RESEARCHES
  getResearches() {
    this.loading = true;
    this.edSer.API_getresearch().subscribe(value => this.gotResearches(value));
  }

  gotResearches(_event) {
    this.edSer.debugLog(_event);
    this.loading = false;
  }

  adjustResearches(_case) {
    switch (_case) {
      case 'new':

        break;
      case 'edit':

        break;
    }
  }

  researchAdjusted(_event) {
    this.edSer.debugLog(_event);
    this.loading = false;
  }

  // PUBLICATIONS
  getPublications() {
    this.loading = true;
    this.edSer.API_getpublications().subscribe(value => this.gotPublications(value));
  }

  gotPublications(_event) {
    this.edSer.debugLog(_event);
    this.loading = false;
  }

  adjustPublications(_case) {
    switch (_case) {
      case 'new':

        break;
      case 'edit':

        break;
    }
  }

  publicationsAdjusted(_event) {
    this.edSer.debugLog(_event);
    this.loading = false;
  }

  // GROUPS
  getGroups() {
    this.loading = true;
    this.edSer.API_getGroups().subscribe(value => this.gotGroups(value));
  }

  gotGroups(_event) {
    this.edSer.debugLog(_event);
    this.loading = false;
  }

  adjustGroups(_case) {
    switch (_case) {
      case 'new':

        break;
      case 'edit':

        break;
    }
  }

  groupsAdjusted(_event) {
    this.edSer.debugLog(_event);
    this.loading = false;
  }

  // USERS
  getUsers() {
    this.loading = true;
    this.edSer.API_getusers().subscribe(value => this.gotUsers(value));
  }

  gotUsers(_event) {
    this.edSer.debugLog(_event);
    this.loading = false;
  }

  adjustUsers(_case) {
    switch (_case) {
      case 'new':

        break;
      case 'edit':

        break;
    }
  }

  usersAdjusted(_event) {
    this.edSer.debugLog(_event);
    this.loading = false;
  }

}
