import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonLoaderComponent } from './common-loader.component';

describe('CommonLoaderComponent', () => {
  let component: CommonLoaderComponent;
  let fixture: ComponentFixture<CommonLoaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommonLoaderComponent]
    });
    fixture = TestBed.createComponent(CommonLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
