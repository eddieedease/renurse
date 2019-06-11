import { Component, OnInit } from '@angular/core';

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
import {ViewEncapsulation} from '@angular/core';
import {
  Router,
  ActivatedRoute,
  Params
} from '@angular/router';


@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {


  newsArray = [];

  constructor(private edSer: EdserService,
    private thisrouter: Router,
    private sanitizer: DomSanitizer,
    private toastr: ToastrService) {
    this.edSer.updatedMin(false);
  }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.edSer.API_getnews().subscribe(value => this.gotNews(value));

  }


  gotNews(_resp){
    this.edSer.debugLog(_resp);
    this.newsArray = _resp;
    this.newsArray.reverse();

  }

}
