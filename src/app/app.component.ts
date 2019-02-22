import {
  Component,
  TemplateRef
} from '@angular/core';

import {
  Subscription
} from 'rxjs';

import {
  EdserService
} from './edser.service';

import {
  Router,
  ActivatedRoute,
  Params
} from '@angular/router';

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
  environment
} from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Renurse';
  subscription: Subscription;

  // Var for showing hiding header/footer
  dMin = false;

  // user creds
  usrId = '';
  usrMail = '';
  usrPwd = '';

  modalRef: BsModalRef;

  isLoggedIn = false;

  router;

  showLoginSpinner = false;

  constructor(
    private edSer: EdserService,
    private thisrouter: Router,
    private modalService: BsModalService,
    private toastr: ToastrService
  ) {
    this.subscription = this.edSer.getdMin().subscribe(bool => {
      this.dMin = bool;
    });
    this.router = thisrouter;

    if (environment.production === false) {
      this.doTestCall();
    } else {}
  }

  doTestCall() {
    this.edSer.API_testCall().subscribe(value => this.gotTest(value));
  }

  gotTest(_resp) {
    this.edSer.debugLog(_resp);
  }

  openModal(template: TemplateRef < any > ) {
    this.modalRef = this.modalService.show(template);
  }

  loginAttempt() {
    // check some thing and  enable spinning loader
    if (this.usrMail !== '' && this.usrPwd !== '') {
      // adding a fake timer
      this.showLoginSpinner = true;
      this.edSer.API_login(this.usrMail, this.usrPwd).subscribe(value => this.gotLoginResponse(value));
      // TODO: enable API CALL
    }
  }

  // TODO: catch on suceesss
  gotLoginResponse(_event) {

    this.edSer.debugLog(_event);

    if (_event.status === 'failed') {
      this.showLoginSpinner = false;
      this.toastr.info('Inloggegevens niet geldig', 'Helaas');
    } else {
      this.edSer.__loggedIn = true;
      // succesfull login
      if (_event.type === '2') {
        this.edSer.debugLog('Admin is logged in');
      }
      // TODO: Check if is ok
      this.isLoggedIn = true;
      this.showLoginSpinner = false;
      this.modalRef.hide();

      // set up service groep id array
      this.edSer.setCurrent('usergroups', _event.groupids);
      this.edSer.setCurrent('userid', _event.usrid);
      
      this.router.navigate(['loggedin']);

    }
  }

  logOut() {
    this.router.navigate(['landing']);
    this.isLoggedIn = false;
  }
}
