import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobOverviewElementComponent } from './job-overview-element.component';

describe('JobOverviewElementComponent', () => {
  let component: JobOverviewElementComponent;
  let fixture: ComponentFixture<JobOverviewElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobOverviewElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobOverviewElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
