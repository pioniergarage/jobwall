import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-admin-area',
  templateUrl: './admin-area.component.html',
  styleUrls: ['./admin-area.component.css']
})
export class AdminAreaComponent implements OnInit {

  loggedIn = false;

  constructor(private authService: AuthService) { }

  isloggedIn(){
    return this.authService.isAuth();
  }


  logout(){
    this.authService.logout();
    location.reload();
  }


  ngOnInit() {
  }

}
