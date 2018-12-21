import { Component, TemplateRef } from '@angular/core';

import { Subscription } from 'rxjs';
 
import { EdserService } from './edser.service';

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
   usrPwd = '';

  modalRef: BsModalRef;

  router;

  showLoginSpinner = false;

  constructor(private edSer: EdserService, private thisrouter: Router, private modalService: BsModalService, private toastr: ToastrService) {
      this.subscription = this.edSer.getdMin().subscribe(bool => { this.dMin = bool; });
      this.router = thisrouter;

      if (environment.production === false) {
        this.doTestCall();
      } else {
        
      }
  }

  doTestCall() {
    this.edSer.API_testCall().subscribe(value => this.gotTest(value));

  }

  gotTest(_resp){
    this.edSer.debugLog(_resp);
  }


  openModal(template: TemplateRef < any > ) {
    this.modalRef = this.modalService.show(template);
  }

  loginAttempt() {
    // check some thing and  enable spinning loader
    if (this.usrId !== '' && this.usrPwd !== '') {
      // adding a fake timer
      this.showLoginSpinner = true;
        setTimeout(() => {
           this.gotLoginResponse('OK');
       }, 1000);
      
      // TODO: enable API CALL
      // this.edSer.API_login(this.usrId, this.usrPwd).subscribe(value => this.gotLoginResponse(value));
    }
  }

  // TODO: catch on suceesss
  gotLoginResponse(_event) {
    this.showLoginSpinner = false;
    this.modalRef.hide();
    this.router.navigate(['shop']);
    
    this.toastr.success('Welkom', 'succes!');
    this.router.navigate(['loggedin']);
  }

}
