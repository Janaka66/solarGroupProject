import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormViewerQoutComponent } from './form-viewer-qout.component';

describe('FormViewerQoutComponent', () => {
  let component: FormViewerQoutComponent;
  let fixture: ComponentFixture<FormViewerQoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormViewerQoutComponent]
    });
    fixture = TestBed.createComponent(FormViewerQoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
