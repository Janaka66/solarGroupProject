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
import { CustomerComplainUserViewComponent } from './modules/complains/customer-complain-user-view/customer-complain-user-view.component';
import { CustomerInqUserViewsComponent } from './modules/inquiries/customer-inq-user-views/customer-inq-user-views.component';
import { CustomerQuotationsConfirmation } from './modules/cutomerModule/customers/customer-quotations-confirmation/customer-quotations-confirmation.component';
import { WarrantyComponent } from './modules/cutomerModule/customers/warranty/warranty.component';

@Injectable({
    providedIn: 'root'
})

export class sharedData{

    allSavedItemTypes = [] as any;
    
    majorCompInfo = [

        {icon : "dashboard", title: "Dashboard",                     comp: DashboardComponent,   idx: 1,                 children: []} ,
        {icon : "person", title: "Customer",     idx: 0, children: [
            {icon : "account_circle", title: "Customer Profile",                 comp: CustomersComponent,    idx: 3},
            {icon : "verified_user", title: "Warrenty",                 comp: WarrantyComponent,    idx: 30}
        ]} ,

        {icon : "description", title: "Quotations",     idx: 0, children: [
            {icon : "request_quote", title: "Customer Quotations",       comp: CustomerQuotationsComponent,  idx: 6},
            {icon : "check_circle", title: "Quotations Confirmation",   comp: CustomerQuotationsConfirmation,  idx: 26},
        ]},

        {icon : "receipt", title: "Invoices",     idx: 0, children: [
            {icon : "description", title: "Customer Invoices",         comp: CustomerInvoicesComponent,    idx: 5},
        ]},

        {icon : "payment", title: "Payments",     idx: 0, children: [
            {icon : "attach_money", title: "Customer Payments",         comp: CustomerPaymentsComponent,    idx: 7},
        ]},

        {icon : "shopping_cart", title: "Products",     idx: 0, children: [
            {icon : "shopping_bag", title: "Customer Products",         comp: CustomerProductsComponent,    idx: 4},
        ]},

        {icon : "group", title: "Employees",     idx: 0, children: [
            {icon : "person_add", title: "Add Employees",             comp: EmployeeComponent,            idx: 21}
        ]} ,
        {icon : "question_answer", title: "Inquires",      idx: 0, children: [            
            {icon : "help_outline", title: "Customer Inquiries",        comp: CustomerInquiriesComponent,   idx: 22},
            {icon : "manage_accounts", title: "Manage Inquiries",          comp: ManageInquiriesComponent,     idx: 23},
            {icon : "", title: "cust Inquiries userMode",          comp: CustomerInqUserViewsComponent,     idx: 30},
        ]},
        {icon : "report_problem", title: "Complains",     idx: 0, children: [            
            {icon : "feedback", title: "Customer Complains",        comp: CustomerComplainsComponent,   idx: 24},
            {icon : "settings", title: "Manage Complains",          comp: ManageComplainsComponent,     idx: 25},
            {icon : "", title: "cust Complain userMode",          comp: CustomerComplainUserViewComponent,     idx: 31},
        ]},
        {icon : "account_box", title: "User", comp: CustomerProfileComponent,   idx: 8, children: []} , 
    ]
    

}