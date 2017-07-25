import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  private img_Logo_PG = 'assets/imgs/PionierGarageLogo-300x67.png'

  constructor() { }

  ngOnInit() {
  }

}
