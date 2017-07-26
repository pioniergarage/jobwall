import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { GeneralService } from "./general.service";
import { Observable } from "rxjs";
import { LoggedInUser } from "../interfaces/user";

@Injectable()
export class AuthService {



    private webUrl = "http://pg-api.pioniergarage.de/";
    private localUrl = "http://localhost/jobwall-api/";

    private usedUrl = this.webUrl;

  private loginUrl = this.usedUrl+'v1/login';

  constructor(private http:Http, private generalService:GeneralService) { }

    login(username:string, password:string): Observable<LoggedInUser[]> {

      let user = {
        username: username,
        password: password
      };
      let headers = new Headers();
      let body = JSON.stringify(user);

      return this.http.post(this.loginUrl, body, { headers: headers })
        .map(this.generalService.extractData)
        .catch(this.generalService.handleError);
    }

    logout(){
      localStorage.setItem('jw_token', '');
    }

    getAuthParams():string{
      let token = localStorage.getItem('jw_token');
      return "token="+token;
    }

    isAuth():boolean{
      return localStorage.getItem('jw_token')=="" ? false: true;
    }

}
