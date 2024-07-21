import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerQuotationsComponent } from './customer-quotations.component';

describe('CustomerQuotationsComponent', () => {
  let component: CustomerQuotationsComponent;
  let fixture: ComponentFixture<CustomerQuotationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerQuotationsComponent]
    });
    fixture = TestBed.createComponent(CustomerQuotationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
