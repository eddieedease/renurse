import { Component, OnInit } from '@angular/core';

import { EdserService } from '../edser.service';

@Component({
  selector: 'app-research',
  templateUrl: './research.component.html',
  styleUrls: ['./research.component.css']
})
export class ResearchComponent implements OnInit {

  constructor(private edSer: EdserService) {
      this.edSer.updatedMin(false);
  }


  ngOnInit() {
  }

}
