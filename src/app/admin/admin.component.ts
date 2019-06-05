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
  sureModalTask = '';
  delId = 0;


  // what kind of datatable rows do we have?
  userRows = [];
  tempUserRows = [];

  groupRows = [];
  tempGroupRows = [];

  groupUserRows = [];
  tempgroupUserRows = [];

  publicationRows = [];
  tempPublicationsRows = [];

  researchRows = [];
  tempResearchRows = [];

  newsRows = [];
  tempNewsRows = [];
  
  whoRows = [];
  tempWhoRows = [];
  
  
  
  // FilesRow?

  logoArray = [];

  emailAdmin;

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
  currentResearchCover;
  currentResearchActive;
  currentResearchWysig;
  currentResearchId;
  currentResearchStatus;
  currentResearchResearches;

  currentTextBlockWysig;
  currentTextBlock = 1;
  currentTextBlockName = '';
  textblockloaded = false;



  currentPublicationTitle;
  currentPublicationCover;
  currentPublicationActive;
  currentPublicationWysig;
  currentPublicationId;

  currentNewsTitle;
  currentNewsCover;
  currentNewsActive;
  currentNewsWysig;
  currentNewsId;

  currentWhoTitle;
  currentWhoCover;
  currentWhoActive;
  currentWhoWysig;
  currentWhoType;
  currentWhoId;

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
  newNews = false;
  newWho = false;

  // another for the current WYSIG
  currentwysig;
  currentID;


  // uploader
  optionsUploader: UploaderOptions;
  formData: FormData;
  files: UploadFile[];
  uploadInput: EventEmitter < UploadInput > ;
  humanizeBytes: Function;


  groupFiles = [];





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
      this.edSer.API_getadminemail().subscribe(value => this.gotAdminEmail(value));
    } else {}
  }

  ngAfterViewInit() {

  }

  gotAdminEmail(_resp) {
    this.emailAdmin = _resp.adminemail[0].adminemail;
  }



  // function for opening modals from this page
  // 
  openSureModal(template: TemplateRef < any > , _whichtask, _delId) {
    this.sureModalTask = _whichtask;
    this.delId = _delId;
    console.log(this.delId);
    this.modalRef = this.modalService.show(template);
  }


  // Are you sure Modal Handling
  // Accepts, yes or no and which task needs to be performed
  sureModal(_yesno): void {
    if (_yesno === 'yes') {
      // Do the actual deleting
      switch (this.sureModalTask) {
        case 'research':
          this.edSer.API_deleteresearch(this.delId).subscribe(value => this.isDeleted(value, 'research'));
          break;
        case 'publication':
          this.edSer.API_deletepublication(this.delId).subscribe(value => this.isDeleted(value, 'publication'));
          break;
        case 'group':
          this.edSer.API_deletegroup(this.delId).subscribe(value => this.isDeleted(value, 'group'));
          break;
        case 'user':
          this.edSer.API_deleteuser(this.delId).subscribe(value => this.isDeleted(value, 'user'));
          break;
          case 'news':
          this.edSer.API_deletenews(this.delId).subscribe(value => this.isDeleted(value, 'news'));
          break;
          case 'who':
          this.edSer.API_deletewho(this.delId).subscribe(value => this.isDeleted(value, 'who'));
          break;
        case 'file':
          this.edSer.API_removefilefromgroup(this.delId).subscribe(value => this.isDeleted(value, 'file'));
          break;
        case 'orglogo':
          this.edSer.API_deletelogo(this.delId).subscribe(value => this.isDeleted(value, 'logo'));
          break;
      }
    } else {
      // Do nothing
    }
    // Hide this modal
    this.modalRef.hide();
    this.sureModalTask = '';
  }


  // Deleting server response
  isDeleted(_event, _case) {
    this.toastr.success('Verwijderd', '');

    switch (_case) {
      case 'research':
        this.getResearches();
        break;
      case 'publication':
        this.getPublications();
        break;
      case 'group':
        this.getGroups();
        break;
      case 'user':
        this.getUsers();
        break;
      case 'file':
        this.edSer.API_getgroupfiles(this.currentGroupId).subscribe(value => this.gotGroupFiles(value));
        break;
      case 'logo':
        this.getLogos();
        break;
        case 'news':
        this.getNews();
        break;
        case 'who':
        this.getWhoIsWho();
        break;
    }
  }


  // UPLOADING UPLOADING UPLOADING
  // UPLOADING UPLOADING UPLOADING
  // UPLOADING UPLOADING UPLOADING
  // UPLOADING UPLOADING UPLOADING

  // section for course thumb image uploading
  fileUploadStart(_event) {
    const files = _event.target.files || _event.srcElement.files;
    const file = files[0];

    this.edSer.debugLog(file.size);

    if (file.size >= 2000000) {
      this.edSer.debugLog('TO BIG OF A FILE, note user?');
    }
    this.startFileUpload(_event);
  }

  // section for course thumb image uploading
  startFileUpload(_event): void {
    this.edSer.debugLog('start file uploading to group');
    this.loading = true;

    this.edSer.API_filetogroup(_event, this.currentGroupId).subscribe(value => this.fileToGroupResponse(value));
  }


  fileToGroupResponse(_resp) {
    this.edSer.debugLog(_resp);
    this.edSer.API_getgroupfiles(this.currentGroupId).subscribe(value => this.gotGroupFiles(value));
  }



  // section for course thumb image uploading
  thumbUploadStart(_event, _case) {
    const files = _event.target.files || _event.srcElement.files;
    const file = files[0];

    this.edSer.debugLog(file.size);

    if (file.size >= 2000000) {
      this.edSer.debugLog('TO BIG OF A FILE, note user?');
    }
    this.startThumbUpload(_event, _case);
  }


  // section for course thumb image uploading
  startThumbUpload(_event, _case): void {
    this.edSer.debugLog('start  uploading');
    this.loading = true;
    
    // TODO: Also implement the news and WhoisWHo

    // takeID
    switch (_case) {
      case 'research':
        this.edSer.API_uploadthumb(_event, _case, this.currentResearchId).subscribe(value => this.thumbUploaded(value, 'research'));

        break;
      case 'publication':
        this.edSer.API_uploadthumb(_event, _case, this.currentPublicationId).subscribe(value => this.thumbUploaded(value, 'publication'));

        break;
      case 'orglogo':
        this.edSer.API_uploadthumb(_event, _case, 0).subscribe(value => this.thumbUploaded(value, 'orglogo'));

        break;
        case 'news':
        this.edSer.API_uploadthumb(_event, _case, this.currentNewsId).subscribe(value => this.thumbUploaded(value, 'news'));
        break;
        case 'whoiswho':
        this.edSer.API_uploadthumb(_event, _case, this.currentWhoId).subscribe(value => this.thumbUploaded(value, 'whoiswho'));

        break;
    }

    // Event, case , id
  }

  // Server response on course img upload
  thumbUploaded(_val, _case) {
    switch (_case) {
      case 'research':
        this.getResearches();
        break;
      case 'publication':
        this.getPublications();
        break;
      case 'orglogo':
        this.getLogos();
        break;
        case 'news':
        this.getNews();
        break;
        case 'whoiswho':
        this.getWhoIsWho();
        break;
    }

    this.loading = false;
    this.toastr.success('Afbeelding geupload', '');
    this.edSer.debugLog(_val);
    // TODO: Load again
  }






  adminLoginAttempt() {
    // TODO: Implement ADMIN LOGIN
    if (this.admId !== '' && this.admPwd !== '') {
      // Admin login responsibilities
      this.showLoginSpinner = true;
      // TODO: 4 now simulate

      this.edSer.API_login(this.admId, this.admPwd).subscribe(value => this.gotLoginResponse(value));

      /* setTimeout(() => {
        this.adminisLoggedIn = true;
        // TODO: With the research
        this.edSer.API_getresearch().subscribe(value => this.gotResearches(value));
        this.modalRef.hide();
      }, 1000); */
    }
  }


  // TODO: catch on suceesss
  gotLoginResponse(_event) {

    this.edSer.debugLog(_event);

    if (_event.status === 'failed') {
      this.showLoginSpinner = false;
      this.toastr.info('Niet geldig', 'Helaas');
    } else {
      this.edSer.__loggedIn = true;
      // succesfull login
      if (_event.type === '2') {
        this.modalRef.hide();
        this.edSer.debugLog('Admin is logged in');
        this.toastr.success('Welkom', 'Admin');
        this.adminisLoggedIn = true;
        this.edSer.API_getresearch().subscribe(value => this.gotResearches(value));
        this.edSer.API_getadminemail().subscribe(value => this.gotAdminEmail(value));

      }
      // TODO: Check if is ok
      this.showLoginSpinner = false;

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
    switch (_whichwhat) {
      case 'newresearch':
        this.newResearch = true;
        this.currentResearchTitle = '';
        this.currentResearchWysig = '';
        break;
        case 'newnews':
        this.newNews = true;
        this.currentNewsTitle = '';
        this.currentNewsWysig = '';
        break;
        case 'newwho':
        this.newWho = true;
        this.currentWhoTitle = '';
        this.currentWhoWysig = '';
        this.currentWhoType = 1;
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
        this.currentResearchResearches = '';
        this.currentResearchStatus = '';
        this.researchRows.forEach(element => {
          if (element.id === _id) {
            this.edSer.debugLog('We have a hit');
            this.currentResearchId = element.id;
            this.currentResearchTitle = element.uname;
            this.currentResearchWysig = element.wysig;
            this.currentResearchCover = element.coverurl;
            this.currentResearchActive = element.active;
            this.currentResearchResearches = element.initiative;
            this.currentResearchStatus = element.status;
          }
        });
        break;
        case 'editnews':
        this.newNews = false;
        this.currentNewsTitle = '';
        this.newsRows.forEach(element => {
          if (element.id === _id) {
            this.edSer.debugLog('We have a hit');
            this.currentNewsId = element.id;
            this.currentNewsTitle = element.name;
            this.currentNewsWysig = element.wysig;
            this.currentNewsCover = element.coverurl;
            this.currentNewsActive = element.active;
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
        case 'editwho':
        this.newWho = false;
        this.whoRows.forEach(element => {
          if (element.id === _id) {
            this.edSer.debugLog('We have a hit');
            this.currentWhoActive = element.active;
            this.currentWhoCover = element.coverurl;
            this.currentWhoId = element.id;
            this.currentWhoType = +element.type;
            this.currentWhoTitle = element.name;
            this.currentWhoWysig = element.wysig;
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
      case 'groupusers':
        this.groupRows.forEach(element => {
          if (element.id === _id) {
            this.edSer.debugLog('We have a hit');
            this.currentGroupId = element.id;
          }
        });
        // this.getUsers();
        this.edSer.API_getgroupusers(_id).subscribe(value => this.gotGroupUsers(value));
        /* this.currentUserId = _id;
        // setting up currents
        this.userRows.forEach(element => {
          if (element.id === _id) {
            this.edSer.debugLog('We have a hit');
            this.currentUserEmail = element.email;
            this.currentUserId = element.id;
            this.currentUserLastName = element.lastname;
            this.currentUserName = element.uname;
          }
        }); */
        break;

      case 'filestogroup':
        this.groupRows.forEach(element => {
          if (element.id === _id) {
            this.edSer.debugLog('We have a hit');
            this.currentGroupId = element.id;
          }
        });

        // Fetch the groupFiles
        this.edSer.API_getgroupfiles(this.currentGroupId).subscribe(value => this.gotGroupFiles(value));
        break;

      case 'textblocks':
        this.textblockloaded = false;
        this.currentTextBlock = _id;
        // get textblocks
        this.edSer.API_gettextblocks().subscribe(value => this.gotTextBlocks(value, _id));

        break;
    }

    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, {
        class: 'gray modal-lg'
      })
    );
  }

  gotTextBlocks(_resp, _id) {
    this.edSer.debugLog(_resp);
    for (let index = 0; index < _resp.length; index++) {
      if (+_resp[index].id === _id) {

        this.currentTextBlockWysig = _resp[index].wysig;
        this.currentTextBlock = +_resp[index].id;

        this.edSer.debugLog('WE HAVE A HIT!!   +  ' + _resp[index].wysig);
        switch (_id) {
          case 1:
            this.currentTextBlockName = 'Visie';
            break;
          case 2:
            this.currentTextBlockName = 'Oprichting';
            break;
          case 3:
            this.currentTextBlockName = 'Onderzoeksprogramma';
            break;
          case 4:
            this.currentTextBlockName = 'Agenda';
            break;
        }
      }
      this.textblockloaded = true;

    }
  }

  // Save text block
  saveTextBlock() {
    this.edSer.API_edittextblock(this.currentTextBlock, this.currentwysig).subscribe(value => this.textBlockAdjusted(value));
  }

  textBlockAdjusted(_response) {
    this.edSer.debugLog(_response);
    this.toastr.success('Gewijzigd', '', {
      timeOut: 20000
    });
    this.modalRef.hide();
    this.currentwysig = '';
    // this.edSer.API_gettextblocks().subscribe(value => this.gotTextBlocks(value, this.currentTextBlock));
  }

  gotTextBlockssDoNothing(_resp) {
    this.edSer.debugLog(_resp);
  }


  gotGroupFiles(_resp) {
    this.edSer.debugLog(_resp);
    this.groupFiles = _resp;
  }

  gotGroupUsers(_resp) {
    this.edSer.debugLog(_resp);
    const resp = _resp;
    // add a property to the user if id exists
    for (let i = 0; i < this.userRows.length; i++) {
      this.userRows[i].togroup = 0;
      resp.forEach(element => {
        if (this.userRows[i].id === element.userid) {
          this.edSer.debugLog('WE HAVE A HIT');
          this.userRows[i].togroup = 1;
        }
      });
    }
    this.edSer.debugLog(this.userRows);
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
        this.getUsers();
        break;
      case 'users':
        this.getUsers();
        break;
      case 'logos':
        this.getLogos();
        break;
      case 'textblocks':
        // TODO: get textblocks via api
        break;
      case 'news':
        this.getNews();
        break;
      case 'whoiswho':
        this.getWhoIsWho();
        break;
    }
  }

  getNews() {
    this.loading = true;
    this.edSer.API_getnews().subscribe(value => this.gotNews(value));
  }

  // response
  gotNews(_event) {
    this.edSer.debugLog(_event);
    this.loading = false;
    this.newsRows = _event;
    this.newsRows.reverse();
  }

    // ADJUST
  adjustNews(_case) {
    switch (_case) {
      case 'new':
        if (this.currentNewsTitle !== '' && this.currentwysig !== '') {
          this.edSer.API_createnews(this.currentNewsTitle, this.currentwysig).subscribe(value => this.newsAdjusted(value));
        } else {
          this.toastr.warning('Niet alles ingevuld', '', {
            timeOut: 20000
          });
        }
        break;
      case 'edit':
        if (this.currentNewsTitle !== '') {
          this.edSer.API_editnews(this.currentNewsId, this.currentNewsTitle, this.currentwysig).subscribe(value => this.newsAdjusted(value));
        }
        break;
    }
  }

  newsAdjusted(_event) {
    this.loading = false;
    this.modalRef.hide();
    this.toastr.success('Gewijzigd', '', {
      timeOut: 20000
    });
    this.getNews();
  }

  getWhoIsWho() {
    this.loading = true;
    this.edSer.API_getwhoiswho().subscribe(value => this.gotWhoIsWho(value));
  }

  // response
  gotWhoIsWho(_event) {
    this.loading = false;
    this.edSer.debugLog(_event);
    this.whoRows = _event;
    this.whoRows.reverse();
  }

  // TODO: ADJUST
  adjustWho(_case) {
      switch (_case) {
        case 'new':
          if (this.currentWhoTitle !== '' && this.currentwysig !== '') {
            this.edSer.API_createwho(this.currentWhoTitle, this.currentWhoWysig, this.currentWhoType).subscribe(value => this.whoAdjusted(value));
          } else {
            this.toastr.warning('Niet alles ingevuld', '', {
              timeOut: 20000
            });
          }
          break;
        case 'edit':
          if (this.currentWhoTitle !== '') {
            this.edSer.API_editwho(this.currentWhoId, this.currentWhoTitle, this.currentWhoWysig, this.currentWhoType).subscribe(value => this.whoAdjusted(value));
  
          }
          break;
      }
    }
  
    whoAdjusted(_event) {
      this.edSer.debugLog(_event);
      this.loading = false;
      this.modalRef.hide();
      this.toastr.success('Gewijzigd', '', {
        timeOut: 20000
      });
      this.getWhoIsWho();
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
    this.researchRows.reverse();
  }

  adjustResearches(_case) {
    switch (_case) {
      case 'new':
        if (this.currentResearchTitle !== '' && this.currentwysig !== '') {
          this.edSer.debugLog(this.currentResearchTitle);
          this.edSer.debugLog(this.currentwysig);
          this.edSer.API_createresearch(this.currentResearchTitle, this.currentwysig, this.currentResearchStatus, this.currentResearchResearches).subscribe(value => this.researchAdjusted(value));

        } else {

        }
        break;
      case 'edit':
        if (this.currentResearchTitle !== '' && this.currentGroupWysig !== '') {
          this.edSer.API_editresearch(this.currentResearchId, this.currentResearchTitle, this.currentwysig, this.currentResearchStatus, this.currentResearchResearches).subscribe(value => this.researchAdjusted(value));

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
    this.modalRef.hide();
  }

  getLogos() {
    this.edSer.API_getlogos().subscribe(value => this.gotLogos(value));
  }

  gotLogos(_resp) {
    this.edSer.debugLog(_resp);
    this.logoArray = _resp;
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
    this.publicationRows.reverse();
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
    this.groupRows.reverse();
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


  userToFromGroup(_addremove, _userid) {
    switch (_addremove) {
      case 'add':
        this.edSer.API_userToGroup(_userid, this.currentGroupId).subscribe(value => this.userToGroupResponse(value));

        break;
      case 'remove':
        this.edSer.API_userfromgroup(_userid, this.currentGroupId).subscribe(value => this.userToGroupResponse(value));
        break;
    }
  }

  userToGroupResponse(_resp) {
    // reloadUsers
    this.edSer.API_getusers().subscribe(value => this.userIsNowChanged(value));

  }


  userIsNowChanged(_resp) {

    this.userRows = _resp;

    this.groupRows.forEach(element => {
      if (element.id === this.currentGroupId) {
        this.edSer.debugLog('We have a hit');
        this.currentGroupId = element.id;
      }
    });
    // this.getUsers();
    this.edSer.API_getgroupusers(this.currentGroupId).subscribe(value => this.gotGroupUsers(value));
  }





  // USERS
  getUsers() {
    this.loading = true;
    this.edSer.API_getusers().subscribe(value => this.gotUsers(value));
  }

  gotUsers(_event) {
    this.userRows = _event;
    this.userRows.reverse();
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

  saveAdminEmail() {
    if (this.emailAdmin !== '') {
      // Api call save admin email
      this.edSer.API_saveadminemail(this.emailAdmin).subscribe(value => this.adminEmailSaved(value));

    }
  }

  adminEmailSaved(_resp) {
    this.edSer.API_getadminemail().subscribe(value => this.gotAdminEmail(value));

    this.toastr.success('Gewijzigd', '', {
      timeOut: 20000
    });
  }

}
