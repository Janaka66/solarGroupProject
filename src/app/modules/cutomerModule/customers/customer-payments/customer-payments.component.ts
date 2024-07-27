import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { AppService } from 'src/app/app.service';

import { ColDef } from 'ag-grid-community'; 
import { CustomerSearchComponent } from 'src/app/sharedComp/customer-search/customer-search.component';
import { ExtApiService } from 'src/app/ext-api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NotificationDialogComponent, NotificationType } from 'src/app/sharedComp/notification-dialog/notification-dialog.component';
import { CommonLoaderComponent } from 'src/app/sharedComp/common-loader/common-loader.component';

@Component({
  selector: 'app-customer-payments',
  templateUrl: './customer-payments.component.html',
  styleUrls: ['./customer-payments.component.scss']
})
export class CustomerPaymentsComponent implements AfterViewInit {

  flag: boolean = false;
  panelOpenState = false;
  selectedCustID: any;

  @ViewChild('customerSearch') CustomerSearchComponent: CustomerSearchComponent | any;
  @ViewChild('loader') CommonLoaderComponent: CommonLoaderComponent | any;
  
  rowData = [
    { make: "Tesla", model: "Model Y", price: 64950, electric: true },
    { make: "Ford", model: "F-Series", price: 33850, electric: false }

  ];
 
  colDefs: ColDef[] = [
    { field: "make" },
    { field: "model" },
    { field: "price" },
    { field: "electric" }
  ];

 
  paymentForm: FormGroup;
  payments: any[] = []; // Adjust type as needed
  displayedColumns: string[] = ['custmoerName', 'productDisplayName', 'jobDescription', 'remark', 'payment', 'actions'];

  isLoaderAvailable: boolean = false;
  allProducts: any;
  allIQuot: any;
  isBtnEnabaled: boolean = true;
  productForUpdate: any;
  isSearchBtnEnabled: boolean = true;
  prodForSearch = '';
  quotForSearch = '';

  constructor(private communicationService: AppService, private extApi : ExtApiService, private fb: FormBuilder, private dialog: MatDialog){

    this.paymentForm = this.fb.group({
      customerName: [{ value: '', disabled: true }, Validators.required],
      productName: ['', Validators.required],
      quotationName: ['', Validators.required],
      jobDescription: ['', Validators.required],
      remark: [''],
      payment: [0, [Validators.required, Validators.min(0)]]
    });
  }
  
  async ngAfterViewInit(): Promise<void> {
    
    this.CommonLoaderComponent.show();

    await this.getAllCustomers();
    await this.getProducts();

    this.CommonLoaderComponent.hide();
  }

  handleLeftBar() {

    this.flag = !this.flag;
    
    this.communicationService.sendData({ flag: !this.flag });
  }

  async bindCutomerData(event : any){

    this.CommonLoaderComponent.show();

    this.isBtnEnabaled = true;

    this.selectedCustID = event.id;

    let custName = await this.getCustomerName(this.selectedCustID)

    this.paymentForm.get('customerName')?.setValue(custName);

    await this.getAllQout();
    this.payments = [];
    
    this.CommonLoaderComponent.hide();

  }
  
  async getAllCustomers(){

    try {
      
      let result = await this.extApi.getAllCustomers();
      this.CustomerSearchComponent.showCustomers(result.data[0]);

      this.CommonLoaderComponent.hide();

    } catch (e: any) {
      this.CommonLoaderComponent.hide();
      console.log(e.error)
    }
  }

  async onSubmit(): Promise<void> {

    this.CommonLoaderComponent.show();

    if (this.paymentForm.valid) {

      const newPayment = this.paymentForm.value;
      let quatation;

      try {
        
        quatation = await this.extApi.GetQuotation({"quotId" : this.paymentForm.value.quotationName});

        console.log('=========Quat===============')
        console.log(quatation)

      } catch (error) {
        console.log(error)
      }

      let reqFields = {
        "id": "string",
        "custId": this.selectedCustID,
        "refNu": quatation.data[0].prodRefNu,
        "prodId": this.paymentForm.value.productName,
        "quotId": this.paymentForm.value.quotationName,
        "jobDescription": this.paymentForm.value.jobDescription,
        "remark": this.paymentForm.value.remark,
        "payment": this.paymentForm.value.payment,
        "status": 0
      }

      try {
        
        let res = await this.extApi.AddCustomerPayment(reqFields)

        this.notifyMessage("Add Paymnet", "Successfully added the payment",NotificationType.success)
    
        await this.getCustPayments();

        
      } catch (error) {
        this.notifyMessage("Add Paymnet", "Something went wrong please try again",NotificationType.error)
        this.CommonLoaderComponent.hide();
      }

      this.paymentForm.reset();
      
    }else{

      this.notifyMessage("Add Paymnet", "Please fill all the fields",NotificationType.warn)
      this.CommonLoaderComponent.hide();
    }
  }

