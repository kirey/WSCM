import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditClassDialogComponent } from './edit-class-dialog.component';

describe('EditClassDialogComponent', () => {
  let component: EditClassDialogComponent;
  let fixture: ComponentFixture<EditClassDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditClassDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditClassDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
