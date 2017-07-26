import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { JobListComponent } from './job-list/job-list.component';
import { JobFilterPipePipe } from './job-list/job-filter-pipe.pipe';
import { HttpService } from "./shared/services/http.service";
import { AuthService } from "./shared/services/auth.service";
import { GeneralService } from "./shared/services/general.service";
import { JobItemComponent } from './job-list/job-item/job-item.component';
import { JobListService } from "./job-list/job-list.service";
import { NavbarComponent } from './navbar/navbar.component';
import { AdminAreaComponent } from './admin-area/admin-area.component';
import { JobOverviewComponent } from './admin-area/job-overview/job-overview.component';
import { LoginComponent } from './admin-area/login/login.component';
import { JobDetailComponent } from './admin-area/job-detail/job-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    JobListComponent,
    JobFilterPipePipe,
    JobItemComponent,
    NavbarComponent,
    AdminAreaComponent,
    JobOverviewComponent,
    LoginComponent,
    JobDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [HttpService, JobListService, AuthService, GeneralService],
  bootstrap: [AppComponent]
})
export class AppModule { }
