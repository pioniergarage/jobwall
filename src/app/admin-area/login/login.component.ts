import { Component, OnInit } from '@angular/core';
import { LoggedInUser } from '../../shared/interfaces/user';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    public user = {
      name: "",
      password: ""
    };

    errorMsg="Fehler";

    constructor(private authService:AuthService) { }

    ngOnInit() {
    }

    login(username:string, password:string){
      //console.log(username+" "+password);

      this.authService.login(username, password)
        .subscribe((loggedInUser:LoggedInUser[])=>{
            //console.log(loggedInUser);

            localStorage.setItem('jw_token', loggedInUser[0].token);

            //location.reload();
          });

    }



}
