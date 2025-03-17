import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Student } from '../core/student.model';

@Injectable({ providedIn: 'root' })
export class SharedService {
  private selectedStudentSubject = new BehaviorSubject<Student | null>(null);
  selectedStudent$ = this.selectedStudentSubject.asObservable();

  setSelectedStudent(student: Student) {
    this.selectedStudentSubject.next(student);
  }
}