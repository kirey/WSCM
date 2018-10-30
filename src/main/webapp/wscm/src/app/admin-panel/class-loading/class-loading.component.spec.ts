import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassLoadingComponent } from './class-loading.component';

describe('ClassLoadingComponent', () => {
  let component: ClassLoadingComponent;
  let fixture: ComponentFixture<ClassLoadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassLoadingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
