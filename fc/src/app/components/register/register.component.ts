import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../core/api.service';
import { SharedService } from '../../shared/shared.service';
import { Router } from '@angular/router';
import { Student } from '../../core/student.model';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  imports: []
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private apiService = inject(ApiService);
  private sharedService = inject(SharedService);
  private router = inject(Router);
  registerForm!: FormGroup;
  student: Student | null = null;

  ngOnInit() {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      examDate: ['', Validators.required]
    });

    this.sharedService.selectedStudent$.subscribe(student => {
      this.student = student;
      if (student) this.registerForm.patchValue(student);
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const studentData: Student = {
        ...this.registerForm.value,
        registrationNumber: `REG-${Date.now()}`
      };
      const request$ = this.student?.id
        ? this.apiService.updateStudent(this.student.id, studentData)
        : this.apiService.createStudent(studentData);

      request$.pipe(switchMap(() => this.apiService.getStudents()))
        .subscribe({
          next: () => this.router.navigate(['/students']),
          error: (err) => console.error(err)
        });
    }
  }

  onEdit() {
    if (this.student) this.sharedService.setSelectedStudent(this.student);
  }
}