import { Routes } from '@angular/router';
import { StudentListComponent } from './components/student-list/student-list.component';
import { StudentCreateComponent } from './components/student-create/student-create.component';
import { StudentEditComponent } from './components/student-edit/student-edit.component';
import { StudentDetailsComponent } from './components/student-details/student-details.component';

export const routes: Routes = [
    {
        path: '',
        component: StudentListComponent
    },
    {
        path: 'create',
        component: StudentCreateComponent
    },
    {
        path: 'edit/:id',
        component: StudentEditComponent
    },
    {
        path: 'details/:id',
        component: StudentDetailsComponent
    }

];