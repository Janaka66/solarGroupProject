import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerInvoicesComponent } from './customer-invoices.component';

describe('CustomerInvoicesComponent', () => {
  let component: CustomerInvoicesComponent;
  let fixture: ComponentFixture<CustomerInvoicesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerInvoicesComponent]
    });
    fixture = TestBed.createComponent(CustomerInvoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
