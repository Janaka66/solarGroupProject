import { AfterViewInit, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
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
  displayedColumns: string[] = ['custmoerName', 'productDisplayName','quotedPrice', 'jobDescription', 'remark', 'payment', 'paymentPrecentage', 'paymentDate', 'recpNo', 'totalDue','balance', 'actions'];

  isLoaderAvailable: boolean = false;
  allProducts: any;
  allIQuot: any;
  isBtnEnabaled: boolean = true;
  productForUpdate: any;
  isSearchBtnEnabled: boolean = true;
  prodForSearch = '';
  quotForSearch = '';
  selectedRefNum = '';
  allProdReferance = [] as any
  allQuatationForDrop = [] as any;
  allQuatationForDropForSearch = [] as any;
  allProdReferanceForSearch = [] as any;
  allProductsForGetNames: any;

  constructor(private communicationService: AppService, private extApi : ExtApiService, private fb: FormBuilder, private dialog: MatDialog, private cdr: ChangeDetectorRef){

    this.paymentForm = this.fb.group({
      customerName: [{ value: '', disabled: true }, Validators.required],
      productName: ['', Validators.required],
      selectedQutNumber: ['', Validators.required],
      selectedRefNum: ['', Validators.required],
      jobDescription: ['', Validators.required],
      remark: [''],
      payment: [0, [Validators.required, Validators.min(0)]]
    });
  }
  
  async ngAfterViewInit(): Promise<void> {
    
    this.CommonLoaderComponent.show();

    await this.getAllCustomers();
    await this.getProducts();
    await this.getProducts();

    this.CommonLoaderComponent.hide();

    this.notifyMessage("Welcome to the payment view", "Please selecet the customoer first to load the products",NotificationType.success)
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

    this.payments = [];
    this.prodForSearch = '';
    this.selectedRefNum = ''
    this.quotForSearch = '';
    this.allProdReferance = [];
    this.allQuatationForDrop = [];

    await this.GetCustomerProdcutForTwoProdDrops();


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
        "refNu": this.paymentForm.value.selectedRefNum,
        "prodId": this.paymentForm.value.productName,
        "quotId": this.paymentForm.value.selectedQutNumber,
        "jobDescription": this.paymentForm.value.jobDescription,
        "remark": this.paymentForm.value.remark, 
        "payment": this.paymentForm.value.payment,
        "status": 0
      }

      try {
        
       let res = await this.extApi.AddCustomerPayment(reqFields)

        this.notifyMessage("Add Paymnet", "Successfully added the payment",NotificationType.success)
    
       await this.getCustPayments();
       this.CommonLoaderComponent.hide();

        
      } catch (error) {
        this.notifyMessage("Add Paymnet", "Something went wrong please try again",NotificationType.error)
        this.CommonLoaderComponent.hide();
      }

      //this.paymentForm.reset();
      
    
  }

  async getCustPayments(){

    let req = {
      "custId": this.selectedCustID,
      "prodId": this.prodForSearch,
      "quotId": this.quotForSearch,
      "refNu": this.selectedRefNum,
    }

    try {
      
      let payements = await this.extApi.GetCustPayment(req);

      payements.data[0] = payements.data[0].filter((el: any) => el.status === 0);

      if(!payements.data[0] || !payements.data[0]?.length || payements.data[0].length === 0){
        this.notifyMessage("Paymnets", "Payemnts are not available",NotificationType.warn)
      }else{

        this.genaratePaymentData(payements.data[0])

        console.log("=====custpayments========")
        console.log(payements.data[0])
      }


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
        el.isConfirmed = this.allIQuot.find((epq: any) => epq.id === el.quotId).isConfirmed;

      }, 1000);
    });
    
    this.payments = arg0


    console.log('===========paymentData==========')
    console.log(this.payments)

  }

  async getProducts(){

    try {

      let allProcts = await this.extApi.getAllProducts();
      this.allProductsForGetNames = allProcts.data.filter((el: any) => el.status !== 1);
      
      console.log('===============allProducts===========')
      console.log(this.allProductsForGetNames)
    } catch (error) {
      this.notifyMessage("Get products", "Something went wrong while getting products",NotificationType.error)
    }
  }

  async GetCustomerProdcutForTwoProdDrops(){
debugger
debugger
    try {

      let allProcts = await this.extApi.GetCustomerProdcut({"custId":this.selectedCustID});
      let allProducts = allProcts.data.filter((el: any) => el.status !== 1);

      allProducts[0].forEach((el: any) => {
        
        this.allProductsForGetNames.forEach((elx: any) => {
          

          if(el.prodId === elx.id)
            el.productName = elx.productName
          
        });
      });
      
      this.allProducts = this.removeDuplicates(allProducts[0])

      console.log('===============allProducts===========')
      console.log(this.allProducts);

      this.cdr.detectChanges();

    } catch (error) {
      this.notifyMessage("Get products", "Something went wrong while getting products",NotificationType.error)
    }
  }

   removeDuplicates(data: any[]): any[] {
    const uniqueIds = new Set();
    const uniqueData = [];

    for (const item of data) {
      if (!uniqueIds.has(item.prodId)) {
        uniqueIds.add(item.prodId);
        uniqueData.push(item);
      }
    }

    return uniqueData;
  }

  removeDuplicatesRef(data: any[]): any[] {
    const uniqueIds = new Set();
    const uniqueData = [];

    for (const item of data) {
      if (!uniqueIds.has(item.quatNum)) {
        uniqueIds.add(item.quatNum);
        uniqueData.push(item);
      }
    }

    return uniqueData;
  }

  async getAllQout(){

    try {
        
      let quotRes = await this.extApi.GetQuotation({"custID" : this.selectedCustID});
      this.allIQuot = quotRes.data.filter((el: any) => el.status === 0 && el.isConfirmed);

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

  async prodChange(event: any){
    
    await this.GetCustomerProdcut();
  }

  async GetCustomerProdcut(){
debugger
    this.allProdReferance = []

    try {

      let getcustomerProd = await this.extApi.GetCustomerProdcut({"prodId": this.paymentForm.value.productName, "custId": this.selectedCustID});

      getcustomerProd.data[0].data = getcustomerProd.data[0].filter((el: any) => el.status === 0)

      getcustomerProd.data[0].forEach((el: any) => {

        this.allProdReferance.push({
          'refNu': el.refNu,
          'id': el.id
        })

      })

      console.log('allProdReferance')
      console.log(this.allProdReferance)
      
    } catch (error) {
      console.log(error)
    }
  }










  async refChange(event: any){
    debugger
    await this.getQouatationByCust();
  }

  async getQouatationByCust(){
    
    this.allQuatationForDrop = [];

        try {
    
          let getProdRef = await this.extApi.GetQuotation({"prodRefNu": this.paymentForm.value.selectedRefNum, "prodId": this.paymentForm.value.productName, "custId":this.selectedCustID});
    
          getProdRef.data = getProdRef.data.filter((el: any) => el.status === 0)

          getProdRef.data.forEach((el: any) => {
    
            if(el.isConfirmed){

              this.allQuatationForDrop.push({
                'quatNum': el.quotNumber,
                'id': el.id
              })
            }
   
    
          })

          this.allQuatationForDrop = this.removeDuplicatesRef(this.allQuatationForDrop)

          console.log("allQuatationForDrop")
          console.log(this.allQuatationForDrop)
          
        } catch (error) {
          console.log(error)
        }
  }







      async prodChangeForSearch(){
        await this.GetCustomerProdcutForSearch();
      }

      async GetCustomerProdcutForSearch(){
        debugger
        this.allProdReferanceForSearch = [];

            try {
        
              let getcustomerProd = await this.extApi.GetCustomerProdcut({"prodId": this.prodForSearch, "custId":this.selectedCustID});
        
              getcustomerProd.data[0].data = getcustomerProd.data[0].filter((el: any) => el.status === 0)
        
              getcustomerProd.data[0].forEach((el: any) => {
        
                this.allProdReferanceForSearch.push({
                  'refNu': el.refNu,
                  'id': el.id
                })
        
              })
              

            } catch (error) {
              console.log(error)
            }
          }







      async refNameChangeForSearch(){

        await this.getQouatationByCustForSearchInput()

      }

      async getQouatationByCustForSearchInput(){
        
        this.allQuatationForDropForSearch = []

            try {
        
              let getProdRef = await this.extApi.GetQuotation({"prodRefNu": this.selectedRefNum, "prodId": this.prodForSearch, "custId":this.selectedCustID});
        
              getProdRef.data = getProdRef.data.filter((el: any) => el.status === 0)
    
              getProdRef.data.forEach((el: any) => {
        
                this.allQuatationForDropForSearch.push({
                  'quatNum': el.quotNumber,
                  'id': el.id
                })
        
              })


              
              this.allQuatationForDropForSearch = this.removeDuplicatesRef(this.allQuatationForDropForSearch)
              
            } catch (error) {
              console.log(error)
          }
      }

}
