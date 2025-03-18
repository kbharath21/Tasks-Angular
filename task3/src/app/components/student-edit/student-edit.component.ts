import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { StudentService } from '../../services/student.service';
import { Student } from '../../models/student.model';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-student-edit',
  standalone: true, 
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule
  ],
  templateUrl: './student-edit.component.html',
  styleUrl: './student-edit.component.css'
})
export class StudentEditComponent implements OnInit {
  private activatedRouter = inject(ActivatedRoute);
  private studentService = inject(StudentService);
  private router = inject(Router);

  student!: Student;
  studentId!: string;
  form!: FormGroup;

  ngOnInit(): void {
    // Get the student ID from the URL
    this.studentId = this.activatedRouter.snapshot.params['id'];

    // Initialize the form with validation
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      age: new FormControl('', Validators.required),
      course: new FormControl('', Validators.required)
    });

    // If student ID exists, fetch student details and populate the form
    if (this.studentId) {
      this.studentService.getById(this.studentId).subscribe(
        data => {
          this.student = data;
          this.form.patchValue(data);
        },
        error => {
          console.log('Error fetching student details:', error);
        }
      );
    }
  }

  onSubmit(): void {
    // Check if the form is valid before submitting
    if (this.form.valid) {
      this.studentService.put(this.studentId, this.form.value).subscribe(
        data => {
          console.log('Student details updated:', data);
          this.router.navigate(['/']); // Navigate back to the list after updating
        },
        error => {
          console.log('Error updating student:', error);
        }
      );
    }
  }
}
