import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StudentCreateComponent } from './student-create.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('StudentCreateComponent', () => {
  let component: StudentCreateComponent;
  let fixture: ComponentFixture<StudentCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentCreateComponent], // Use declarations instead of imports
      schemas: [NO_ERRORS_SCHEMA] // Ignore unknown elements (e.g., Material components)
    })
    .overrideComponent(StudentCreateComponent, {
      set: { selector: 'app-student-create' }
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Test case to check component creation
  it('should create the StudentCreateComponent', () => {
    expect(component).toBeTruthy();
  });

  // Test case to check if form exists in the component
  it('should have a form element', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('form')).toBeTruthy();
  });
});
