import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StudentDetailsComponent } from './student-details.component';

describe('StudentDetailsComponent', () => {
  let component: StudentDetailsComponent;
  let fixture: ComponentFixture<StudentDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentDetailsComponent], // Use `declarations` instead of `imports`
    }).compileComponents();

    fixture = TestBed.createComponent(StudentDetailsComponent);
    component = fixture.componentInstance;

    // Initialize with mock student data
    

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display correct student details', () => {
    const compiled = fixture.nativeElement;
    
    expect(compiled.textContent).toContain('John Doe');
    expect(compiled.textContent).toContain('22');
    expect(compiled.textContent).toContain('Computer Science');
  });
});
