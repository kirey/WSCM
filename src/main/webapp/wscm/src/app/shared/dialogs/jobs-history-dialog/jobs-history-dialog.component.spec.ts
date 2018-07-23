import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobsHistoryDialogComponent } from './jobs-history-dialog.component';

describe('JobsHistoryDialogComponent', () => {
  let component: JobsHistoryDialogComponent;
  let fixture: ComponentFixture<JobsHistoryDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobsHistoryDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobsHistoryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
