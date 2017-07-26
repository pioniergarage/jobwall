import { Component, OnInit } from '@angular/core';
import { HttpService } from "../../shared/services/http.service";

@Component({
  selector: 'app-job-overview',
  templateUrl: './job-overview.component.html',
  styleUrls: ['./job-overview.component.css']
})
export class JobOverviewComponent implements OnInit {

    jobs:any;
    filterArgs:String[] = [];
    showStartup:boolean = true;
    showCorporate:boolean = true;

    constructor(private httpService:HttpService) {

      this.jobs = this.getJobs();

      this.httpService.getJoblist()
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


    removeJob(job){


      if (window.confirm("Diesen Job wirklich entgültig löschen?")) { 


        console.log("remove: "+job.id);


        this.httpService.deleteJob(job.id)
          .subscribe(deletedJob=>{
            console.log(deletedJob);
            this.jobs = this.jobs.filter(item => item !== job);
        });


      }

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
