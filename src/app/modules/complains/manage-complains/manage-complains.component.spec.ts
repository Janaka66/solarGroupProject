import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageComplainsComponent } from './manage-complains.component';

describe('ManageComplainsComponent', () => {
  let component: ManageComplainsComponent;
  let fixture: ComponentFixture<ManageComplainsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageComplainsComponent]
    });
    fixture = TestBed.createComponent(ManageComplainsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
