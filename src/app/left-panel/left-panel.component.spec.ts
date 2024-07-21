import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftPanelComponent } from './left-panel.component';

describe('LeftPanalComponent', () => {
  let component: LeftPanelComponent;
  let fixture: ComponentFixture<LeftPanelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LeftPanelComponent]
    });
    fixture = TestBed.createComponent(LeftPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
