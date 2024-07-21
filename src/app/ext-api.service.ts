import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExtApiService {

  constructor(private http: HttpClient) {}

  registerCustomer(payload: object): Promise<any> {
    return this.http.post<any>('http://www.solardb.somee.com/api/Customer/RegisterCustomer', payload).toPromise();
    
  }

  getAllCustomers(reqData = ''): Promise<any> {
    return this.http.post<any>('http://www.solardb.somee.com/api/Customer/Customers', reqData).toPromise();
    
  }

  getCustomersEmails(custID: any){
    return this.http.post<any>('http://www.solardb.somee.com/api/Customer/CustomersEmails', custID).toPromise();
  }

  CustomerAddresses(custID: any){
    return this.http.post<any>(`http://www.solardb.somee.com/api/Customer/CustomerAddresses?addId=${custID}`, '').toPromise();
  }

  updateCustomer(payload: object): Promise<any> {
    return this.http.put<any>('http://www.solardb.somee.com/api/Customer/UpdateCustomer', payload).toPromise();
    
  }

  updateCustAddresses(payload: object): Promise<any> {
    return this.http.put<any>('http://www.solardb.somee.com/api/Customer/UpdateCustomerAddress', payload).toPromise();
    
  }

  updateCustPhones(payload: object): Promise<any> {
    return this.http.put<any>('http://www.solardb.somee.com/api/Customer/UpdateCustomerPhone', payload).toPromise();
    
  }

  addNewCustomerPhone(payload: object): Promise<any> {
    return this.http.post<any>('http://www.solardb.somee.com/api/Customer/AddNewCustomerPhone', payload).toPromise();
    
  }

  updateCustEmails(payload: object): Promise<any> {
    return this.http.put<any>('http://www.solardb.somee.com/api/Customer/UpdateCustomerEmail', payload).toPromise();
    
  }

  addNewCustomerEmail(payload: object): Promise<any> {
    return this.http.post<any>('http://www.solardb.somee.com/api/Customer/addNewCustomerEmail', payload).toPromise();
    
  }
  
  AddNewCustomerAddress(payload: object): Promise<any> {
    return this.http.post<any>('http://www.solardb.somee.com/api/Customer/AddNewCustomerAddress', payload).toPromise();
    
  }

  UpdateCustomerProfileImg(payload: FormData): Promise<any> {
    return this.http.post<any>('http://www.solardb.somee.com/api/Customer/UpdateCustomerProfileImg', payload).toPromise();
    
  }

  AddCustomerDocument(payload: FormData): Promise<any> {
    return this.http.post<any>('http://www.solardb.somee.com/api/Customer/AddCustomerDocument', payload).toPromise();
    
  }

  UpdateCustomerDoc(payload: object): Promise<any> {
    return this.http.put<any>('http://www.solardb.somee.com/api/Customer/UpdateCustomerDoc', payload).toPromise();
    
  }
  

  GetCustomerDocs(payload : object): Promise<any> {
    return this.http.post<any>(`http://www.solardb.somee.com/api/Customer/GetCustomerDocs`, payload).toPromise();
    
  }

  DocTypes(): Promise<any> {
    return this.http.post<any>(`http://www.solardb.somee.com/api/Setup/DocTypes`, '').toPromise();
    
  }

  AddDocType(reqFields: any): Promise<any> {
    return this.http.post<any>(`http://www.solardb.somee.com/api/Setup/AddDocType`, reqFields).toPromise();
    
  }

  UpdateDocType(reqFields: any): Promise<any> {
    return this.http.put<any>(`http://www.solardb.somee.com/api/Setup/UpdateDocType`, reqFields).toPromise();
    
  }

  Stages(): Promise<any> {
    return this.http.post<any>(`http://www.solardb.somee.com/api/Setup/Stages`, '').toPromise();
    
  }

  AddStage(reqFields: any): Promise<any> {
    return this.http.post<any>(`http://www.solardb.somee.com/api/Setup/AddStage`, reqFields).toPromise();
    
  }

  UpdateStage(reqFields: any): Promise<any> {
    return this.http.put<any>(`http://www.solardb.somee.com/api/Setup/UpdateStage`, reqFields).toPromise();
    
  }

  ItemTypes(): Promise<any> {
    return this.http.post<any>(`http://www.solardb.somee.com/api/Setup/ItemTypes`, '').toPromise();
    
  }

  AddItemType(reqFields: any): Promise<any> {
    return this.http.post<any>(`http://www.solardb.somee.com/api/Setup/AddItemType`, reqFields).toPromise();
    
  }

  UpdateItemType(reqFields: any): Promise<any> {
    return this.http.put<any>(`http://www.solardb.somee.com/api/Setup/UpdateItemType`, reqFields).toPromise();
    
  }

  Items(): Promise<any> {
    return this.http.post<any>(`http://www.solardb.somee.com/api/Setup/Items`, '').toPromise();
    
  }

  AddItems(reqFields: any): Promise<any> {
    return this.http.post<any>(`http://www.solardb.somee.com/api/Setup/AddItem`, reqFields).toPromise();
    
  }

  UpdateItem(reqFields: any): Promise<any> {
    return this.http.put<any>(`http://www.solardb.somee.com/api/Setup/UpdateItem`, reqFields).toPromise();
    
  }

  Manufacturer(): Promise<any> {
    return this.http.post<any>(`http://www.solardb.somee.com/api/Setup/Manufacturer`, '').toPromise();
    
  }

  AddManufac(reqFields: any): Promise<any> {
    return this.http.post<any>(`http://www.solardb.somee.com/api/Setup/AddManufac`, reqFields).toPromise();
    
  }

  UpdateManufacturer(reqFields: any): Promise<any> {
    return this.http.put<any>(`http://www.solardb.somee.com/api/Setup/UpdateManufacturer`, reqFields).toPromise();
    
  }

  AddCompany(reqFields: any): Promise<any> {
    return this.http.post<any>(`http://www.solardb.somee.com/api/Setup/AddCompany`, reqFields).toPromise();
    
  }

  updateCopany(reqFields: any): Promise<any> {
    return this.http.put<any>(`http://www.solardb.somee.com/api/Setup/UpdateCompany`, reqFields).toPromise();
    
  }

  GetCompany(): Promise<any> {
    return this.http.post<any>(`http://www.solardb.somee.com/api/Setup/GetCompany`, '').toPromise();
    
  }

  AddBrand(reqFields: object): Promise<any> {
    return this.http.post<any>(`http://www.solardb.somee.com/api/Setup/AddBrand`, reqFields).toPromise();
    
  }

  UpdateBrand(reqFields: object): Promise<any> {
    return this.http.put<any>(`http://www.solardb.somee.com/api/Setup/UpdateBrand`, reqFields).toPromise();
    
  }

  GetBrand(): Promise<any> {
    return this.http.post<any>(`http://www.solardb.somee.com/api/Setup/GetBrand`, '').toPromise();
    
  }

  AddFeedbackStatus(reqFields: object): Promise<any> {
    return this.http.post<any>(`http://www.solardb.somee.com/api/Setup/AddFeedbackStatus`, reqFields).toPromise();
    
  }

  UpdateFeedbackStatus(reqFields: object): Promise<any> {
    return this.http.put<any>(`http://www.solardb.somee.com/api/Setup/UpdateFeedbackStatus`, reqFields).toPromise();
    
  }

  GetFeedbackStatus(): Promise<any> {
    return this.http.post<any>(`http://www.solardb.somee.com/api/Setup/GetFeedbackStatus`, '').toPromise();
    
  }

  
  AddFeedbackType(reqFields: object): Promise<any> {
    return this.http.post<any>(`http://www.solardb.somee.com/api/Setup/AddFeedbackType`, reqFields).toPromise();
    
  }

  UpdateFeedbackType(reqFields: object): Promise<any> {
    return this.http.put<any>(`http://www.solardb.somee.com/api/Setup/UpdateFeedbackType`, reqFields).toPromise();
    
  }

  GetFeedbacktype(): Promise<any> {
    return this.http.post<any>(`http://www.solardb.somee.com/api/Setup/GetFeedbacktype`, '').toPromise();
    
  }

  AddEmployee(reqFields: object): Promise<any> {
    return this.http.post<any>(`http://www.solardb.somee.com/api/Employee/AddEmployee`, reqFields).toPromise();
    
  }

  UpdateEmployee(reqFields: object): Promise<any> {
    return this.http.post<any>(`http://www.solardb.somee.com/api/Employee/UpdateEmployee`, reqFields).toPromise();
    
  }

  GetEmployee(reqFields?: any): Promise<any> {
    return this.http.post<any>(`http://www.solardb.somee.com/api/Employee/GetEmployee`, reqFields ,{headers: new HttpHeaders().set('Content-Type', 'application/json')},).toPromise();
  }

  GetEmployeeDesignation(desigID?: any): Promise<any> {
    return this.http.post<any>(`http://www.solardb.somee.com/api/Employee/GetEmployeeDesignation`, desigID, {headers: new HttpHeaders().set('Content-Type', 'application/json')},).toPromise();
    
  }

  AddEmployeeDesignation(desigID?: any): Promise<any> {
    return this.http.post<any>(`http://www.solardb.somee.com/api/Employee/AddEmployeeDesignation`, desigID, {headers: new HttpHeaders().set('Content-Type', 'application/json')},).toPromise();
    
  }

  UpdateEmployeeDesignation(desigID?: any): Promise<any> {
    return this.http.post<any>(`http://www.solardb.somee.com/api/Employee/UpdateEmployeeDesignation`, desigID, {headers: new HttpHeaders().set('Content-Type', 'application/json')},).toPromise();
    
  }

  GetCustomerInquiry(reqFields?: any): Promise<any> {
    return this.http.post<any>(`http://www.solardb.somee.com/api/CustomerFeedback/GetCustomerInquiry`, reqFields, {headers: new HttpHeaders().set('Content-Type', 'application/json')},).toPromise();
    
  }

  UpdateCustomerInquiry(reqFields?: any): Promise<any> {
    return this.http.put<any>(`http://www.solardb.somee.com/api/CustomerFeedback/UpdateCustomerInquiry`, reqFields, {headers: new HttpHeaders().set('Content-Type', 'application/json')},).toPromise();
    
  }

  AddCustomerInquiry(reqFields?: any): Promise<any> {
    return this.http.post<any>(`http://www.solardb.somee.com/api/CustomerFeedback/AddCustomerInquiry`, reqFields, {headers: new HttpHeaders().set('Content-Type', 'application/json')},).toPromise();
    
  }

  GetCustomerInqHasEmp(reqFields?: any): Promise<any> {
    return this.http.post<any>(`http://www.solardb.somee.com/api/CustomerFeedback/GetCustomerInqHasEmp`, reqFields, {headers: new HttpHeaders().set('Content-Type', 'application/json')},).toPromise();
    
  }

  GetCustomerComplainHasEmp(reqFields?: any): Promise<any> {
    return this.http.post<any>(`http://www.solardb.somee.com/api/CustomerFeedback/GetCustomerComplainHasEmp`, reqFields, {headers: new HttpHeaders().set('Content-Type', 'application/json')},).toPromise();
    
  }

  UpdateCustomerInquiryEmp(reqFields?: any): Promise<any> {
    return this.http.put<any>(`http://www.solardb.somee.com/api/CustomerFeedback/UpdateCustomerInquiryEmp`, reqFields, {headers: new HttpHeaders().set('Content-Type', 'application/json')},).toPromise();
    
  }

  UpdateCustomerComplainEmp(reqFields?: any): Promise<any> {
    return this.http.put<any>(`http://www.solardb.somee.com/api/CustomerFeedback/UpdateCustomerComplainEmp`, reqFields, {headers: new HttpHeaders().set('Content-Type', 'application/json')},).toPromise();
    
  }

  AddCustomerComplain(reqFields?: any): Promise<any> {
    return this.http.post<any>(`http://www.solardb.somee.com/api/CustomerFeedback/AddCustomerComplain`, reqFields, {headers: new HttpHeaders().set('Content-Type', 'application/json')},).toPromise();
    
  }

  UpdateCustomerComplain(reqFields?: any): Promise<any> {
    return this.http.put<any>(`http://www.solardb.somee.com/api/CustomerFeedback/UpdateCustomerComplain`, reqFields, {headers: new HttpHeaders().set('Content-Type', 'application/json')},).toPromise();
    
  }

  GetCustomerCompalin(reqFields?: any): Promise<any> {
    return this.http.post<any>(`http://www.solardb.somee.com/api/CustomerFeedback/GetCustomerCompalin`, reqFields, {headers: new HttpHeaders().set('Content-Type', 'application/json')},).toPromise();
    
  }

  UpdateEmployeesAssignedInquiry(reqFields?: any): Promise<any> {
    return this.http.put<any>(`http://www.solardb.somee.com/api/CustomerFeedback/UpdateEmployeesAssignedInquiry`, reqFields, {headers: new HttpHeaders().set('Content-Type', 'application/json')},).toPromise();
    
  }

  UpdateEmployeeAssignedComplain(reqFields?: any): Promise<any> {
    return this.http.put<any>(`http://www.solardb.somee.com/api/CustomerFeedback/UpdateEmployeeAssignedComplain`, reqFields, {headers: new HttpHeaders().set('Content-Type', 'application/json')},).toPromise();
    
  }

  AddInvoice(reqFields?: any): Promise<any> {
    return this.http.post<any>(`http://www.solardb.somee.com/api/Invoice/AddInvoice`, reqFields, {headers: new HttpHeaders().set('Content-Type', 'application/json')},).toPromise();
    
  }

  UpdateInvoice(reqFields?: any): Promise<any> {
    return this.http.put<any>(`http://www.solardb.somee.com/api/Invoice/UpdateInvoice`, reqFields, {headers: new HttpHeaders().set('Content-Type', 'application/json')},).toPromise();
    
  }

  GetInvoice(custID?: any): Promise<any> {
    return this.http.post<any>(`http://www.solardb.somee.com/api/Invoice/GetInvoice`, custID, {headers: new HttpHeaders().set('Content-Type', 'application/json')},).toPromise();
    
  }

  UpdateInvoiceItem(reqFields?: any): Promise<any> {
    return this.http.post<any>(`http://www.solardb.somee.com/api/Invoice/UpdateInvoiceItem`, reqFields, {headers: new HttpHeaders().set('Content-Type', 'application/json')},).toPromise();
    
  }

  GetInvoiceItem(reqFields?: any): Promise<any> {
    return this.http.post<any>(`http://www.solardb.somee.com/api/Invoice/GetInvoiceItem`, reqFields, {headers: new HttpHeaders().set('Content-Type', 'application/json')},).toPromise();
    
  }

}
