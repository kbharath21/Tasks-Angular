import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StudentEditComponent } from './student-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

describe('StudentEditComponent', () => {
  let component: StudentEditComponent;
  let fixture: ComponentFixture<StudentEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentEditComponent], 
      imports: [ReactiveFormsModule, RouterTestingModule] 
    }).compileComponents();

    fixture = TestBed.createComponent(StudentEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
