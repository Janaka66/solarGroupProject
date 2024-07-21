import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerProductsComponent } from './customer-products.component';

describe('CustomerProductsComponent', () => {
  let component: CustomerProductsComponent;
  let fixture: ComponentFixture<CustomerProductsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerProductsComponent]
    });
    fixture = TestBed.createComponent(CustomerProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
