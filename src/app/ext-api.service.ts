import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfigService } from './app-config.service';

@Injectable({
  providedIn: 'root'
})
export class ExtApiService {

  
  constructor(private http: HttpClient, private appConfig: AppConfigService) {}

  AddUserMode(payload: object): Promise<any> {
    return this.http.post<any>(this.appConfig.getBaseUrl('api') + '/api/User/AddUserMode', payload,{
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'))
    }).toPromise();
    
  }

  GetUserMode(): Promise<any> {
    return this.http.post<any>(this.appConfig.getBaseUrl('api') + '/api/User/GetUserMode', '',{
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'))
    }).toPromise();
    
  }

  UpdateUserMode(payload: object): Promise<any> {
    return this.http.post<any>(this.appConfig.getBaseUrl('api') + '/api/User/UpdateUserMode', payload,{
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'))
    }).toPromise();
    
  }

  registerCustomer(payload: object): Promise<any> {
    return this.http.post<any>(this.appConfig.getBaseUrl('api') + '/api/Customer/RegisterCustomer', payload,{
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'))
    }).toPromise();
    
  }

  getAllCustomers(reqData = {}): Promise<any> {
    return this.http.post<any>(this.appConfig.getBaseUrl('api') + '/api/Customer/Customers', reqData,{
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'))
    }).toPromise();
    
  }

  getCustomersEmails(custID: any){
    return this.http.post<any>(this.appConfig.getBaseUrl('api') + '/api/Customer/CustomersEmails', custID,{
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'))
    }).toPromise();
  }

  CustomerAddresses(reqFields: any){
    return this.http.post<any>(this.appConfig.getBaseUrl('api') + `/api/Customer/CustomerAddresses`, reqFields,{
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'))
    }).toPromise();
  }

  updateCustomer(payload: object): Promise<any> {
    return this.http.put<any>(this.appConfig.getBaseUrl('api') + '/api/Customer/UpdateCustomer', payload,{
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'))
    }).toPromise();
    
  }

  updateCustAddresses(payload: object): Promise<any> {
    return this.http.put<any>(this.appConfig.getBaseUrl('api') + '/api/Customer/UpdateCustomerAddress', payload,{
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'))
    }).toPromise();
    
  }

  updateCustPhones(payload: object): Promise<any> {
    return this.http.put<any>(this.appConfig.getBaseUrl('api') + '/api/Customer/UpdateCustomerPhone', payload,{
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'))
    }).toPromise();
    
  }

  addNewCustomerPhone(payload: object): Promise<any> {
    return this.http.post<any>(this.appConfig.getBaseUrl('api') + '/api/Customer/AddNewCustomerPhone', payload,{
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'))
    }).toPromise();
    
  }

  updateCustEmails(payload: object): Promise<any> {
    return this.http.put<any>(this.appConfig.getBaseUrl('api') + '/api/Customer/UpdateCustomerEmail', payload,{
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'))
    }).toPromise();
    
  }

  addNewCustomerEmail(payload: object): Promise<any> {
    return this.http.post<any>(this.appConfig.getBaseUrl('api') + '/api/Customer/addNewCustomerEmail', payload,{
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'))
    }).toPromise();
    
  }
  
  AddNewCustomerAddress(payload: object): Promise<any> {
    return this.http.post<any>(this.appConfig.getBaseUrl('api') + '/api/Customer/AddNewCustomerAddress', payload,{
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'))
    }).toPromise();
    
  }

  UpdateCustomerProfileImg(payload: FormData): Promise<any> {
    return this.http.post<any>(this.appConfig.getBaseUrl('api') + '/api/Customer/UpdateCustomerProfileImg', payload,{
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'))
    }).toPromise();
    
  }

  AddCustomerDocument(payload: FormData): Promise<any> {
    return this.http.post<any>(this.appConfig.getBaseUrl('api') + '/api/Customer/AddCustomerDocument', payload,{
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'))
    }).toPromise();
    
  }

  UpdateCustomerDoc(payload: object): Promise<any> {
    return this.http.put<any>(this.appConfig.getBaseUrl('api') + '/api/Customer/UpdateCustomerDoc', payload,{
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'))
    }).toPromise();
    
  }
  

