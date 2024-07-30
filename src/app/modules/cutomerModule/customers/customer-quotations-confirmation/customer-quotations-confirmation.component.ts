import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AppService } from 'src/app/app.service';

import { ColDef } from 'ag-grid-community'; 
import * as moment from 'moment';
import { FormViewerComponent } from 'src/app/form-viewer/form-viewer.component';
import { CustomerSearchComponent } from 'src/app/sharedComp/customer-search/customer-search.component';
import { ExtApiService } from 'src/app/ext-api.service';
import { CommonLoaderComponent } from 'src/app/sharedComp/common-loader/common-loader.component';
import { EmployeeSearchComponent } from 'src/app/sharedComp/employee-search/employee-search.component';
import { NotificationDialogComponent, NotificationType } from 'src/app/sharedComp/notification-dialog/notification-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-customer-quotations-confirmation',
  templateUrl: './customer-quotations-confirmation.component.html',
  styleUrls: ['./customer-quotations-confirmation.component.scss']
})
export class CustomerQuotationsConfirmation implements OnInit, AfterViewInit{

    @ViewChild('printArea') printArea: ElementRef | any;
    @ViewChild('customerSearch') CustomerSearchComponent: CustomerSearchComponent | any;
    @ViewChild('formViewer') formViewer: FormViewerComponent | any;
    @ViewChild('loader') CommonLoaderComponent: CommonLoaderComponent | any;
    @ViewChild('employeeSearch') EmployeeSearchComponent: EmployeeSearchComponent | any;
    
    flag: boolean = false;
    products: [] | any;
    responsiveOptions: any[] | undefined;
    showLoader = false;
    isLoaderAvailable: boolean = false;
    componant = 'inqComp'; 
    prodNameforItems: any = '';
    prodRefNumber: any = '';
    prodIdForGetItems: any;
    prodRefNumbers: any = [];
    
    rowData = [] as any;
  
    colDefs: ColDef[] = [
      { field: "make" },
      { field: "model" },
      { field: "price" },
      { field: "electric" }
    ];

    selectedCustID: any;
    allIQuot: any = [];
    selecetedQIItem: any;
    quatationAvailable: any;
    invoiceAvailable: any;
    selectedForInq = [] as any;
    selectedProduct: any;
    addEmpDisabled: boolean = true;
    getAllProduct: any;
    custAllproducts: any;
    loadcustomerProductsDropDown = [] as any;
    handleIconDisabled: boolean = false;
    ;
    constructor(private communicationService: AppService, private extApi : ExtApiService, private dialog: MatDialog, private cdr: ChangeDetectorRef){

  }

  async ngOnInit(): Promise<void> {

    this.communicationService.enableInvices({ flag: "quatation" })
    
    // this.getProductsSmall().then((products: any) => {
    //   this.products = products;
    // });

    this.responsiveOptions = [
        {
            breakpoint: '1400px',
            numVisible: 3,
            numScroll: 3
        },
        {
            breakpoint: '1220px',
            numVisible: 2,
            numScroll: 2
        },
        {
            breakpoint: '1100px',
            numVisible: 1,
            numScroll: 1
        }
    ];
    
  }

  async ngAfterViewInit(): Promise<void> {

    this.CommonLoaderComponent.show();
    
    await this.GetEmployeeAssignedQuotationsForAccept()
}
  
