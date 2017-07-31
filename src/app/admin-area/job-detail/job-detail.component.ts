import { Component, OnInit, Input ,Output, EventEmitter, ViewChild } from '@angular/core';
import { HttpService } from "../../shared/services/http.service";
import { Job } from "../../shared/classes/job";
import { FileUploader } from 'ng2-file-upload';




@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.css']
})
export class JobDetailComponent implements OnInit {

  @Input() job:Job;

  @Output() onShowJobOverview = new EventEmitter<Job>();

  @ViewChild('fileForUpload') fileForUpload;

  availibleJobTypes = [{name:"Praktikum"},{name:"Vollzeitstelle"},{name:"Teilzeitstelle"},{name:"Werkstudentenstelle"},{name:"Thesis"},{name:"Mitgründer"}];
  errorMsg:string ="";
  infoMsg:string ="";
  submitButtonText:string ="";
  isCreatePage = true;








    URL = "http://pg-api.pioniergarage.de/v1/job/0/uploadFile?token="+localStorage.getItem('jw_token');

    public uploader:FileUploader = new FileUploader({url: this.URL});
    public hasBaseDropZoneOver:boolean = false;
    public hasAnotherDropZoneOver:boolean = false;

    public fileOverBase(e:any):void {
      this.hasBaseDropZoneOver = e;
    }

    public fileOverAnother(e:any):void {
      this.hasAnotherDropZoneOver = e;
    }





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
      this.URL = "http://pg-api.pioniergarage.de/v1/job/"+this.job.id+"/uploadFile?token="+localStorage.getItem('jw_token');
      this.uploader = new FileUploader({url: this.URL});
    }

    //Zum Vermeiden er preflight errors
    this.uploader.onBeforeUploadItem = (item) => {
      item.withCredentials = false;
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
    this.job.isStartup  = 0;
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
    this.job.isStartup = this.job.isStartup == 0 ? 1 : 0;
  }



  fileChange(event) {
    this.httpService.fileChange(event);
    /*
      let fileList: FileList = event.target.files;
      if(fileList.length > 0) {
          let file: File = fileList[0];
          let formData:FormData = new FormData();
          formData.append('uploadFile', file, file.name);

          this.httpService.uploadFile(formData, this.job.id).subscribe(res => {
            // do stuff w/my uploaded file
          });

      }
      */

  }


}
