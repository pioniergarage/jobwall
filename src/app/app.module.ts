import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { JobListComponent } from './job-list/job-list.component';
import { JobFilterPipePipe } from './job-list/job-filter-pipe.pipe';
import { HttpService } from "./shared/services/http.service";
import { JobItemComponent } from './job-list/job-item/job-item.component';
import {JobListService} from "./job-list/job-list.service";
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    JobListComponent,
    JobFilterPipePipe,
    JobItemComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [HttpService, JobListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