  handleLeftBar() {

    this.flag = !this.flag;
    
    this.communicationService.sendData({ flag: !this.flag });
  }

  
  async GetEmployeeAssignedQuotationsForAccept() {
    debugger

    let UserallIQuot: { quatcustId: any; quatid: any; quatisConfirmed: any; quatjobNumber: any; quatnotes: any; quatpreparedBy: any; quatprodId: any; quatprodRefN: any; quatquotDate: any; quatquotNumber: any; quattotalAmount: any; quatvalidUntil: any; confirmedOn: any; empID: any; employeeNote: any; employeeProfile: any; hierarchyLevel: any; id: any; isConfirmed: any; isRejected: any; quotID: any; rejectedOn: any; }[] = [];
    
    try {
      
      let res = await this.extApi.GetEmployeeAssignedQuotationsForAccept();

      console.log(res);

      res.data[0].forEach((el: any) => {
        
        UserallIQuot.push({
          quatcustId      : el.quotation.custId,
          quatid          : el.quotation.id,
          quatisConfirmed : moment(el.quotation.isConfirmed).format('YYYY-MM-DD'),
          quatjobNumber   : el.quotation.jobNumber,
          quatnotes       : el.quotation.notes,
          quatpreparedBy  : el.quotation.preparedBy,
          quatprodId      : el.quotation.prodId,
          quatprodRefN    : el.quotation.prodRefNu,
          quatquotDate    : moment(el.quotation.quotDate).format('YYYY-MM-DD'),
          quatquotNumber  : el.quotation.quotNumber,
          quattotalAmount : el.quotation.totalAmount,
          quatvalidUntil  : moment(el.quotation.validUntil).format('YYYY-MM-DD'),
          confirmedOn     : moment(el.confirmedOn).format('YYYY-MM-DD'),
          empID           : el.empID, 
          employeeNote    : el.employeeNote, 
          employeeProfile : el.employeeProfile,
          hierarchyLevel  : el.hierarchyLevel, 
          id              : el.id, 
          isConfirmed     : el.isConfirmed,
          isRejected      : el.isRejected,
          quotID          : el.quotID,
          rejectedOn      : el.rejectedOn

        })
      });

      this.allIQuot = UserallIQuot

      console.log(this.allIQuot)
      this.cdr.detectChanges();

    } catch (error) {
      console.log(error)
    }
  }

  acceptInquiry(inquiry: any) {
 
    inquiry.isConfirmed = true;
    inquiry.isRejected = false;

  }

  rejectInquiry(inquiry: any) {

    inquiry.isConfirmed = false;
    inquiry.isRejected = true;
    
  }

  async update(quatation: any){

    this.formViewer.updateQuotConfirm(quatation)
  }
  
  async getAllCustomers(){

    try {
      
      let result = await this.extApi.getAllCustomers();
      this.CustomerSearchComponent.showCustomers(result.data[0]);

      this.CommonLoaderComponent.hide();
    } catch (e: any) {
      console.log(e.error)
      this.CommonLoaderComponent.hide();
    }
  }

  async bindCutomerData(custData: any){

      this.allIQuot = []
      this.prodRefNumbers = [];

      this.CommonLoaderComponent.show();
      this.selectedCustID = custData.id;

      this.selectedForInq = [];
      await this.getAllemployees();
      await this.getProducts();

      this.CommonLoaderComponent.hide();

      // try {
          

      //     //let custAddress = await this.extApi.CustomerAddresses(custData.id);

      //     //let defaultAddress = custAddress.data.find((el:any) => el.isDefault === 1)
      //     //this.formViewer.setSelectedCustQuotData({custName: custData.dispName, custAddress: defaultAddress.addLine1 + ' ' + defaultAddress.addLine2 + ' ' + defaultAddress.addLine3, custID: this.selectedCustID})


        

      // } catch (error) {
          
      //     //alert("There is a problem when getting an address for this customer. Please check if this customer has default address")
      //     this.CommonLoaderComponent.show();
      // }

  }

  async getAllQout(){

      return new Promise(async (resolve, reject) => {

        if(!this.selectedCustID && !this.prodNameforItems && !this.prodRefNumber){
          this.notifyMessage("Qatations", "Please seleect customer , Product and refrence number of the product",NotificationType.warn)
        }else{

            try {
                
              let quotRes = await this.extApi.GetQuotation(
                {
                  "custID":  this.selectedCustID,
                  "prodId": this.prodNameforItems,
                  "prodRefNu": this.prodRefNumber,
                }
                );

              quotRes.data.forEach((el: any) => {
                  
                  el.quotDate = moment(el.quotDate).format('YYYY/MM/DD');
              });

              
              this.allIQuot = quotRes.data.filter((el: any) => el.status === 0);
              quotRes.data.forEach((el: any) => el.isSelected = false)

              this.CommonLoaderComponent.hide();
              resolve(1)
      
          } catch (e: any) {
              
              alert("error")

              this.CommonLoaderComponent.hide();
              reject(0)
          }

        }
      })

  }

