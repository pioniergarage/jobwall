import { Component, OnInit } from '@angular/core';


import { HttpService } from "../../shared/services/http.service";

import { Job } from "../../shared/classes/job";


import { DatePickerModule } from 'ng2-datepicker-bootstrap';


@Component({
  selector: 'app-create-new-job',
  templateUrl: './create-new-job.component.html',
  styleUrls: ['./create-new-job.component.css']
})
export class CreateNewJobComponent implements OnInit {



  public job:Job;
  availibleJobTypes = [{name:"Praktikum"},{name:"Vollzeitstelle"},{name:"Teilzeitstelle"},{name:"Werkstudentenstelle"},{name:"Thesis"},{name:"Mitgründer"}];
  errorMsg:string ="";
  infoMsg:string ="";

  constructor(private httpService:HttpService) {

    console.log(this.availibleJobTypes);
    this.job = new Job();
    this.resetJob();

    console.log(this.job);

  }

  ngOnInit() {
  }

  resetJob(){
    this.job.title  = "";
    this.job.companyName  = "";
    this.job.shortDescription = "";
    this.job.locationCityName = "";
    this.job.jobType  = "";
    this.job.linkToJobPage  = "";
    this.job.companyLogoUrl = "";
    this.job.isStartup  = "";
    this.job.publishDate  = new Date().toJSON().slice(0,10).replace(/-/g,'-'); //"2017-07-25"
    this.job.daysActive= 0;

  }

  onCreateNewJob(){

    this.errorMsg = "";

    if( this.job.title  == "" ||
        this.job.companyName  == "" ||
        this.job.shortDescription == "" ||
        this.job.locationCityName == "" ||
        this.job.jobType  == "" ||
        this.job.linkToJobPage  == "" ||
        this.job.companyLogoUrl == ""){
          this.errorMsg += "Bitte alle Felder ausfüllen. ";
        }
    if( this.job.daysActive < 1){
              this.errorMsg += "Die Anzeigedauer mindestens einen Tag betragen. ";
        }
    if(this.errorMsg == ""){
      console.log(this.job);
      console.log("save:");;

      this.httpService.createNewJob(this.job)
        .subscribe(jobList=>{
        this.infoMsg ="neuerJob eingetragen"
        this.resetJob();
        console.log(jobList);
        });

    }


  }


}
