import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
import { GeneralService } from "./general.service";

@Injectable()
export class HttpService {

  //private jobUrl = 'http://pioniergarage.infernalmusic.com/jobwall/v3/pg_jobwall.php';
  private publicJobUrl = 'http://localhost/jobwall-api/v1/public_jobs';
  private jobUrl = 'http://localhost/jobwall-api/v1/jobs';
  //  private jobUrl = 'https://pioniergarage.de/wp-json/wpjobwall/v1/job';

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
      return this.http.get(this.jobUrl+"?"+this.authService.getAuthParams())
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