  async selectItem(event: any){ 

    this.handleIconDisabled = true;

    this.selecetedQIItem = event;
    this.formViewer.viewSelectedInvoice(event)

    this.allIQuot.forEach((product: any) => product.isSelected = false);

    event.isSelected = true;

    this.addEmpDisabled = false;

    await this.getAllemployees();
    
    await this.GetQuotationHasEmployeeToConfirm();
  }

  onPage(event: any){}

  loaderHandle(event: any){
    
    if(event)
      this.CommonLoaderComponent.show();
    else
      this.CommonLoaderComponent.hide();
  }

  async removeQuatation(){

    this.CommonLoaderComponent.show();

    console.log(this.selecetedQIItem)

    let reqFields = {
      "id": this.selecetedQIItem.id,
      "custId": this.selecetedQIItem.custId,
      "prodId": this.selecetedQIItem.prodId,
      "prodRefNu": this.selecetedQIItem.prodRefNu,
      "quotNumber": "string",
      "jobNumber": "string",
      "quotDate": "2024-07-24T03:22:26.844Z",
      "validUntil": "2024-07-24T05:46:16.222Z",
      "totalAmount": 0,
      "notes": "string",
      "isConfirmed": false,
      "preparedBy": "string",
      "status": 1
    }

    try {

      let invoiceAddRes =  await this.extApi.UpdateQuotation(reqFields)
      this.getAllQout();
      
    } catch (error) {

      this.CommonLoaderComponent.hide();
      alert("error")

    }

  }

  // async removeInvoice(){
    
  //   let reqFields = {
  //     "id": "string",
  //     "custId": this.custID,
  //     "prodId": this.selectedProdId,
  //     "prodRefNu": this.prodRef,
  //     "quotNumber": "string",
  //     "jobNumber": "string",
  //     "quotDate": "2024-07-24T03:22:26.844Z",
  //     "validUntil": this.selectedDate,
  //     "totalAmount": 0,
  //     "notes": "string",
  //     "isConfirmed": false,
  //     "preparedBy": "string",
  //     "status": 0
  //   }

  //   try {

  //     let invoiceAddRes =  await this.extApi.UpdateInvoice(reqFields)
  //     console.log(invoiceAddRes)

  //     this.loaderEnableDesabled.emit(false);

  //   } catch (error) {

  //     alert("error")
  //     this.loaderEnableDesabled.emit(false);

  //   }

  // }

  async removeQuatOrInvoice(event: any){

    this.CommonLoaderComponent.show();

    if(event.quotNumber){

      this.selecetedQIItem = event

      await this.removeQuatation()

      this.CommonLoaderComponent.hide();
    }
  }

  bindEmployeeData(event: any){

    this.CommonLoaderComponent.show();

    let existData = this.selectedForInq.filter((el: any) => el.id === event.selectedData.id);

    if(existData && !event.checked){

      this.selectedForInq = this.selectedForInq.filter((el: any) => el.id !== existData[0].id);

    }else{

      if(event.checked){

        event.selectedData['inqStatus'] = 'new'
        this.selectedForInq.push(event.selectedData)
        
      }else{
        event.selectedData['inqStatus'] = ''
      }

    }

    // if(this.selectedForInq.length !== 0)
    //   this.isSelectedInqDisabled = false;
    // else
    //   this.isSelectedInqDisabled = true;

   
    this.CommonLoaderComponent.false();
  }

  async getAllemployees(selectedIq = []){

    try {
      
      let result = await this.extApi.GetEmployee();

      // if(selectedIq.length > 0){

      //   result.data.forEach((el: any) => {

      //     let getInqdataIdx = selectedIq.findIndex((elIq: any) => elIq.empID === el.id)

      //     if(getInqdataIdx !== -1){
      //       el['checked'] = true
      //       this.selectedForInq.push(el)
      //     }
      //     else
      //       el['checked'] = false

      //   })
      // }

      this.EmployeeSearchComponent.showEmployees(result.data);

    } catch (e: any) {
      console.log(e.error)
    }
  }

