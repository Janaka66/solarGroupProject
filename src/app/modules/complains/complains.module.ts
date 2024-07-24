import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { SharedModule } from 'src/app/sharedComp/shared.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CustomerComplainsComponent } from './customer-complains/customer-complains.component';
import { ManageComplainsComponent } from './manage-complains/manage-complains.component';
import { CustomerComplainUserViewComponent } from './customer-complain-user-view/customer-complain-user-view.component';
import { MatListModule } from '@angular/material/list';


@NgModule({
  declarations: [
    CustomerComplainsComponent,
    ManageComplainsComponent,
    CustomerComplainUserViewComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    SharedModule,
    MatDatepickerModule,
    MatListModule
  ]
})
export class ComplainsModule { }
