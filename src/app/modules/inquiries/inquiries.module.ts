import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { SharedModule } from 'src/app/sharedComp/shared.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CustomerInquiriesComponent } from './customer-inquiries/customer-inquiries.component';
import { ManageInquiriesComponent } from './manage-inquiries/manage-inquiries.component';

@NgModule({
  declarations: [
    CustomerInquiriesComponent,
    ManageInquiriesComponent
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
  ]
})
export class InquiriesModule { }
