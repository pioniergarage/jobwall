import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'jobFilterPipe'
})
export class JobFilterPipePipe implements PipeTransform {

  private editedJobs = [];
  private editedJobsWithoutOutdated = [];



  transform(oldJobs: any, args?: any, showStartup?: boolean, showCorporate?: boolean): any {

    //clear the the Variable at the beginning
    this.editedJobs = [];
    this.editedJobsWithoutOutdated = [];
    // We iterate the jobs-array in the code
    for(let oldJob of oldJobs) {

      //If there is no arg like [Praktikum,Thesis]
      if(!args||args.length<1)
      {
        if(oldJob.isStartup && showStartup){ this.editedJobs.push(oldJob); }
        if(!oldJob.isStartup && showCorporate){ this.editedJobs.push(oldJob); }
      }
      else{
        for(let jobType of args){
          //Add Startups, if showStartup is true
          if( oldJob.jobType.toUpperCase() == jobType.toUpperCase()&&
              oldJob.isStartup && showStartup )
          {
            console.log("startups: "+oldJob.isStartup+" - "+showStartup);
            this.editedJobs.push(oldJob);
          }
          //Add Corporates, if showCorporate is true
          if( oldJob.jobType.toUpperCase() == jobType.toUpperCase()&&
            !oldJob.isStartup && showCorporate )
          {
            console.log("corporate: "+!oldJob.isStartup+" - "+showCorporate);
            this.editedJobs.push(oldJob);
          }

        }
      }


    }


    //Delete Elements from array which are older then X days
    for(let editedJob of this.editedJobs){

      let daysSinceJobCreated = (Date.now()- Date.parse(editedJob.created))/(1000*60*60*24); //with decimal places

      //add this job to the list, if it is newer then 32 days
      if(daysSinceJobCreated<32) this.editedJobsWithoutOutdated.push(editedJob);
    }



    return this.editedJobsWithoutOutdated;
  }

}
