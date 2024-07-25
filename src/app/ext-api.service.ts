import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfigService } from './app-config.service';

@Injectable({
  providedIn: 'root'
})
export class ExtApiService {

  constructor(private http: HttpClient, private appConfig: AppConfigService) {}

  registerCustomer(payload: object): Promise<any> {
    return this.http.post<any>(this.appConfig.getBaseUrl('api') + '/api/Customer/RegisterCustomer', payload).toPromise();
    
  }

  getAllCustomers(reqData = ''): Promise<any> {
    return this.http.post<any>(this.appConfig.getBaseUrl('api') + '/api/Customer/Customers', reqData).toPromise();
    
  }

  getCustomersEmails(custID: any){
    return this.http.post<any>(this.appConfig.getBaseUrl('api') + '/api/Customer/CustomersEmails', custID).toPromise();
  }

  CustomerAddresses(custID: any){
    return this.http.post<any>(this.appConfig.getBaseUrl('api') + `/api/Customer/CustomerAddresses?addId=${custID}`, '').toPromise();
  }

  updateCustomer(payload: object): Promise<any> {
    return this.http.put<any>(this.appConfig.getBaseUrl('api') + '/api/Customer/UpdateCustomer', payload).toPromise();
    
  }

  updateCustAddresses(payload: object): Promise<any> {
    return this.http.put<any>(this.appConfig.getBaseUrl('api') + '/api/Customer/UpdateCustomerAddress', payload).toPromise();
    
  }

  updateCustPhones(payload: object): Promise<any> {
    return this.http.put<any>(this.appConfig.getBaseUrl('api') + '/api/Customer/UpdateCustomerPhone', payload).toPromise();
    
  }

  addNewCustomerPhone(payload: object): Promise<any> {
    return this.http.post<any>(this.appConfig.getBaseUrl('api') + '/api/Customer/AddNewCustomerPhone', payload).toPromise();
    
  }

  updateCustEmails(payload: object): Promise<any> {
    return this.http.put<any>(this.appConfig.getBaseUrl('api') + '/api/Customer/UpdateCustomerEmail', payload).toPromise();
    
  }

  addNewCustomerEmail(payload: object): Promise<any> {
    return this.http.post<any>(this.appConfig.getBaseUrl('api') + '/api/Customer/addNewCustomerEmail', payload).toPromise();
    
  }
  
  AddNewCustomerAddress(payload: object): Promise<any> {
    return this.http.post<any>(this.appConfig.getBaseUrl('api') + '/api/Customer/AddNewCustomerAddress', payload).toPromise();
    
  }

  UpdateCustomerProfileImg(payload: FormData): Promise<any> {
    return this.http.post<any>(this.appConfig.getBaseUrl('api') + '/api/Customer/UpdateCustomerProfileImg', payload).toPromise();
    
  }

  AddCustomerDocument(payload: FormData): Promise<any> {
    return this.http.post<any>(this.appConfig.getBaseUrl('api') + '/api/Customer/AddCustomerDocument', payload).toPromise();
    
  }

  UpdateCustomerDoc(payload: object): Promise<any> {
    return this.http.put<any>(this.appConfig.getBaseUrl('api') + '/api/Customer/UpdateCustomerDoc', payload).toPromise();
    
  }
  

  GetCustomerDocs(payload : object): Promise<any> {
    return this.http.post<any>(this.appConfig.getBaseUrl('api') + `/api/Customer/GetCustomerDocs`, payload).toPromise();
    
  }

  DocTypes(): Promise<any> {
    return this.http.post<any>(this.appConfig.getBaseUrl('api') + `/api/Setup/DocTypes`, '').toPromise();
    
  }

  AddDocType(reqFields: any): Promise<any> {
    return this.http.post<any>(this.appConfig.getBaseUrl('api') + `/api/Setup/AddDocType`, reqFields).toPromise();
    
  }

  UpdateDocType(reqFields: any): Promise<any> {
    return this.http.put<any>(this.appConfig.getBaseUrl('api') + `/api/Setup/UpdateDocType`, reqFields).toPromise();
    
  }

