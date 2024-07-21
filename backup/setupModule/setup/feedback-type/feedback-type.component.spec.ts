import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackTypeComponent } from './feedback-type.component';

describe('FeedbackTypeComponent', () => {
  let component: FeedbackTypeComponent;
  let fixture: ComponentFixture<FeedbackTypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FeedbackTypeComponent]
    });
    fixture = TestBed.createComponent(FeedbackTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
