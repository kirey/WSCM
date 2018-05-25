import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NestoComponent } from './nesto.component';

describe('NestoComponent', () => {
  let component: NestoComponent;
  let fixture: ComponentFixture<NestoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NestoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