  Stages(): Promise<any> {
    return this.http.post<any>(this.appConfig.getBaseUrl('api') + `/api/Setup/Stages`, '').toPromise();
    
  }

  AddStage(reqFields: any): Promise<any> {
    return this.http.post<any>(this.appConfig.getBaseUrl('api') + `/api/Setup/AddStage`, reqFields).toPromise();
    
  }

  UpdateStage(reqFields: any): Promise<any> {
    return this.http.put<any>(this.appConfig.getBaseUrl('api') + `/api/Setup/UpdateStage`, reqFields).toPromise();
    
  }

  ItemTypes(): Promise<any> {
    return this.http.post<any>(this.appConfig.getBaseUrl('api') + `/api/Setup/ItemTypes`, '').toPromise();
    
  }

  AddItemType(reqFields: any): Promise<any> {
    return this.http.post<any>(this.appConfig.getBaseUrl('api') + `/api/Setup/AddItemType`, reqFields).toPromise();
    
  }

  UpdateItemType(reqFields: any): Promise<any> {
    return this.http.put<any>(this.appConfig.getBaseUrl('api') + `/api/Setup/UpdateItemType`, reqFields).toPromise();
    
  }

  Items(): Promise<any> {
    return this.http.post<any>(this.appConfig.getBaseUrl('api') + `/api/Setup/Items`, '').toPromise();
    
  }

  AddItems(reqFields: any): Promise<any> {
    return this.http.post<any>(this.appConfig.getBaseUrl('api') + `/api/Setup/AddItem`, reqFields).toPromise();
    
  }

  UpdateItem(reqFields: any): Promise<any> {
    return this.http.put<any>(this.appConfig.getBaseUrl('api') + `/api/Setup/UpdateItem`, reqFields).toPromise();
    
  }

  Manufacturer(): Promise<any> {
    return this.http.post<any>(this.appConfig.getBaseUrl('api') + `/api/Setup/Manufacturer`, '').toPromise();
    
  }

  AddManufac(reqFields: any): Promise<any> {
    return this.http.post<any>(this.appConfig.getBaseUrl('api') + `/api/Setup/AddManufac`, reqFields).toPromise();
    
  }

  UpdateManufacturer(reqFields: any): Promise<any> {
    return this.http.put<any>(this.appConfig.getBaseUrl('api') + `/api/Setup/UpdateManufacturer`, reqFields).toPromise();
    
  }

  AddCompany(reqFields: any): Promise<any> {
    return this.http.post<any>(this.appConfig.getBaseUrl('api') + `/api/Setup/AddCompany`, reqFields).toPromise();
    
  }

  updateCopany(reqFields: any): Promise<any> {
    return this.http.put<any>(this.appConfig.getBaseUrl('api') + `/api/Setup/UpdateCompany`, reqFields).toPromise();
    
  }

  GetCompany(): Promise<any> {
    return this.http.post<any>(this.appConfig.getBaseUrl('api') + `/api/Setup/GetCompany`, '').toPromise();
    
  }

  AddBrand(reqFields: object): Promise<any> {
    return this.http.post<any>(this.appConfig.getBaseUrl('api') + `/api/Setup/AddBrand`, reqFields).toPromise();
    
  }

  UpdateBrand(reqFields: object): Promise<any> {
    return this.http.put<any>(this.appConfig.getBaseUrl('api') + `/api/Setup/UpdateBrand`, reqFields).toPromise();
    
  }

  GetBrand(): Promise<any> {
    return this.http.post<any>(this.appConfig.getBaseUrl('api') + `/api/Setup/GetBrand`, '').toPromise();
    
  }

  AddFeedbackStatus(reqFields: object): Promise<any> {
    return this.http.post<any>(this.appConfig.getBaseUrl('api') + `/api/Setup/AddFeedbackStatus`, reqFields).toPromise();
    
  }

  UpdateFeedbackStatus(reqFields: object): Promise<any> {
    return this.http.put<any>(this.appConfig.getBaseUrl('api') + `/api/Setup/UpdateFeedbackStatus`, reqFields).toPromise();
    
  }

