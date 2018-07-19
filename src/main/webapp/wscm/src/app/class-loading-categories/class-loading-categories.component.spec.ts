import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassLoadingCategoriesComponent } from './class-loading-categories.component';

describe('ClassLoadingCategoriesComponent', () => {
  let component: ClassLoadingCategoriesComponent;
  let fixture: ComponentFixture<ClassLoadingCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassLoadingCategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassLoadingCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
