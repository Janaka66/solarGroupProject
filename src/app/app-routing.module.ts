import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path : '',
    component : HomeComponent,
  },
  {
    path: 'customers',
    loadChildren: () => import('./modules/cutomerModule/customers.module').then(m => m.CustomersModule)
  },
  {
    path: 'employees',
    loadChildren: () => import('./modules/employeeModule/employee.module').then(m => m.EmployeeModule)
  },
  {
    path: 'inquiries',
    loadChildren: () => import('./modules/inquiries/inquiries.module').then(m => m.InquiriesModule),
  },
  {
    path: 'complains',
    loadChildren: () => import('./modules/complains/complains.module').then(m => m.ComplainsModule),
  },
  { path: '', redirectTo: 'setup', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
