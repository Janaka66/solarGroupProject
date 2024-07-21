import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackStatusComponent } from './feedback-status.component';

describe('FeedbackStatusComponent', () => {
  let component: FeedbackStatusComponent;
  let fixture: ComponentFixture<FeedbackStatusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FeedbackStatusComponent]
    });
    fixture = TestBed.createComponent(FeedbackStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
