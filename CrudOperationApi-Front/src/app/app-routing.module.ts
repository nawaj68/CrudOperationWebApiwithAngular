import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeCreateUpdateComponent } from './components/employee/employee-create-update/employee-create-update.component';
import { EmployeeDetailsComponent } from './components/employee/employee-details/employee-details.component';
import { EmployeeListComponent } from './components/employee/employee-list/employee-list.component';

const routes: Routes = [
  {
    path:'employeeList',
    component:EmployeeListComponent
  },
  {
    path:'employee/create',
    component: EmployeeCreateUpdateComponent
  },
  {
    path: 'employee/edit/:id', 
    component: EmployeeCreateUpdateComponent
   },
   {
     path: 'employee/details/:id', 
     component: EmployeeDetailsComponent
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
