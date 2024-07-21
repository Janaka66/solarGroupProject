import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleationsComponent } from './compleations.component';

describe('CompleationsComponent', () => {
  let component: CompleationsComponent;
  let fixture: ComponentFixture<CompleationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompleationsComponent]
    });
    fixture = TestBed.createComponent(CompleationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
