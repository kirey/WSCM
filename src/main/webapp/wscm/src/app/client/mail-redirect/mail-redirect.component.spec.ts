import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MailRedirectComponent } from './mail-redirect.component';

describe('MailRedirectComponent', () => {
  let component: MailRedirectComponent;
  let fixture: ComponentFixture<MailRedirectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MailRedirectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MailRedirectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
