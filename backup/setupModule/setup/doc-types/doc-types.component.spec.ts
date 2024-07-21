import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocTypesComponent } from './doc-types.component';

describe('DocTypesComponent', () => {
  let component: DocTypesComponent;
  let fixture: ComponentFixture<DocTypesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DocTypesComponent]
    });
    fixture = TestBed.createComponent(DocTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
