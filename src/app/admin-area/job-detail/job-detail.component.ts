import { Component, OnInit, Input ,Output, EventEmitter } from '@angular/core';
import { HttpService } from "../../shared/services/http.service";
import { Job } from "../../shared/classes/job";

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.css']
})
export class JobDetailComponent implements OnInit {

  @Input() job:Job;

  @Output() onShowJobOverview = new EventEmitter<Job>();

  availibleJobTypes = [{name:"Praktikum"},{name:"Vollzeitstelle"},{name:"Teilzeitstelle"},{name:"Werkstudentenstelle"},{name:"Thesis"},{name:"Mitgründer"}];
  errorMsg:string ="";
  infoMsg:string ="";
  submitButtonText:string ="";
  isCreatePage = true;


  constructor(private httpService:HttpService) {
  }

  ngOnInit() {
    if(!this.job.id){
      this.resetJob();
      this.isCreatePage = true;
      this.submitButtonText = "Neuen Job jetzt eintragen";
    }
    else{
      this.isCreatePage = false;
      this.submitButtonText = "Job jetzt updaten";
    }
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
    this.job.daysActive = 0;
  }

  onSubmitJob(){
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

      if(this.isCreatePage){
        this.httpService.createNewJob(this.job)
          .subscribe(jobList=>{
          this.infoMsg ="neuerJob eingetragen";
          this.resetJob();
          console.log(jobList);


          this.onShowJobOverview.emit(this.job);
          });
      }

      else{
        this.httpService.updateJob(this.job)
          .subscribe(updatedJob=>{
            this.infoMsg ="Job wurde upgedated";
            console.log(updatedJob);



            this.onShowJobOverview.emit(this.job);
        });
      }



    }
  }


  onChangeJobIsStartup(){
    this.job.isStartup = this.job.isStartup == "0" ? "1" : "0";
  }


}
