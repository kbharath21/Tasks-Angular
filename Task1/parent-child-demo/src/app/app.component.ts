// app.component.ts
import { Component } from '@angular/core';
import { ParentComponent } from './parent/parent.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ParentComponent, CommonModule], // Import ParentComponent here
  template: `
    <h1>Parent-Child Communication</h1>
    <app-parent></app-parent>
  `,
})
export class AppComponent {}