import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersComponent } from './customers/customers.component';
import { CustomerInvoicesComponent } from './customers/customer-invoices/customer-invoices.component';
import { CarouselModule } from 'primeng/carousel';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSelectModule } from '@angular/material/select';
import { NgxPrintModule } from 'ngx-print';
import { AgGridModule } from 'ag-grid-angular';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { FormViewerComponent } from 'src/app/form-viewer/form-viewer.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { CustomerQuotationsComponent } from './customers/customer-quotations/customer-quotations.component';
import { CustomerPaymentsComponent } from './customers/customer-payments/customer-payments.component';
import { CustomerProductsComponent } from './customers/customer-products/customer-products.component';
import { CustomerProfileComponent } from './customers/customer-profile/customer-profile.component';
import { SharedModule } from 'src/app/sharedComp/shared.module';
import { FormViewerQoutComponent } from 'src/app/form-viewer-qout/form-viewer-qout.component';
import { MatTableModule } from '@angular/material/table';
import { CustomerQuotationsConfirmation } from './customers/customer-quotations-confirmation/customer-quotations-confirmation.component';
import { RormViewerQoutConfirm } from 'src/app/form-viewer-qout-confirm/form-viewer-qout-confirm.component';
import { WarrantyComponent } from './customers/warranty/warranty.component';

@NgModule({
  declarations: [
    CustomersComponent, 
    CustomerQuotationsComponent,
    CustomerProfileComponent,
    CustomerProductsComponent,
    CustomerPaymentsComponent,
    CustomerInvoicesComponent,
    FormViewerComponent,
    FormViewerQoutComponent,
    CustomerQuotationsConfirmation,
    RormViewerQoutConfirm,
    WarrantyComponent
  ],
  imports: [
    NgxPrintModule,
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
    MatIconModule,
    CarouselModule,
    AgGridModule,
    MatStepperModule,
    MatTableModule
  ]
})
export class CustomersModule { }
