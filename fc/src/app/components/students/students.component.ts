import { Component, inject } from '@angular/core';
import { ApiService } from '../../core/api.service';
import { SharedService } from '../../shared/shared.service';
import { Student } from '../../core/student.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-students',
  standalone: true,
  templateUrl: './students.component.html',
  imports: []
})
export class StudentsComponent {
  private apiService = inject(ApiService);
  private sharedService = inject(SharedService);
  private router = inject(Router);
  students: Student[] = [];

  ngOnInit() {
    this.apiService.getStudents().subscribe({
      next: (data) => this.students = data,
      error: (err) => console.error(err)
    });
  }

  editStudent(student: Student) {
    this.sharedService.setSelectedStudent(student);
    this.router.navigate(['/register']);
  }

  deleteStudent(id: number) {
    this.apiService.deleteStudent(id).subscribe({
      next: () => this.students = this.students.filter(s => s.id !== id),
      error: (err) => console.error(err)
    });
  }
}