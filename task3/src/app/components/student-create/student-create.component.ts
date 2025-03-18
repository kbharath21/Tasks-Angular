import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { StudentService } from '../../services/student.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-student-create',
  imports: [
    MatButtonModule,
    RouterModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule
  ],
  templateUrl: './student-create.component.html',
  styleUrl: './student-create.component.css'
})
export class StudentCreateComponent implements OnInit {


  form!: FormGroup;

  constructor(
    private studentService: StudentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      age: new FormControl('', Validators.required),
      course: new FormControl('', [Validators.required, Validators.minLength(3)]),
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.studentService.post(this.form.value).subscribe(
        data => {
        console.log('Customer created:', data);
        this.router.navigate(['/']);
      },
        error => {
          console.log('Error:', error);
        }
      );
    }
  }
}