import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CarouselModule } from 'primeng/carousel';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { MatStepperModule } from '@angular/material/stepper';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { NgxPrintModule } from 'ngx-print';
import { AgGridModule } from 'ag-grid-angular';
import { MatPaginatorModule } from '@angular/material/paginator'; 
import { MatIconModule } from '@angular/material/icon';
import { ChartModule } from 'primeng/chart';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { DocTypesComponent } from './setup/doc-types/doc-types.component';
import { ItemTypesComponent } from './setup/item-types/item-types.component';
import { ItemsComponent } from './setup/items/items.component';
import { ManufactureComponent } from './setup/manufacture/manufacture.component';
import { StagesComponent } from './setup/stages/stages.component';
import { SetupComponent } from './setup/setup.component';
import { CompanyComponent } from './setup/company/company.component';
import { BrandComponent } from './setup/brand/brand.component';
import { FeedbackStatusComponent } from './setup/feedback-status/feedback-status.component';
import { FeedbackTypeComponent } from './setup/feedback-type/feedback-type.component';
import { DesignationComponent } from './setup/designation/designation.component';

@NgModule({
  declarations: [
    SetupComponent,
    StagesComponent, 
    ManufactureComponent, 
    ItemsComponent, 
    ItemTypesComponent,
    DocTypesComponent,
    CompanyComponent,
    BrandComponent,
    FeedbackStatusComponent,
    FeedbackTypeComponent,
    DesignationComponent
],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatExpansionModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatFormFieldModule,
    MatInputModule,
    AgGridModule,
    MatPaginatorModule,
    MatIconModule,
    ChartModule,
    HttpClientModule,
    CarouselModule,
    TagModule,
    ButtonModule,
    MatStepperModule,
    MatChipsModule,
    MatSelectModule,
    NgxPrintModule,
    MatSnackBarModule
  ]
})
export class SetupModule { }
