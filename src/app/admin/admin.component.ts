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
import {
  CurrencyIndex
} from '@angular/common/src/i18n/locale_data';


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
  currentResearchActive;
  currentResearchWysig;
  currentResearchId;



  currentPublicationTitle;
  currentPublicationCover;
  currentPublicationActive;
  currentPublicationWysig;
  currentPublicationId;

  currentGroupTitle;
  currentGroupSumUsers;
  currentGroupWysig;
  currentGroupActive;
  currentGroupId;

  currentUserName;
  currentUserId;
  currentUserLastName;
  currentUserEmail;
  currentUserPwd;

  // references for new or edit
  // false = edit
  newResearch = false;
  newPublication = false;
  newGroup = false;
  newUser = false;

  // another for the current WYSIG
  currentwysig;
  currentID;


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


// UPLOADING UPLOADING UPLOADING
// UPLOADING UPLOADING UPLOADING
// UPLOADING UPLOADING UPLOADING
// UPLOADING UPLOADING UPLOADING


// section for course thumb image uploading
onProfileFileChange(_event) {
  const files = _event.target.files || _event.srcElement.files;
  const file = files[0];

  this.edSer.debugLog(file.size);

  if (file.size >= 2000000) {
    this.edSer.debugLog('TO BIG OF A FILE, note user?');
  }
  this.startProfileUpload(_event);
}

  // section for course thumb image uploading
  startProfileUpload(_event): void {
    this.edSer.debugLog('start profile pic uploading uploading');
    this.loading = true;
    // TODO: make the call to the uploading
    // Event, case , id
  }

   // Server response on course img upload
