import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { Job } from "../shared/classes/job";

@Component({
  selector: 'app-admin-area',
  templateUrl: './admin-area.component.html',
  styleUrls: ['./admin-area.component.css']
})
export class AdminAreaComponent implements OnInit {

  job:Job;
  emptyJob:Job = new Job();

  loggedIn = false;
  showCreateNewJob = false;
  showUpdateJob = false;
  showJobOverview = true;
  showJobDetail = false;

  constructor(private authService: AuthService) { }

  isloggedIn(){
    return this.authService.isAuth();
  }


  logout(){
    this.authService.logout();
    location.reload();
  }

  onShowCreateNewJob(){
    this.showCreateNewJob = true;
    this.showJobOverview = false;
    this.showJobDetail = false;
    this.showUpdateJob = false;
  }

  onShowJobDetails(job:Job){
    this.job = job;
    this.showCreateNewJob = false;
    this.showJobOverview = false;
    this.showJobDetail = false;
    this.showUpdateJob = true;
  }


  onShowJobOverview(job:Job){
    this.showCreateNewJob = false;
    this.showJobOverview = true;
    this.showJobDetail = false;
    this.showUpdateJob = false;
  }

  ngOnInit() {
  }

}
