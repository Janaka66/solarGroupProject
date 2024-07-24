import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerInqUserViewsComponent } from './customer-inq-user-views.component';

describe('CustomerInqUserViewsComponent', () => {
  let component: CustomerInqUserViewsComponent;
  let fixture: ComponentFixture<CustomerInqUserViewsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerInqUserViewsComponent]
    });
    fixture = TestBed.createComponent(CustomerInqUserViewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
