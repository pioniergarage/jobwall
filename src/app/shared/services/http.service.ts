import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs";

@Injectable()
export class HttpService {

  private jobUrl = 'http://pioniergarage.infernalmusic.com/jobwall/v3/pg_jobwall.php';

  constructor(private http: Http) {
  }

  getJoblist(): Observable<any[]> {
    return this.http.get(this.jobUrl)
      .map(this.extractData)
      .catch(this.handleError);
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