  GetFeedbackStatus(): Promise<any> {
    return this.http.post<any>(this.appConfig.getBaseUrl('api') + `/api/Setup/GetFeedbackStatus`, '').toPromise();
    
  }

  
  AddFeedbackType(reqFields: object): Promise<any> {
    return this.http.post<any>(this.appConfig.getBaseUrl('api') + `/api/Setup/AddFeedbackType`, reqFields).toPromise();
    
  }

  UpdateFeedbackType(reqFields: object): Promise<any> {
    return this.http.put<any>(this.appConfig.getBaseUrl('api') + `/api/Setup/UpdateFeedbackType`, reqFields).toPromise();
    
  }

  GetFeedbacktype(): Promise<any> {
    return this.http.post<any>(this.appConfig.getBaseUrl('api') + `/api/Setup/GetFeedbacktype`, '').toPromise();
    
  }

  AddEmployee(reqFields: object): Promise<any> {
    return this.http.post<any>(this.appConfig.getBaseUrl('api') + `/api/Employee/AddEmployee`, reqFields).toPromise();
    
  }

  UpdateEmployee(reqFields: object): Promise<any> {
    return this.http.post<any>(this.appConfig.getBaseUrl('api') + `/api/Employee/UpdateEmployee`, reqFields).toPromise();
    
  }

  GetEmployee(reqFields?: any): Promise<any> {
    return this.http.post<any>(this.appConfig.getBaseUrl('api') + `/api/Employee/GetEmployee`, reqFields ,{headers: new HttpHeaders().set('Content-Type', 'application/json')},).toPromise();
  }

  GetEmployeeDesignation(desigID?: any): Promise<any> {
    return this.http.post<any>(this.appConfig.getBaseUrl('api') + `/api/Employee/GetEmployeeDesignation`, desigID, {headers: new HttpHeaders().set('Content-Type', 'application/json')},).toPromise();
    
  }

  AddEmployeeDesignation(desigID?: any): Promise<any> {
    return this.http.post<any>(this.appConfig.getBaseUrl('api') + `/api/Employee/AddEmployeeDesignation`, desigID, {headers: new HttpHeaders().set('Content-Type', 'application/json')},).toPromise();
    
  }

  UpdateEmployeeDesignation(desigID?: any): Promise<any> {
    return this.http.post<any>(this.appConfig.getBaseUrl('api') + `/api/Employee/UpdateEmployeeDesignation`, desigID, {headers: new HttpHeaders().set('Content-Type', 'application/json')},).toPromise();
    
  }

  GetCustomerInquiry(reqFields?: any): Promise<any> {
    return this.http.post<any>(this.appConfig.getBaseUrl('api') + `/api/CustomerFeedback/GetCustomerInquiry`, reqFields, {headers: new HttpHeaders().set('Content-Type', 'application/json')},).toPromise();
    
  }

  UpdateCustomerInquiry(reqFields?: any): Promise<any> {
    return this.http.put<any>(this.appConfig.getBaseUrl('api') + `/api/CustomerFeedback/UpdateCustomerInquiry`, reqFields, {headers: new HttpHeaders().set('Content-Type', 'application/json')},).toPromise();
    
  }

  AddCustomerInquiry(reqFields?: any): Promise<any> {
    return this.http.post<any>(this.appConfig.getBaseUrl('api') + `/api/CustomerFeedback/AddCustomerInquiry`, reqFields, {headers: new HttpHeaders().set('Content-Type', 'application/json')},).toPromise();
    
  }

  GetCustomerInqHasEmp(reqFields?: any): Promise<any> {
    return this.http.post<any>(this.appConfig.getBaseUrl('api') + `/api/CustomerFeedback/GetCustomerInqHasEmp`, reqFields, {headers: new HttpHeaders().set('Content-Type', 'application/json')},).toPromise();
    
  }

  GetCustomerComplainHasEmp(reqFields?: any): Promise<any> {
    return this.http.post<any>(this.appConfig.getBaseUrl('api') + `/api/CustomerFeedback/GetCustomerComplainHasEmp`, reqFields, {headers: new HttpHeaders().set('Content-Type', 'application/json')},).toPromise();
    
  }