  GetCustomerDocs(payload : object): Promise<any> {
    return this.http.post<any>(this.appConfig.getBaseUrl('api') + `/api/Customer/GetCustomerDocs`, payload,{
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'))
    }).toPromise();
    
  }

  DocTypes(): Promise<any> {
    return this.http.post<any>(this.appConfig.getBaseUrl('api') + `/api/Setup/DocTypes`, '',{
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'))
    }).toPromise();
    
  }

  AddDocType(reqFields: any): Promise<any> {
    return this.http.post<any>(this.appConfig.getBaseUrl('api') + `/api/Setup/AddDocType`, reqFields,{
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'))
    }).toPromise();
    
  }

  UpdateDocType(reqFields: any): Promise<any> {
    return this.http.put<any>(this.appConfig.getBaseUrl('api') + `/api/Setup/UpdateDocType`, reqFields,{
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'))
    }).toPromise();
    
  }

  Stages(): Promise<any> {
    return this.http.post<any>(this.appConfig.getBaseUrl('api') + `/api/Setup/Stages`, '',{
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'))
    }).toPromise();
    
  }

  AddStage(reqFields: any): Promise<any> {
    return this.http.post<any>(this.appConfig.getBaseUrl('api') + `/api/Setup/AddStage`, reqFields,{
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'))
    }).toPromise();
    
  }

  UpdateStage(reqFields: any): Promise<any> {
    return this.http.put<any>(this.appConfig.getBaseUrl('api') + `/api/Setup/UpdateStage`, reqFields,{
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'))
    }).toPromise();
    
  }

  ItemTypes(): Promise<any> {
    return this.http.post<any>(this.appConfig.getBaseUrl('api') + `/api/Setup/ItemTypes`, '',{
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'))
    }).toPromise();
    
  }

  AddItemType(reqFields: any): Promise<any> {
    return this.http.post<any>(this.appConfig.getBaseUrl('api') + `/api/Setup/AddItemType`, reqFields,{
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'))
    }).toPromise();
    
  }

  UpdateItemType(reqFields: any): Promise<any> {
    return this.http.put<any>(this.appConfig.getBaseUrl('api') + `/api/Setup/UpdateItemType`, reqFields,{
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'))
    }).toPromise();
    
  }

  Items(): Promise<any> {
    return this.http.post<any>(this.appConfig.getBaseUrl('api') + `/api/Setup/Items`, '',{
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'))
    }).toPromise();
    
  }

  AddItems(reqFields: any): Promise<any> {
    return this.http.post<any>(this.appConfig.getBaseUrl('api') + `/api/Setup/AddItem`, reqFields,{
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'))
    }).toPromise();
    
  }

  UpdateItem(reqFields: any): Promise<any> {
    return this.http.put<any>(this.appConfig.getBaseUrl('api') + `/api/Setup/UpdateItem`, reqFields,{
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'))
    }).toPromise();
    
  }

  Manufacturer(): Promise<any> {
    return this.http.post<any>(this.appConfig.getBaseUrl('api') + `/api/Setup/Manufacturer`, '',{
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'))
    }).toPromise();
    
  }

  AddManufac(reqFields: any): Promise<any> {
    return this.http.post<any>(this.appConfig.getBaseUrl('api') + `/api/Setup/AddManufac`, reqFields,{
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'))
    }).toPromise();
    
  }

  UpdateManufacturer(reqFields: any): Promise<any> {
    return this.http.put<any>(this.appConfig.getBaseUrl('api') + `/api/Setup/UpdateManufacturer`, reqFields,{
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'))
    }).toPromise();
    
  }

  AddCompany(reqFields: any): Promise<any> {
    return this.http.post<any>(this.appConfig.getBaseUrl('api') + `/api/Setup/AddCompany`, reqFields,{
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'))
    }).toPromise();
    
  }

  updateCopany(reqFields: any): Promise<any> {
    return this.http.put<any>(this.appConfig.getBaseUrl('api') + `/api/Setup/UpdateCompany`, reqFields,{
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'))
    }).toPromise();
    
  }

  GetCompany(): Promise<any> {
    return this.http.post<any>(this.appConfig.getBaseUrl('api') + `/api/Setup/GetCompany`, '',{
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'))
    }).toPromise();
    
  }