  async getCustPayments(){

    let req = {
      "custId": this.selectedCustID,
      "prodId": this.prodForSearch,
      "quotId": this.quotForSearch
    }

    try {
      
      let payements = await this.extApi.GetCustPayment(req);

      payements.data[0] = payements.data[0].filter((el: any) => el.status === 0);

      this.genaratePaymentData(payements.data[0])

      console.log("=====custpayments========")
      console.log(payements.data[0])

      this.CommonLoaderComponent.hide();

    } catch (error) {
      this.notifyMessage("get customerPaymnets", "Something went wrong while gettiing customer payments",NotificationType.error)
      this.CommonLoaderComponent.hide();
    }
  }

  async genaratePaymentData(arg0: any) {
    
    arg0.forEach(async (el: any) => {
      
      el.custmoerName = await this.getCustomerName(el.custId);
      el.productDisplayName = this.allProducts.find((elp: any) => elp.id === el.prodId).productName;
      el.productName = this.allProducts.find((elp: any) => elp.id === el.prodId).id;

      setTimeout(() => {
        el.quotationDisplayName = this.allIQuot.find((epq: any) => epq.id === el.quotId).quotNumber;
        el.quotationName = this.allIQuot.find((epq: any) => epq.id === el.quotId).id;
      }, 1000);
    });
    
    this.payments = arg0


    console.log('===========paymentData==========')
    console.log(this.payments)

  }

  async getProducts(){

    try {

      let allProcts = await this.extApi.getAllProducts();
      this.allProducts = allProcts.data.filter((el: any) => el.status !== 1);
      
      console.log('===============allProducts===========')
      console.log(this.allProducts)
    } catch (error) {
      this.notifyMessage("Get products", "Something went wrong while getting products",NotificationType.error)
    }
  }

  async getAllQout(){

    try {
        
      let quotRes = await this.extApi.GetQuotation({"custID" : this.selectedCustID});
      this.allIQuot = quotRes.data.filter((el: any) => el.status === 0);

      console.log('===============custQuatation===========')
      console.log(this.allIQuot)

    } catch (e: any) {
        
      this.notifyMessage("Add Quatation", "Something went wrong while getting quatation",NotificationType.error)
    }
  }

  async updatePayamentData(){

    this.CommonLoaderComponent.show();

    let reqFields = {
      "id": this.productForUpdate.id,
      "custId": this.productForUpdate.custId,
      "prodId": this.productForUpdate.prodId,
      "refNu": this.productForUpdate.refNu,
      "quotId": this.productForUpdate.quotId,
      "paymentPrecentage": this.productForUpdate.paymentPrecentage,
      "recpNo": this.productForUpdate.recpNo,
      "paymentDate": this.productForUpdate.paymentDate,
      "jobDescription": this.productForUpdate.jobDescription,
      "remark": this.productForUpdate.remark,
      "payment": this.productForUpdate.payment,
      "balance": this.productForUpdate.balance,
      "quotedPrice": this.productForUpdate.quotedPrice,
      "totalDue": this.productForUpdate.totalDue,
      "status": 0
    }
    
    try {
      
      let res = await this.extApi.UpdateCustPayment(reqFields)
      this.notifyMessage("Update Paymnet", "Successfully update the payment",NotificationType.success)

      await this.getCustPayments();

      this.isBtnEnabaled = true;
    } catch (error) {
      this.notifyMessage("Update Paymnet", "Something went wrong when update the payment details.",NotificationType.error)
      this.CommonLoaderComponent.hide();
    }
  }

  async deletePayment(payment: any){
    console.log(payment)

    this.CommonLoaderComponent.show();

    let reqFields = {
      "id": payment.id,
      "custId": payment.custId,
      "prodId": payment.prodId,
      "refNu": payment.refNu,
      "quotId": payment.quotId,
      "paymentPrecentage": payment.paymentPrecentage,
      "recpNo": payment.recpNo,
      "paymentDate": payment.paymentDate,
      "jobDescription": payment.jobDescription,
      "remark": payment.remark,
      "payment": payment.payment,
      "balance": payment.balance,
      "quotedPrice": payment.quotedPrice,
      "totalDue": payment.totalDue,
      "status": 1
    }
    
    try {
      
      let res = await this.extApi.UpdateCustPayment(reqFields)

      this.notifyMessage("Remove Paymnet", "Successfully remove the payment",NotificationType.success)

      await this.getCustPayments();

    } catch (error) {
      this.notifyMessage("Remove Paymnet", "Something went wrong when delete the payment",NotificationType.error)
      this.CommonLoaderComponent.hide();
    }
  }

  private notifyMessage(title: string, message: string, notificationType: NotificationType) {

    this.dialog.open(NotificationDialogComponent, {
      width: '300px',
      data: { title, message, notificationType}
    });
  }

  editPayment(e:any){

    this.paymentForm.setValue({
      customerName: e.custmoerName,
      productName: e.productName,
      quotationName: e.quotationName,
      jobDescription: e.jobDescription,
      remark: e.remark,
      payment: e.payment
    });

    this.isBtnEnabaled = false;

    this.productForUpdate = e
  }

  async getCustomerName(custID: any){

    try {
      
      let customerData = await this.extApi.getAllCustomers({"custID": custID});

      return customerData.data[0][0].fName + ' ' + customerData.data[0][0].mName + ' ' + customerData.data[0][0].lName

    } catch (error) {
      return ''
    }
  }

  isButtonEnabled(){
    return !!this.selectedCustID && !!this.prodForSearch && !!this.quotForSearch;
  }
}
