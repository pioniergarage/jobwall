import { Component, OnInit } from '@angular/core';
import {HttpService} from "../shared/services/http.service";
import {JobListService} from "./job-list.service";


@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit {

  jobs:any;
  filterArgs:String[] = [];
  showStartup:boolean = true;
  showCorporate:boolean = true;

  constructor(private httpService:HttpService, private jobListService:JobListService) {

    this.jobs = this.getJobs();

    this.httpService.getPublicJoblist()
      .subscribe(jobList=>{
      console.log(jobList);
        this.jobs = jobList;
    });
  }

  getBgColorShowStartupButton() { return this.showStartup?"#464646":"#dddddd"; }
  getFontColorShowStartupButton() { return this.showStartup?"#eeeeee":"#999999"; }
  getBgColorShowCorporateButton() { return this.showCorporate?"#464646":"#dddddd"; }
  getFontColorShowCorporateButton() { return this.showCorporate?"#eeeeee":"#999999"; }

  ngOnInit() {
  }

  onCheckJobType(e){
    let filterName:string = this.jobListService.getFilterName(e.target.name);
    if  (e.target.checked){ this.setFilterArgs(filterName); }
    else                  { this.unsetFilterArgs(filterName);}
  }

  setFilterArgs(jobType:string){
    this.filterArgs.push(jobType);
    this.updateNgForJobList();
  }

  unsetFilterArgs(jobType:string){
    let index = this.filterArgs.indexOf(jobType);
    this.filterArgs.splice(index,1);
    this.updateNgForJobList();
  }

  updateNgForJobList(){
    this.jobs = Object.create(this.jobs);
  }

  changeShowCorporate(){
    this.showCorporate = !this.showCorporate;
    //console.log(this.showCorporate);
    this.updateNgForJobList();
  }

  changeShowStartup(){
    this.showStartup = !this.showStartup;
    //console.log(this.showStartup);
    this.updateNgForJobList();
  }

  getJobs(){
    return [];
  }

}