  AddBrand(reqFields: object): Promise<any> {
    return this.http.post<any>(this.appConfig.getBaseUrl('api') + `/api/Setup/AddBrand`, reqFields,{
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'))
    }).toPromise();
    
  }

  UpdateBrand(reqFields: object): Promise<any> {
    return this.http.put<any>(this.appConfig.getBaseUrl('api') + `/api/Setup/UpdateBrand`, reqFields,{
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'))
    }).toPromise();
    
  }

  GetBrand(): Promise<any> {
    return this.http.post<any>(this.appConfig.getBaseUrl('api') + `/api/Setup/GetBrand`, '',{
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'))
    }).toPromise();
    
  }

  AddFeedbackStatus(reqFields: object): Promise<any> {
    return this.http.post<any>(this.appConfig.getBaseUrl('api') + `/api/Setup/AddFeedbackStatus`, reqFields,{
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'))
    }).toPromise();
    
  }

  UpdateFeedbackStatus(reqFields: object): Promise<any> {
    return this.http.put<any>(this.appConfig.getBaseUrl('api') + `/api/Setup/UpdateFeedbackStatus`, reqFields,{
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'))
    }).toPromise();
    
  }

  GetFeedbackStatus(): Promise<any> {
    return this.http.post<any>(this.appConfig.getBaseUrl('api') + `/api/Setup/GetFeedbackStatus`, '',{
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'))
    }).toPromise();
    
  }

  
  AddFeedbackType(reqFields: object): Promise<any> {
    return this.http.post<any>(this.appConfig.getBaseUrl('api') + `/api/Setup/AddFeedbackType`, reqFields,{
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'))
    }).toPromise();
    
  }

  UpdateFeedbackType(reqFields: object): Promise<any> {
    return this.http.put<any>(this.appConfig.getBaseUrl('api') + `/api/Setup/UpdateFeedbackType`, reqFields,{
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'))
    }).toPromise();
    
  }

  GetFeedbacktype(): Promise<any> {
    return this.http.post<any>(this.appConfig.getBaseUrl('api') + `/api/Setup/GetFeedbacktype`, '',{
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'))
    }).toPromise();
    
  }

  AddEmployee(reqFields: object): Promise<any> {
    return this.http.post<any>(this.appConfig.getBaseUrl('api') + `/api/Employee/AddEmployee`, reqFields,{
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'))
    }).toPromise();
    
  }

  UpdateEmployee(reqFields: object): Promise<any> {
    return this.http.post<any>(this.appConfig.getBaseUrl('api') + `/api/Employee/UpdateEmployee`, reqFields,{
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'))
    }).toPromise();
    
  }

  GetEmployee(reqFields?: any): Promise<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
  
