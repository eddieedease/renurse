import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import {
  HttpModule,
  JsonpModule
} from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';




import { NgxUploaderModule } from 'ngx-uploader';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';


import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TabsModule } from 'ngx-bootstrap/tabs';
// import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { LoadingModule } from 'ngx-loading';
import { ToastrModule } from 'ngx-toastr';

// Service
import { EdserService } from './edser.service';

import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { PublicationsComponent } from './publications/publications.component';
import { ResearchComponent } from './research/research.component';
import { AdminComponent } from './admin/admin.component';
import { LockedComponent } from './locked/locked.component';
import { ContactComponent } from './contact/contact.component';

const appRoutes: Routes = [
  { path: 'landing', component: LandingComponent },
  { path: 'publications', component: PublicationsComponent},
  { path: 'research', component: ResearchComponent},
  { path: 'loggedin', component: LockedComponent},
  { path: 'contact', component: ContactComponent},
  { path: 'admin', component: AdminComponent },
  { path: '',
    redirectTo: '/landing',
    pathMatch: 'full'
  },
  { path: '**', component: LandingComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    PublicationsComponent,
    ResearchComponent,
    AdminComponent,
    LockedComponent,
    ContactComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { useHash: true } // <-- debugging purposes only
    ),
    BrowserModule,
    ToastrModule.forRoot(),
    HttpModule,
    JsonpModule,
    FormsModule,
    BrowserAnimationsModule,
    LoadingModule,
    NgxUploaderModule,
    NgxDatatableModule,
    BsDropdownModule.forRoot(),
    CarouselModule.forRoot(),
    TabsModule.forRoot(),
    // BsDatepickerModule.forRoot(),
    ModalModule.forRoot(),
    CollapseModule.forRoot(),
    ButtonsModule.forRoot()
  ],
  providers: [EdserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
