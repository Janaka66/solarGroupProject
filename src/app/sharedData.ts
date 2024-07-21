import { Injectable } from '@angular/core';
import { ProductsComponent } from './modules/products/products/products.component';
import { CompleationsComponent } from './modules/compleations/compleations/compleations.component';
import { VisitorsComponent } from './modules/visitors/visitors/visitors.component';
import { CustomersComponent } from './modules/cutomerModule/customers/customers.component';
import { CustomerProductsComponent } from './modules/cutomerModule/customers/customer-products/customer-products.component';
import { CustomerInvoicesComponent } from './modules/cutomerModule/customers/customer-invoices/customer-invoices.component';
import { CustomerQuotationsComponent } from './modules/cutomerModule/customers/customer-quotations/customer-quotations.component';
import { CustomerPaymentsComponent } from './modules/cutomerModule/customers/customer-payments/customer-payments.component';
import { CustomerProfileComponent } from './modules/cutomerModule/customers/customer-profile/customer-profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployeeComponent } from './modules/employeeModule/employee/employee.component';
import { CustomerInquiriesComponent } from './modules/inquiries/customer-inquiries/customer-inquiries.component';
import { ManageInquiriesComponent } from './modules/inquiries/manage-inquiries/manage-inquiries.component';
import { CustomerComplainsComponent } from './modules/complains/customer-complains/customer-complains.component';
import { ManageComplainsComponent } from './modules/complains/manage-complains/manage-complains.component';

@Injectable({
    providedIn: 'root'
})

export class sharedData{

    allSavedItemTypes = [] as any;
    
    majorCompInfo = [

        {icon : "", title: "Dashboard",                     comp: DashboardComponent,   idx: 1,                 children: []} ,
        {icon : "", title: "Products",                      comp: ProductsComponent,    idx: 2,                 children: []} ,
        {icon : "", title: "Customers",     idx: 0, children: [
            {icon : "", title: "Customers",                 comp: CustomersComponent,           idx: 3},
            {icon : "", title: "Customer Products",         comp: CustomerProductsComponent,    idx: 4},
            {icon : "", title: "Customer Invoices",         comp: CustomerInvoicesComponent,    idx: 5},
            {icon : "", title: "Customer Quotations",       comp: CustomerQuotationsComponent,  idx: 6},
            {icon : "", title: "Customer Payments",         comp: CustomerPaymentsComponent,    idx: 7},
            {icon : "", title: "Customer Profiles",         comp: CustomerProfileComponent,     idx: 8}
            
        ]} ,
        {icon : "", title: "Completions",                   comp: CompleationsComponent,        idx: 9,         children: []} ,
        {icon : "", title: "Vistors",                       comp: VisitorsComponent,            idx: 10,        children: []} ,
        // {icon : "", title: "Setup",         idx: 0, children: [
        //     {icon : "", title: "Document Types",            comp: DocTypesComponent,            idx: 11},
        //     {icon : "", title: "Brands",                    comp: BrandComponent,               idx: 12},
        //     {icon : "", title: "Company",                   comp: CompanyComponent,             idx: 13},
        //     {icon : "", title: "Item Types",                comp: ItemTypesComponent,           idx: 14},
        //     {icon : "", title: "Items",                     comp: ItemsComponent,               idx: 15},
        //     {icon : "", title: "Manufactures",              comp: ManufactureComponent,         idx: 16},
        //     {icon : "", title: "Stages",                    comp: StagesComponent,              idx: 17},
        //     {icon : "", title: "Feedback Status",           comp: FeedbackStatusComponent,      idx: 18},
        //     {icon : "", title: "Feedback Type",             comp: FeedbackTypeComponent,        idx: 19},
        //     {icon : "", title: "Designations",              comp: DesignationComponent,         idx: 20}
        // ]} ,
        {icon : "", title: "Employees",     idx: 0, children: [
            {icon : "", title: "Add Employees",             comp: EmployeeComponent,            idx: 21}
        ]} ,
        {icon : "", title: "Inquires",      idx: 0, children: [            
            {icon : "", title: "Customer Inquiries",        comp: CustomerInquiriesComponent,   idx: 22},
            {icon : "", title: "Manage Inquiries",          comp: ManageInquiriesComponent,     idx: 23},
        ]},
        {icon : "", title: "Complains",     idx: 0, children: [            
            {icon : "", title: "Customer Complains",        comp: CustomerComplainsComponent,   idx: 24},
            {icon : "", title: "Manage Complains",          comp: ManageComplainsComponent,     idx: 25},
        ]} 
    ]
    

}