  async sendSelectedEmpToAdd(){ 
    debugger
    this.formViewer.UpdateQuotationHasEmployeeToConfirm(this.communicationService.selectedForInq)
    this.selectedForInq = [];

    await this.getAllemployees();
  }

  async GetQuotationHasEmployeeToConfirm(){

    try {
      
      
      let res = await this.extApi.GetQuotationHasEmployeeToConfirm({quotID: this.selecetedQIItem.id});

      console.log(res.data)
      this.selectedForInq = res.data

      await this.getAllemployeesForSelecetedQuot(this.selectedForInq);

    } catch (error) {
      alert(error)
    }
  }

  async getAllemployeesForSelecetedQuot(selectedIq = []){

    debugger;

    try {
      
      let result = await this.extApi.GetEmployee();

      if(selectedIq.length > 0){

        result.data.forEach((el: any) => {

          let getInqdataIdx = selectedIq.findIndex((elIq: any) => elIq.id === el.id)

          if(getInqdataIdx !== -1){
            el['checked'] = true
          }
          else
            el['checked'] = false

        })
      }

      this
      this.EmployeeSearchComponent.showEmployees(result.data);

    } catch (e: any) {
      console.log(e.error)
    }
  }

  async onProductNameChange(event: any){
debugger
    console.log(this.custAllproducts)
    this.prodRefNumbers = this.custAllproducts.filter((product: any) => product.prodId === this.prodNameforItems);

    console.log(this.prodRefNumbers)

  }



  private notifyMessage(title: string, message: string, notificationType: NotificationType) {

    this.dialog.open(NotificationDialogComponent, {
      width: '300px',
      data: { title, message, notificationType}
    });
  }


  public async hadleAssignedEmp(event: any) {
    event.stopPropagation();

    await this.GetQuotationHasEmployeeToConfirm()

    let userChoice = await this.dialog.open(NotificationDialogComponent, {
      width: '600px',
      data: {showEmp: true, quatID: this.selecetedQIItem.id}
      
    }).afterClosed().toPromise();
  
    if (userChoice){
     debugger
     this.sendSelectedEmpToAdd()
    }
    else{
      debugger
    }
  }

  async getProducts(){
    debugger

    this.loadcustomerProductsDropDown = []
    try {

      let allProdByCustomer = await this.extApi.GetCustomerProdcut({"custId": this.selectedCustID});
      
      this.custAllproducts = allProdByCustomer.data[0].filter((el: any) => el.status !== 1);

      this.custAllproducts.forEach((el: any) => {
        
        this.getAllProduct.forEach((elp: any) => {

          if(elp.id === el.prodId){

              this.loadcustomerProductsDropDown.push({
    
                productName: elp['productName'],
                prodRefNumber: el.refNu,
                prodID : el.prodId
    
    
              })
            
          }
        })

        

      });

      this.loadcustomerProductsDropDown = this.getUniqueProducts(this.loadcustomerProductsDropDown)
          
      
    } catch (error) {
      this.notifyMessage("Load Products", "Something went wrong while load products",NotificationType.warn)
    }
  }

  async getQuatations(){

    try {

      await this.getAllQout();
      
    } catch (error) {
      console.log(error)
    }
  }

  async getAllProducts(){
    
    try {

      let allProcts = await this.extApi.getAllProducts();
      this.getAllProduct = allProcts.data.filter((el: any) => el.status !== 1);
      
      console.log('=====getAllProducts=====')
      console.log(this.getAllProduct)

    } catch (error) {
      this.notifyMessage("Load Products", "Something went wrong while load products",NotificationType.warn)
    }
  }

  getUniqueProducts(allProducts: any) {

    return [...new Map(allProducts.map((item: any) => [item.productName, item])).values()];
    
  }

  onRefCHange(){
    this.formViewer.loadQuatationItems({
      "custID":  this.selectedCustID,
      "prodId": this.prodNameforItems,
      "prodRefNu": this.prodRefNumber,
    })
  }
}
