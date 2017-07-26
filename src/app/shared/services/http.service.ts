import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
import { GeneralService } from "./general.service";
import { Job } from "../classes/job";

@Injectable()
export class HttpService {



  private webUrl = "http://pg-api.pioniergarage.de/";
  private localUrl = "http://localhost/jobwall-api/";

  private usedUrl = this.webUrl;

  //private jobsUrl = 'http://pioniergarage.infernalmusic.com/jobwall/v3/pg_jobwall.php';
  private publicJobUrl = this.usedUrl+'v1/public_jobs';
  private jobsUrl = this.usedUrl+'v1/jobs';
  private jobUrl = this.usedUrl+'v1/job';
  //  private jobsUrl = 'https://pioniergarage.de/wp-json/wpjobwall/v1/job';

  constructor(private http: Http, private authService: AuthService, private generalService: GeneralService) {
  }

  createAuthorizationHeader(headers: Headers) {
    let token = localStorage.getItem('jw_token');
    console.log(token);

    //headers.set('HTTP_BK_AUTHORIZATION_TOKEN', token);
    headers.append('Access-Control-Allow-Origin', '*');
    //headers.set('HTTP_BK_AUTHORIZATION_TOKEN', token);
    headers.append("Access-Control-Allow-Headers", "Access-Control-Allow-Origin, HTTP_BK_AUTHORIZATION_TOKEN,Origin, X-Requested-With, Content-Type, Accept");
  }



  getPublicJoblist(): Observable<any[]> {
    return this.http.get(this.publicJobUrl )
      .map(this.extractData)
      .catch(this.handleError);
  }


    getJoblist(): Observable<any[]> {
      return this.http.get(this.jobsUrl+"?"+this.authService.getAuthParams())
        .map(this.generalService.extractData)
        .catch(this.generalService.handleError);
    }


    createNewJob(job:Job): Observable<any[]> {
      return this.http.post(this.jobUrl+"?"+this.authService.getAuthParams(),job)
        .map(this.generalService.extractData)
        .catch(this.generalService.handleError);
    }


    deleteJob(jobId:number): Observable<any[]> {
      return this.http.delete(this.jobUrl+"/"+jobId+"?"+this.authService.getAuthParams())
        .map(this.generalService.extractData)
        .catch(this.generalService.handleError);
    }


    updateJob(job:Job): Observable<any[]> {
      return this.http.put(this.jobUrl+"/"+job.id+"?"+this.authService.getAuthParams(),job)
        .map(this.generalService.extractData)
        .catch(this.generalService.handleError);
    }


    toggleJobActive(job:Job): Observable<any[]> {
      job.is_active = job.is_active == 0 ? 1 : 0;
      return this.http.put(this.jobUrl+"/"+job.id+"?"+this.authService.getAuthParams(),job)
        .map(this.generalService.extractData)
        .catch(this.generalService.handleError);
    }



  private extractData(res: Response) {

    let body = res.json();
    return body; //.data || { };
  }


  private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