  UpdateCustomerInquiryEmp(reqFields?: any): Promise<any> {
    return this.http.put<any>(this.appConfig.getBaseUrl('api') + `/api/CustomerFeedback/UpdateCustomerInquiryEmp`, reqFields, {headers: new HttpHeaders().set('Content-Type', 'application/json')},).toPromise();
    
  }

  UpdateCustomerComplainEmp(reqFields?: any): Promise<any> {
    return this.http.put<any>(this.appConfig.getBaseUrl('api') + `/api/CustomerFeedback/UpdateCustomerComplainEmp`, reqFields, {headers: new HttpHeaders().set('Content-Type', 'application/json')},).toPromise();
    
  }

  AddCustomerComplain(reqFields?: any): Promise<any> {
    return this.http.post<any>(this.appConfig.getBaseUrl('api') + `/api/CustomerFeedback/AddCustomerComplain`, reqFields, {headers: new HttpHeaders().set('Content-Type', 'application/json')},).toPromise();
    
  }

  UpdateCustomerComplain(reqFields?: any): Promise<any> {
    return this.http.put<any>(this.appConfig.getBaseUrl('api') + `/api/CustomerFeedback/UpdateCustomerComplain`, reqFields, {headers: new HttpHeaders().set('Content-Type', 'application/json')},).toPromise();
    
  }

  GetCustomerCompalin(reqFields?: any): Promise<any> {
    return this.http.post<any>(this.appConfig.getBaseUrl('api') + `/api/CustomerFeedback/GetCustomerCompalin`, reqFields, {headers: new HttpHeaders().set('Content-Type', 'application/json')},).toPromise();
    
  }

  UpdateEmployeesAssignedInquiry(reqFields?: any): Promise<any> {
    return this.http.put<any>(this.appConfig.getBaseUrl('api') + `/api/CustomerFeedback/UpdateEmployeesAssignedInquiry`, reqFields, {headers: new HttpHeaders().set('Content-Type', 'application/json')},).toPromise();
    
  }

  UpdateEmployeeAssignedComplain(reqFields?: any): Promise<any> {
    return this.http.put<any>(this.appConfig.getBaseUrl('api') + `/api/CustomerFeedback/UpdateEmployeeAssignedComplain`, reqFields, {headers: new HttpHeaders().set('Content-Type', 'application/json')},).toPromise();
    
  }

  AddInvoice(reqFields?: any): Promise<any> {
    return this.http.post<any>(this.appConfig.getBaseUrl('api') + `/api/Invoice/AddInvoice`, reqFields, {headers: new HttpHeaders().set('Content-Type', 'application/json')},).toPromise();
    
  }

  UpdateInvoice(reqFields?: any): Promise<any> {
    return this.http.put<any>(this.appConfig.getBaseUrl('api') + `/api/Invoice/UpdateInvoice`, reqFields, {headers: new HttpHeaders().set('Content-Type', 'application/json')},).toPromise();
    
  }

  GetInvoice(custID?: any): Promise<any> {
    return this.http.post<any>(this.appConfig.getBaseUrl('api') + `/api/Invoice/GetInvoice`, custID, {headers: new HttpHeaders().set('Content-Type', 'application/json')},).toPromise();
    
  }

  UpdateInvoiceItem(reqFields?: any): Promise<any> {
    return this.http.post<any>(this.appConfig.getBaseUrl('api') + `/api/Invoice/UpdateInvoiceItem`, reqFields, {headers: new HttpHeaders().set('Content-Type', 'application/json')},).toPromise();
    
  }

  GetInvoiceItem(reqFields?: any): Promise<any> {
    return this.http.post<any>(this.appConfig.getBaseUrl('api') + `/api/Invoice/GetInvoiceItem`, reqFields, {headers: new HttpHeaders().set('Content-Type', 'application/json')},).toPromise();
    
  }

  getAllProducts(reqFields?: any): Promise<any> {
    return this.http.post<any>(this.appConfig.getBaseUrl('api') + `/api/Product/GetProdcut`, reqFields, {headers: new HttpHeaders().set('Content-Type', 'application/json')},).toPromise();
    
  }

  AddProdcut(reqFields?: any): Promise<any> {
    return this.http.post<any>(this.appConfig.getBaseUrl('api') + `/api/Product/AddProdcut`, reqFields, {headers: new HttpHeaders().set('Content-Type', 'application/json')},).toPromise();
    
  }

