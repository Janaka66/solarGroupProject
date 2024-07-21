import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerComplainsComponent } from './customer-complains.component';

describe('CustomerComplainsComponent', () => {
  let component: CustomerComplainsComponent;
  let fixture: ComponentFixture<CustomerComplainsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerComplainsComponent]
    });
    fixture = TestBed.createComponent(CustomerComplainsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
