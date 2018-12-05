import { Component, OnInit } from '@angular/core';

import { EdserService } from '../edser.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor(private edSer: EdserService) {
      this.edSer.updatedMin(false);
  }


  ngOnInit() {
  }

}
