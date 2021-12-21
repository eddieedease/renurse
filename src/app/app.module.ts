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
import { NgxLoadingModule } from 'ngx-loading';
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
import { WysigComponent } from './wysig/wysig.component';
import { WysigPipe } from './wysig-pipe.pipe';
import { WiezijnwijComponent } from './wiezijnwij/wiezijnwij.component';
import { NewsComponent } from './news/news.component';

const appRoutes: Routes = [
  { path: 'landing', component: LandingComponent },
  { path: 'publications', component: PublicationsComponent},
  { path: 'research', component: ResearchComponent},
  { path: 'loggedin', component: LockedComponent},
  { path: 'nieuws', component: NewsComponent},
  { path: 'contact', component: ContactComponent},
  { path: 'admin', component: AdminComponent },
  { path: 'wiezijnwij', component: WiezijnwijComponent },
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
    ContactComponent,
    WysigComponent,
    WysigPipe,
    WiezijnwijComponent,
    NewsComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { useHash: false } // <-- debugging purposes only
    ),
    BrowserModule,
    ToastrModule.forRoot(),
    HttpModule,
    JsonpModule,
    FormsModule,
    BrowserAnimationsModule,
    NgxLoadingModule.forRoot({}),
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
