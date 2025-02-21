import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectMultiselectComponent } from './subject-multiselect.component';

describe('SubjectMultiselectComponent', () => {
  let component: SubjectMultiselectComponent;
  let fixture: ComponentFixture<SubjectMultiselectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubjectMultiselectComponent]
    });
    fixture = TestBed.createComponent(SubjectMultiselectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
