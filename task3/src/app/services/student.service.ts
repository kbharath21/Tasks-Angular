import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '../models/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private API_SERVER = "http://localhost:3000/students";
  constructor(
    private http: HttpClient
  ) { }

  get(): Observable<Student[]>{
    return this.http.get<Student[]>(this.API_SERVER);
  }

  getById(id: string): Observable<Student>{
    return this.http.get<Student>(this.API_SERVER + '/' + id);
  }

  post(student: Student): Observable<Student>{
    return this.http.post<Student>(this.API_SERVER, student);
  }

  put(id: string, student: Student): Observable<Student>{
    return this.http.put<Student>(this.API_SERVER + '/' + id, student);
  }
  delete(studentId: number): Observable<void> {
    return this.http.delete<void>(`${this.API_SERVER}/${studentId}`);
  }
  
}