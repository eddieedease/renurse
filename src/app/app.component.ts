import { Component } from '@angular/core';

import { Subscription } from 'rxjs';
 
import { EdserService } from './edser.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  subscription: Subscription;

  // Var for showing hiding header/footer
  dMin = false;

  constructor(private edSer: EdserService) {
      this.subscription = this.edSer.getdMin().subscribe(bool => { this.dMin = bool; });
  }

}