profileFileIsUploaded(_val) {
  this.loading = false;
  this.edSer.debugLog('Profilefile is uploaded');
  this.toastr.success('Cursusafbeelding aangepast', '');
  this.edSer.debugLog(_val);
  // TODO: Load again
}






  adminLoginAttempt() {
    // TODO: Implement ADMIN LOGIN
    if (this.admId !== '' && this.admPwd !== '') {
      // Admin login responsibilities
      this.showLoginSpinner = true;
      // TODO: 4 now simulate
      setTimeout(() => {
        this.adminisLoggedIn = true;
        // TODO: With the research
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
  openLargeModal(template: TemplateRef < any > , _whichwhat, _id) {
    this.currentwysig = '';
    switch (_whichwhat) {
      case 'newresearch':
        this.newResearch = true;
        this.currentResearchTitle = '';
        this.currentResearchWysig = '';
        break;
      case 'newpublication':
        this.newPublication = true;
        this.currentPublicationTitle = '';
        this.currentPublicationWysig = '';
        break;
      case 'newgroup':
        this.newGroup = true;
        this.currentGroupTitle = '';
        this.currentGroupWysig = '';
        break;
      case 'newuser':
        this.newUser = true;
        this.currentUserEmail = '';
        this.currentUserId = '';
        this.currentUserLastName = '';
        this.currentUserName = '';
        break;
        // TODO: For the fetching for editting, we will need an additional parameter id
      case 'editresearch':
        this.newResearch = false;

        this.researchRows.forEach(element => {
          if (element.id === _id) {
            this.edSer.debugLog('We have a hit');
            this.currentResearchId = element.id;
            this.currentResearchTitle = element.uname;
            this.currentResearchWysig = element.wysig;
            this.currentResearchcover = element.coverurl;
            this.currentResearchActive = element.active;
          }
        });
        
        break;
      case 'editpublication':
        this.newPublication = false;
        this.publicationRows.forEach(element => {
          if (element.id === _id) {
            this.edSer.debugLog('We have a hit');
            this.currentPublicationActive = element.active;
            this.currentPublicationCover = element.coverurl;
            this.currentPublicationId = element.id;
            this.currentPublicationTitle = element.name;
            this.currentPublicationWysig = element.wysig;
          }
        });

        break;
      case 'editgroup':
        this.newGroup = false;

        this.groupRows.forEach(element => {
          if (element.id === _id) {
            this.edSer.debugLog('We have a hit');
            this.currentGroupActive = element.active;
            this.currentGroupId = element.id;
            this.currentGroupTitle = element.name;
            this.currentGroupWysig = element.wysig;
          }
        });
        break;
      case 'edituser':
        this.newUser = false;
        this.currentUserId = _id;

        this.userRows.forEach(element => {
          if (element.id === _id) {
            this.edSer.debugLog('We have a hit');
            this.currentUserEmail = element.email;
            this.currentUserId = element.id;
            this.currentUserLastName = element.lastname;
            this.currentUserName = element.uname;
          }
        });
        break;
        case 'usertogroup':

        this.currentUserId = _id;
        // setting up currents
        this.userRows.forEach(element => {
          if (element.id === _id) {
            this.edSer.debugLog('We have a hit');
            this.currentUserEmail = element.email;
            this.currentUserId = element.id;
            this.currentUserLastName = element.lastname;
            this.currentUserName = element.uname;
          }
        });
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
    this.researchRows = _event;
  }

  adjustResearches(_case) {
    switch (_case) {
      case 'new':
        if (this.currentResearchTitle !== '' && this.currentwysig !== '') {
          this.edSer.debugLog(this.currentResearchTitle);
          this.edSer.debugLog(this.currentwysig);
          this.edSer.API_createresearch(this.currentResearchTitle, this.currentwysig).subscribe(value => this.researchAdjusted(value));

        } else {

        }
        break;
      case 'edit':
      if (this.currentResearchTitle !== '' && this.currentGroupWysig !== '') {
        this.edSer.API_editresearch(this.currentResearchId, this.currentResearchTitle, this.currentwysig).subscribe(value => this.researchAdjusted(value));

      } else {

      }
        break;
    }
  }

  researchAdjusted(_event) {
    this.edSer.debugLog(_event);
    this.loading = false;
    this.modalRef.hide();
    this.toastr.success('Gewijzigd', '', {
      timeOut: 20000
    });
    this.getResearches();
  }

  // PUBLICATIONS
  getPublications() {
    this.loading = true;
    this.edSer.API_getpublications().subscribe(value => this.gotPublications(value));
  }

  gotPublications(_event) {
    this.edSer.debugLog(_event);
    this.loading = false;
    this.publicationRows = _event;
  }

  adjustPublications(_case) {
    switch (_case) {
      case 'new':
      if (this.currentPublicationTitle !== '' && this.currentwysig !== '') {
       
        this.edSer.API_createpublication(this.currentPublicationTitle, this.currentwysig).subscribe(value => this.publicationsAdjusted(value));

      } else {
        this.toastr.warning('Niet alles ingevuld', '', {
          timeOut: 20000
        });
      }
        break;
      case 'edit':
      if (this.currentPublicationTitle !== '') {
        this.edSer.API_editpublication(this.currentPublicationId, this.currentPublicationTitle, this.currentwysig).subscribe(value => this.publicationsAdjusted(value));

      }
        break;
    }
  }

  publicationsAdjusted(_event) {
    this.edSer.debugLog(_event);
    this.loading = false;
    this.modalRef.hide();
    this.toastr.success('Gewijzigd', '', {
      timeOut: 20000
    });
    this.getPublications();
  }

  // GROUPS
  getGroups() {
    this.loading = true;
    this.edSer.API_getGroups().subscribe(value => this.gotGroups(value));
  }

  gotGroups(_event) {
    this.edSer.debugLog(_event);
    this.loading = false;
    this.groupRows = _event;
  }

  adjustGroups(_case) {
    switch (_case) {
      case 'new':
      if (this.currentGroupTitle !== '' && this.currentwysig !== '') {
       
        this.edSer.API_createGroup(this.currentGroupTitle, this.currentwysig).subscribe(value => this.groupsAdjusted(value));

      } else {
        this.toastr.warning('Niet alles ingevuld', '', {
          timeOut: 20000
        });
      }
        break;
      case 'edit':
      if (this.currentGroupTitle !== '') {
        this.edSer.API_editGroup(this.currentGroupId, this.currentGroupTitle, this.currentwysig).subscribe(value => this.groupsAdjusted(value));

      }
        break;
    }
  }

  groupsAdjusted(_event) {
    this.loading = false;
    this.modalRef.hide();
    this.toastr.success('Gewijzigd', '', {
      timeOut: 20000
    });
    this.getGroups();
  }

  // USERS
  getUsers() {
    this.loading = true;
    this.edSer.API_getusers().subscribe(value => this.gotUsers(value));
  }

  gotUsers(_event) {
    this.userRows = _event;
    this.edSer.debugLog(_event);
    this.loading = false;
  }

  adjustUsers(_case) {
    if (this.currentUserName !== '' && this.currentUserLastName !== '' && this.currentUserEmail && this.currentUserPwd !== '') {
      this.loading = true;
      switch (_case) {
        case 'new':
          const randomstring = Math.random().toString(36).slice(-8);
          console.log(randomstring);

          this.edSer.API_createuser(this.currentUserName, this.currentUserLastName, this.currentUserEmail, this.currentUserPwd).subscribe(value => this.usersAdjusted(value));

          break;
        case 'edit':
        // this.currentUserEmail;
        // this.currentUserId;
        // this.currentUserLastName;
        // this.currentUserName;
        this.edSer.API_edituser(this.currentUserId, this.currentUserName, this.currentUserLastName, this.currentUserEmail, this.currentUserPwd).subscribe(value => this.usersAdjusted(value));

          break;
      }
    } else {
      // toast not complete
      this.toastr.error('Niet alles ingevuld', '', {
        timeOut: 20000
      });
    }
  }

  usersAdjusted(_event) {
    this.toastr.success('Gewijzigd', '', {
      timeOut: 20000
    });
    this.modalRef.hide();
    this.currentUserName = '';
    this.currentUserLastName = '';
    this.currentUserEmail = '';
    this.edSer.debugLog(_event);
    this.edSer.API_getusers().subscribe(value => this.gotUsers(value));

  }

}
