import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerQuotationsConfirmation } from './customer-quotations-confirmation.component';

describe('CustomerQuotationsConfirmation', () => {
  let component: CustomerQuotationsConfirmation;
  let fixture: ComponentFixture<CustomerQuotationsConfirmation>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerQuotationsConfirmation]
    });
    fixture = TestBed.createComponent(CustomerQuotationsConfirmation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