    return this.http.post<any>(this.appConfig.getBaseUrl('api') + `/api/Employee/GetEmployee`, reqFields, { headers }).toPromise();
  }

  GetEmployeeDesignation(desigID?: any): Promise<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });

    return this.http.post<any>(this.appConfig.getBaseUrl('api') + `/api/Employee/GetEmployeeDesignation`, desigID, {headers}).toPromise();
    
  }

  AddEmployeeDesignation(desigID?: any): Promise<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });

    return this.http.post<any>(this.appConfig.getBaseUrl('api') + `/api/Employee/AddEmployeeDesignation`, desigID, {headers}).toPromise();
    
  }

  UpdateEmployeeDesignation(desigID?: any): Promise<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });

    return this.http.post<any>(this.appConfig.getBaseUrl('api') + `/api/Employee/UpdateEmployeeDesignation`, desigID, {headers}).toPromise();
    
  }

  GetCustomerInquiry(reqFields?: any): Promise<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });

    return this.http.post<any>(this.appConfig.getBaseUrl('api') + `/api/CustomerFeedback/GetCustomerInquiry`, reqFields, {headers}).toPromise();
    
  }

  UpdateCustomerInquiry(reqFields?: any): Promise<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });

    return this.http.put<any>(this.appConfig.getBaseUrl('api') + `/api/CustomerFeedback/UpdateCustomerInquiry`, reqFields, {headers}).toPromise();
    
  }

  AddCustomerInquiry(reqFields?: any): Promise<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });

    return this.http.post<any>(this.appConfig.getBaseUrl('api') + `/api/CustomerFeedback/AddCustomerInquiry`, reqFields, {headers}).toPromise();
    
  }

  GetCustomerInqHasEmp(reqFields?: any): Promise<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });

    return this.http.post<any>(this.appConfig.getBaseUrl('api') + `/api/CustomerFeedback/GetCustomerInqHasEmp`, reqFields, {headers}).toPromise();
    
  }

  GetCustomerComplainHasEmp(reqFields?: any): Promise<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });

    return this.http.post<any>(this.appConfig.getBaseUrl('api') + `/api/CustomerFeedback/GetCustomerComplainHasEmp`, reqFields, {headers}).toPromise();
    
  }

  UpdateCustomerInquiryEmp(reqFields?: any): Promise<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });

    return this.http.put<any>(this.appConfig.getBaseUrl('api') + `/api/CustomerFeedback/UpdateCustomerInquiryEmp`, reqFields, {headers}).toPromise();
    
  }

  UpdateCustomerComplainEmp(reqFields?: any): Promise<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });

    return this.http.put<any>(this.appConfig.getBaseUrl('api') + `/api/CustomerFeedback/UpdateCustomerComplainEmp`, reqFields, {headers}).toPromise();
    
  }

  AddCustomerComplain(reqFields?: any): Promise<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.post<any>(this.appConfig.getBaseUrl('api') + `/api/CustomerFeedback/AddCustomerComplain`, reqFields, {headers}).toPromise();
    
  }

  UpdateCustomerComplain(reqFields?: any): Promise<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });

    return this.http.put<any>(this.appConfig.getBaseUrl('api') + `/api/CustomerFeedback/UpdateCustomerComplain`, reqFields, {headers}).toPromise();
    
  }

  GetCustomerCompalin(reqFields?: any): Promise<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });

    return this.http.post<any>(this.appConfig.getBaseUrl('api') + `/api/CustomerFeedback/GetCustomerCompalin`, reqFields, {headers},).toPromise();
    
  }

  UpdateEmployeesAssignedInquiry(reqFields?: any): Promise<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });

    return this.http.put<any>(this.appConfig.getBaseUrl('api') + `/api/CustomerFeedback/UpdateEmployeesAssignedInquiry`, reqFields, {headers}).toPromise();
    
  }

  UpdateEmployeeAssignedComplain(reqFields?: any): Promise<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });

    return this.http.put<any>(this.appConfig.getBaseUrl('api') + `/api/CustomerFeedback/UpdateEmployeeAssignedComplain`, reqFields, {headers}).toPromise();
    
  }

  AddInvoice(reqFields?: any): Promise<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });

    return this.http.post<any>(this.appConfig.getBaseUrl('api') + `/api/Invoice/AddInvoice`, reqFields, {headers}).toPromise();
    
  }

  UpdateInvoice(reqFields?: any): Promise<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });

    return this.http.put<any>(this.appConfig.getBaseUrl('api') + `/api/Invoice/UpdateInvoice`, reqFields, {headers}).toPromise();
    
  }

  GetInvoice(custID?: any): Promise<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });

    return this.http.post<any>(this.appConfig.getBaseUrl('api') + `/api/Invoice/GetInvoice`, custID, {headers}).toPromise();
    
  }

  UpdateInvoiceItem(reqFields?: any): Promise<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });

    return this.http.post<any>(this.appConfig.getBaseUrl('api') + `/api/Invoice/UpdateInvoiceItem`, reqFields, {headers}).toPromise();
    
  }

  GetInvoiceItem(reqFields?: any): Promise<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });

    return this.http.post<any>(this.appConfig.getBaseUrl('api') + `/api/Invoice/GetInvoiceItem`, reqFields, {headers}).toPromise();
    
  }

  getAllProducts(reqFields?: any): Promise<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });

    return this.http.post<any>(this.appConfig.getBaseUrl('api') + `/api/Product/GetProdcut`, reqFields, {headers}).toPromise();
    
  }

  AddProdcut(reqFields?: any): Promise<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });

    return this.http.post<any>(this.appConfig.getBaseUrl('api') + `/api/Product/AddProdcut`, reqFields, {headers}).toPromise();
    
  }

  UpdateProdcut(reqFields?: any): Promise<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });

    return this.http.put<any>(this.appConfig.getBaseUrl('api') + `/api/Product/UpdateProdcut`, reqFields, {headers}).toPromise();
    
  }

  
  AddCustomerProdcut(reqFields?: any): Promise<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });

    return this.http.post<any>(this.appConfig.getBaseUrl('api') + `/api/CustomerProduct/AddCustomerProdcut`, reqFields, {headers}).toPromise();
    
  }

  GetCustomerProdcut(reqFields?: any): Promise<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });

    return this.http.post<any>(this.appConfig.getBaseUrl('api') + `/api/CustomerProduct/GetCustomerProdcut`, reqFields, {headers}).toPromise();
    
  }

  UpdateCustomerProdcut(reqFields?: any): Promise<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });

    return this.http.put<any>(this.appConfig.getBaseUrl('api') + `/api/CustomerProduct/UpdateCustomerProdcut`, reqFields, {headers}).toPromise();
    
  }

  
  UpdateCustomerProdcutItem(reqFields?: any): Promise<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });

    return this.http.put<any>(this.appConfig.getBaseUrl('api') + `/api/CustomerProduct/UpdateCustomerProdcutItem`, reqFields, {headers}).toPromise();
    
  }

  GetCustomerProdcutItem(reqFields?: any): Promise<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });

    return this.http.put<any>(this.appConfig.getBaseUrl('api') + `/api/CustomerProduct/GetCustomerProdcutItem`, reqFields, {headers}).toPromise();
    
  }

  
  AddQuotation(reqFields?: any): Promise<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });

    return this.http.post<any>(this.appConfig.getBaseUrl('api') + `/api/Quotation/AddQuotation`, reqFields, {headers}).toPromise();
    
  }

  UpdateQuotation(reqFields?: any): Promise<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });

    return this.http.post<any>(this.appConfig.getBaseUrl('api') + `/api/Quotation/UpdateQuotation`, reqFields, {headers}).toPromise();
    
  }

  GetQuotation(reqFields?: any): Promise<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });

    return this.http.post<any>(this.appConfig.getBaseUrl('api') + `/api/Quotation/GetQuotation`, reqFields, {headers}).toPromise();
    
  }

  UpdateQuotationItems(reqFields?: any): Promise<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });

    return this.http.post<any>(this.appConfig.getBaseUrl('api') + `/api/Quotation/UpdateQuotationItems`, reqFields, {headers}).toPromise();
    
  }  

  GetQuotationItem(reqFields?: any): Promise<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });

    return this.http.post<any>(this.appConfig.getBaseUrl('api') + `/api/Quotation/GetQuotationItem`, reqFields, {headers}).toPromise();
    
  }

  UpdateQuotationConfirmEmployees(reqFields?: any): Promise<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });

    return this.http.put<any>(this.appConfig.getBaseUrl('api') + `/api/Quotation/UpdateQuotationConfirmEmployees`, reqFields, {headers}).toPromise();
    
  }

  async getToken(username: string, password: string): Promise<any>{

    try {
      
      return this.http.post('', { username: username, password: password }, {responseType: 'text'}).toPromise() ;

    } catch (error) {

      console.log(error)

      return false;
    }

  }

  GetCustPayment(reqFields?: any): Promise<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });

    return this.http.post<any>(this.appConfig.getBaseUrl('api') + `/api/Customer/GetCustPayment`, reqFields, {headers}).toPromise();
    
  }

  AddCustomerPayment(reqFields?: any): Promise<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });

    return this.http.post<any>(this.appConfig.getBaseUrl('api') + `/api/Customer/AddCustomerPayment`, reqFields, {headers}).toPromise();
    
  }

  UpdateCustPayment(reqFields?: any): Promise<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });

    return this.http.put<any>(this.appConfig.getBaseUrl('api') + `/api/Customer/UpdateCustPayment`, reqFields, {headers}).toPromise();
    
  }

  UpdateQuotationHasEmployeeToConfirm(reqFields?: any): Promise<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });

    return this.http.post<any>(this.appConfig.getBaseUrl('api') + `/api/Quotation/UpdateQuotationHasEmployeeToConfirm`, reqFields, {headers}).toPromise();
  }

  GetQuotationHasEmployeeToConfirm(reqFields?: any): Promise<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });

    return this.http.post<any>(this.appConfig.getBaseUrl('api') + `/api/Quotation/GetQuotationHasEmployeeToConfirm`, reqFields, {headers}).toPromise();
  }

  UpdateQuotationConfirmEmployeeItem(reqFields?: any): Promise<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });

    return this.http.post<any>(this.appConfig.getBaseUrl('api') + `/api/Quotation/UpdateQuotationConfirmEmployeeItem`, reqFields, {headers}).toPromise();
  }

  RequestResetPassword(reqFields?: any): Promise<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });

    return this.http.post<any>(this.appConfig.getBaseUrl('api') + `/api/User/RequestResetPassword`, reqFields, {headers}).toPromise();
  }

  
  ResetPassword(reqFields?: any): Promise<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });

    return this.http.post<any>(this.appConfig.getBaseUrl('api') + `/api/User/ResetPassword`, reqFields, {headers}).toPromise();
  }

  RegisterUsers(reqFields?: any): Promise<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });

    return this.http.post<any>(this.appConfig.getBaseUrl('api') + `/api/User/RegisterUsers`, reqFields, {headers}).toPromise();
  }

  GetUsers(reqFields?: any): Promise<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });

    return this.http.post<any>(this.appConfig.getBaseUrl('api') + `/api/User/GetUsers`, reqFields, {headers}).toPromise();
  }

  UpdateUsers(reqFields?: any): Promise<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });

    return this.http.post<any>(this.appConfig.getBaseUrl('api') + `/api/User/UpdateUsers`, reqFields, {headers}).toPromise();
  }

  validateUserLogin(reqFields?: any): Promise<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });

    return this.http.post<any>(this.appConfig.getBaseUrl('api') + `/api/User/validateUserLogin`, reqFields, {headers}).toPromise();
  }

  GetEmployeeAssignedInquiries(reqFields?: any): Promise<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
  
    const options = { headers, params: reqFields };
  
    return this.http.get<any>(this.appConfig.getBaseUrl('api') + `/api/CustomerFeedback/GetEmployeeAssignedInquiries`, options).toPromise();
  }
  
  GetEmployeeAssignedComplains(reqFields?: any): Promise<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });

    const options = { headers, params: reqFields };
  
    return this.http.get<any>(this.appConfig.getBaseUrl('api') + `/api/CustomerFeedback/GetEmployeeAssignedComplains`, options).toPromise();
    
  }
  
  GetEmployeeAssignedQuotationsForAccept(reqFields?: any): Promise<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
  
    const options = { headers, params: reqFields };
  
    return this.http.get<any>(this.appConfig.getBaseUrl('api') + `/api/Quotation/GetEmployeeAssignedQuotationsForAccept`, options).toPromise();
  }


  GetCustDuePayments(reqFields?: any): Promise<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });

    return this.http.post<any>(this.appConfig.getBaseUrl('api') + `/api/Customer/GetCustDuePayments`, reqFields, {headers}).toPromise();
    
  }

  AddWarrentyItemAction(reqFields?: any): Promise<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });

    return this.http.post<any>(this.appConfig.getBaseUrl('api') + `/api/Setup/AddWarrentyItemAction`, reqFields, {headers}).toPromise();
    
  }

  GetWarrentyItemAction(reqFields?: any): Promise<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });

    return this.http.post<any>(this.appConfig.getBaseUrl('api') + `/api/Setup/GetWarrentyItemAction`, reqFields, {headers}).toPromise();
    
  }

  UpdateWarrentyItemAction(reqFields?: any): Promise<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });

    return this.http.put<any>(this.appConfig.getBaseUrl('api') + `/api/Setup/UpdateWarrentyItemAction`, reqFields, {headers}).toPromise();
    
  }

  GetWarrentyItem(reqFields?: any): Promise<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });

    return this.http.post<any>(this.appConfig.getBaseUrl('api') + `/api/Product/GetWarrentyItem`, reqFields, {headers}).toPromise();
    
  }

  AddWarrentyItem(reqFields?: any): Promise<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });

    return this.http.post<any>(this.appConfig.getBaseUrl('api') + `/api/Product/AddWarrentyItem`, reqFields, {headers}).toPromise();
    
  }

  UpdateWarrentyItem(reqFields?: any): Promise<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });

    return this.http.put<any>(this.appConfig.getBaseUrl('api') + `/api/Product/UpdateWarrentyItem`, reqFields, {headers}).toPromise();
    
  }


}
