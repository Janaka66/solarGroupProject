import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageInquiriesComponent } from './manage-inquiries.component';

describe('ManageInquiriesComponent', () => {
  let component: ManageInquiriesComponent;
  let fixture: ComponentFixture<ManageInquiriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageInquiriesComponent]
    });
    fixture = TestBed.createComponent(ManageInquiriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
