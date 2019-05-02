import { Component, OnInit } from '@angular/core';

import { EdserService } from '../edser.service';

import {
  ToastrService
} from 'ngx-toastr';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  // currents
  currentName = '';
  currentEmail = '';
  currentSubject = '';
  currentMessage = '';

  constructor(private edSer: EdserService, private toastr: ToastrService) {
      this.edSer.updatedMin(false);
    
  }


  ngOnInit() {
    // scroll to top
    window.scrollTo(0, 0);
  }


  sendMail() {
    if (this.currentEmail !== '' && this.currentMessage !== '' && this.currentName !== '' && this.currentSubject !== '') {
      this.edSer.API_sendcontactform(this.currentEmail, this.currentName, this.currentSubject, this.currentMessage).subscribe(value => this.contactFormSend(value));
    } else {
      this.toastr.warning('Nog niet alles ingevuld', '');
    }
  }


  contactFormSend(_resp){
    this.edSer.debugLog(_resp);
    this.currentEmail = '';
    this.currentMessage = '';
    this.currentSubject = '';
    this.currentName = '';
    this.toastr.success('Bedankt!', 'We proberen zo snel mogelijk te reageren.');
  }

}
