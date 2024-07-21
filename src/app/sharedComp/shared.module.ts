import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeSearchComponent } from './employee-search/employee-search.component';
import { CustomerSearchComponent } from './customer-search/customer-search.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonLoaderComponent } from '../sharedComp/common-loader/common-loader.component';
import { NotificationDialogComponent } from './notification-dialog/notification-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogModule } from 'primeng/dialog';


@NgModule({
  declarations: [EmployeeSearchComponent, CustomerSearchComponent, CommonLoaderComponent, NotificationDialogComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatDialogModule,
    DialogModule
  ],
  exports: [
    EmployeeSearchComponent,
    CustomerSearchComponent,
    CommonLoaderComponent,
    NotificationDialogComponent
  ]
})
export class SharedModule { }
