import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Wordpress Testapp';
  infoText = "änderbarer Text";

  public onClick(text:string){
    this.infoText = text;
  }
}
