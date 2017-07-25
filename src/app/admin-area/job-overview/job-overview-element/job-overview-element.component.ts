import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-job-overview-element',
  templateUrl: './job-overview-element.component.html',
  styleUrls: ['./job-overview-element.component.css']
})
export class JobOverviewElementComponent implements OnInit {

  @Input() job:any;
  constructor() { }

  ngOnInit() {
  }

}
