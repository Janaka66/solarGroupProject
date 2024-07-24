import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerComplainUserViewComponent } from './customer-complain-user-view.component';

describe('CustomerComplainUserViewComponent', () => {
  let component: CustomerComplainUserViewComponent;
  let fixture: ComponentFixture<CustomerComplainUserViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerComplainUserViewComponent]
    });
    fixture = TestBed.createComponent(CustomerComplainUserViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
