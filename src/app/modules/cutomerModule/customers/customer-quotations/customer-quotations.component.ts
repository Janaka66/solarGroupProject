import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AppService } from 'src/app/app.service';

import { ColDef } from 'ag-grid-community'; 
import * as moment from 'moment';
import { FormViewerComponent } from 'src/app/form-viewer/form-viewer.component';
import { CustomerSearchComponent } from 'src/app/sharedComp/customer-search/customer-search.component';
import { ExtApiService } from 'src/app/ext-api.service';
import { CommonLoaderComponent } from 'src/app/sharedComp/common-loader/common-loader.component';
import { EmployeeSearchComponent } from 'src/app/sharedComp/employee-search/employee-search.component';

@Component({
  selector: 'app-customer-quotations',
  templateUrl: './customer-quotations.component.html',
  styleUrls: ['./customer-quotations.component.scss']
})
export class CustomerQuotationsComponent implements OnInit, AfterViewInit{

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
    selectedCustID: any;
    allIQuot: any;
  selecetedQIItem: any;
  quatationAvailable: any;
  invoiceAvailable: any;
  selectedForInq = [] as any;
  selectedProduct: any;

  constructor(private communicationService: AppService, private extApi : ExtApiService){

  }

  ngOnInit(): void {

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
    
    await this.getAllCustomers()
}
  
  handleLeftBar() {

    this.flag = !this.flag;
    
    this.communicationService.sendData({ flag: !this.flag });
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

    this.CommonLoaderComponent.show();
    this.selectedCustID = custData.id;

    try {
        
        let custAddress = await this.extApi.CustomerAddresses(custData.id);

        let defaultAddress = custAddress.data.find((el:any) => el.isDefault === 1)
        this.formViewer.setSelectedCustQuotData({custName: custData.dispName, custAddress: defaultAddress.addLine1 + ' ' + defaultAddress.addLine2 + ' ' + defaultAddress.addLine3, custID: this.selectedCustID})

        await this.getAllQout();
        await this.getAllemployees();

        this.CommonLoaderComponent.hide();

    } catch (error) {
        
        alert("There is a problem when getting an address for this customer. Please check if this customer has default address")
        this.CommonLoaderComponent.show();
    }

}

async getAllQout(){

    return new Promise(async (resolve, reject) => {

        try {
            
            let quotRes = await this.extApi.GetQuotation({"custID" : this.selectedCustID});

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
    })

}

  selectItem(event: any){

    this.selecetedQIItem = event;
    this.formViewer.viewSelectedInvoice(event)

    this.allIQuot.forEach((product: any) => product.isSelected = false);

    event.isSelected = true;
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

    this.isLoaderAvailable = true;

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

    this.isLoaderAvailable = false;
  }

  async getAllemployees(selectedIq = []){

    try {
      
      let result = await this.extApi.GetEmployee();

      if(selectedIq.length > 0){

        result.data.forEach((el: any) => {

          let getInqdataIdx = selectedIq.findIndex((elIq: any) => elIq.empID === el.id)

          if(getInqdataIdx !== -1){
            el['checked'] = true
            this.selectedForInq.push(el)
          }
          else
            el['checked'] = false

        })
      }

      this.EmployeeSearchComponent.showEmployees(result.data);

    } catch (e: any) {
      console.log(e.error)
    }
  }

  async selectInqSelectedEmp(emp : any){

    let reqFields = {
     
    }

    try {
      
      // let getEmpByInq = await this.extApi.GetCustomerInqHasEmp(reqFields);

    

    }catch(e: any){
      console.log(e)
    }
  }
}
