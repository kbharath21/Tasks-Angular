import { Component } from '@angular/core';
import { FormEntryComponent } from './form-entry.component';
import { StatusFilterComponent } from './status-filter.component';
import { EntryListComponent } from './entry-list.component';

@Component({
  selector: 'app-root', 
  standalone: true, 
  imports: [FormEntryComponent, StatusFilterComponent, EntryListComponent],
  template: `
    <div class="app-container">
      <h1>Placement Registration Form</h1> 
      <app-form-entry></app-form-entry> <!-- Component for adding new entries -->
      <app-status-filter></app-status-filter> <!-- Component to filter entries based on status -->
      <app-entry-list></app-entry-list> <!-- Displays the list of registered entries -->
    </div>
  `,
  styles: [
    `
      .app-container {
        max-width: 800px; /* Keeps the UI compact */
        margin: 0 auto; /* Centers the container */
        padding: 20px;
        font-family: Arial, sans-serif;
      }
      h1 {
        text-align: center; /* Centers the heading */
        color: #333; /* Dark gray text color for better readability */
      }
    `,
  ],
})
export class AppComponent {}

// this is main component it renders all sub components  
// first form component lets user add data then filter component helps sorting  
// last entry list component shows whatever is added after filtering  
