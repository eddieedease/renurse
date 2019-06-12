import {
  Component,
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

import {
  ToastrService
} from 'ngx-toastr';
import {
  ViewEncapsulation
} from '@angular/core';
import {
  Router,
  ActivatedRoute,
  Params
} from '@angular/router';

@Component({
  selector: 'app-wiezijnwij',
  templateUrl: './wiezijnwij.component.html',
  styleUrls: ['./wiezijnwij.component.css']
})
export class WiezijnwijComponent implements OnInit {


  // stuurgroep
  mainGroup = [];
  // ondersteunende groep
  supportGroup = [];

  constructor(private edSer: EdserService,
    private thisrouter: Router,
    private sanitizer: DomSanitizer,
    private toastr: ToastrService) {
    this.edSer.updatedMin(false);
  }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.edSer.API_getwhoiswho().subscribe(value => this.gotWhoisWho(value));
  }

  gotWhoisWho(_resp) {
    this.edSer.debugLog(_resp);
    _resp.forEach(person => {
      switch (person.type) {
        case '0':
          this.supportGroup.push(person);
          break;
        case '1':
          this.mainGroup.push(person);
          break;
      }
    });
  }

}
