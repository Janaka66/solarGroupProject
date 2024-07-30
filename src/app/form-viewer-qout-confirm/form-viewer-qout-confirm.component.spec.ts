import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RormViewerQoutConfirm } from './form-viewer-qout-confirm.component';

describe('RormViewerQoutConfirm', () => {
  let component: RormViewerQoutConfirm;
  let fixture: ComponentFixture<RormViewerQoutConfirm>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RormViewerQoutConfirm]
    });
    fixture = TestBed.createComponent(RormViewerQoutConfirm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