  UpdateProdcut(reqFields?: any): Promise<any> {
    return this.http.put<any>(this.appConfig.getBaseUrl('api') + `/api/Product/UpdateProdcut`, reqFields, {headers: new HttpHeaders().set('Content-Type', 'application/json')},).toPromise();
    
  }

  
  AddCustomerProdcut(reqFields?: any): Promise<any> {
    return this.http.post<any>(this.appConfig.getBaseUrl('api') + `/api/CustomerProduct/AddCustomerProdcut`, reqFields, {headers: new HttpHeaders().set('Content-Type', 'application/json')},).toPromise();
    
  }

  GetCustomerProdcut(reqFields?: any): Promise<any> {
    return this.http.post<any>(this.appConfig.getBaseUrl('api') + `/api/CustomerProduct/GetCustomerProdcut`, reqFields, {headers: new HttpHeaders().set('Content-Type', 'application/json')},).toPromise();
    
  }

  UpdateCustomerProdcut(reqFields?: any): Promise<any> {
    return this.http.put<any>(this.appConfig.getBaseUrl('api') + `/api/CustomerProduct/UpdateCustomerProdcut`, reqFields, {headers: new HttpHeaders().set('Content-Type', 'application/json')},).toPromise();
    
  }

  
  UpdateCustomerProdcutItem(reqFields?: any): Promise<any> {
    return this.http.put<any>(this.appConfig.getBaseUrl('api') + `/api/CustomerProduct/UpdateCustomerProdcutItem`, reqFields, {headers: new HttpHeaders().set('Content-Type', 'application/json')},).toPromise();
    
  }

  GetCustomerProdcutItem(reqFields?: any): Promise<any> {
    return this.http.put<any>(this.appConfig.getBaseUrl('api') + `/api/CustomerProduct/GetCustomerProdcutItem`, reqFields, {headers: new HttpHeaders().set('Content-Type', 'application/json')},).toPromise();
    
  }

  
  AddQuotation(reqFields?: any): Promise<any> {
    return this.http.post<any>(this.appConfig.getBaseUrl('api') + `/api/Quotation/AddQuotation`, reqFields, {headers: new HttpHeaders().set('Content-Type', 'application/json')},).toPromise();
    
  }

  UpdateQuotation(reqFields?: any): Promise<any> {
    return this.http.post<any>(this.appConfig.getBaseUrl('api') + `/api/Quotation/UpdateQuotation`, reqFields, {headers: new HttpHeaders().set('Content-Type', 'application/json')},).toPromise();
    
  }

  GetQuotation(reqFields?: any): Promise<any> {
    return this.http.post<any>(this.appConfig.getBaseUrl('api') + `/api/Quotation/GetQuotation`, reqFields, {headers: new HttpHeaders().set('Content-Type', 'application/json')},).toPromise();
    
  }

  UpdateQuotationItems(reqFields?: any): Promise<any> {
    return this.http.post<any>(this.appConfig.getBaseUrl('api') + `/api/Quotation/UpdateQuotationItems`, reqFields, {headers: new HttpHeaders().set('Content-Type', 'application/json')},).toPromise();
    
  }  

  GetQuotationItem(reqFields?: any): Promise<any> {
    return this.http.post<any>(this.appConfig.getBaseUrl('api') + `/api/Quotation/GetQuotationItem`, reqFields, {headers: new HttpHeaders().set('Content-Type', 'application/json')},).toPromise();
    
  }

  UpdateQuotationConfirmEmployees(reqFields?: any): Promise<any> {
    return this.http.put<any>(this.appConfig.getBaseUrl('api') + `/api/Quotation/UpdateQuotationConfirmEmployees`, reqFields, {headers: new HttpHeaders().set('Content-Type', 'application/json')},).toPromise();
    
  }

  async getToken(username: string, password: string): Promise<any>{

    try {
      
      return this.http.post('', { username: username, password: password }, {responseType: 'text'}).toPromise() ;

    } catch (error) {

      console.log(error)

      return false;
    }

  }

}
