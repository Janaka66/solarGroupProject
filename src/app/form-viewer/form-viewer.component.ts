import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ColDef } from 'ag-grid-community'; 
import { AppService } from '../app.service';
import { Subscription } from 'rxjs';
import { ExtApiService } from '../ext-api.service';
import * as moment from 'moment';

@Component({
  selector: 'app-form-viewer',
  templateUrl: './form-viewer.component.html',
  styleUrls: ['./form-viewer.component.scss']
})
export class FormViewerComponent implements OnInit, AfterViewInit{

  @Output() loaderEnableDesabled: EventEmitter<any> = new EventEmitter<any>();  
  @Output() loadAllInvoicesBack: EventEmitter<any> = new EventEmitter<any>();  
  @Output() loadQuataionBack: EventEmitter<any> = new EventEmitter<any>();  

  cutomerInvoice: boolean = false;
  cutomerQuatationInvoice: boolean = false;
  receivedData: any;
  subscription: Subscription;
  custDataForInvoice = '';
  allItems = [] as any;
  
  items = [] as any;
  itemName = '';

  totalAmount = 0;
  allCompanyData = [] as any;
  selectedOption: any
  comapnyAddress: any;
  mobile: any;
  fax: any;
  email: any;
  invoiceNo: any = '';
  invoiceDate: any = '';
  jobDescription: any = '';
  totalPrice: any = 0;
  custID : any;
  updateBtnEnabled: boolean = true;
  addBtnEnabled: boolean = true;
  invoicePrimeID: any;
  product: any
  prodRef: any
  validUntil: any;
  isConfirmed: boolean = false;
  allCustProducts: any;
  selectedProduct: any;
  allProducts: any;
  allCusrProducts: any;
  selectedDate: any
  selectedProdId: any;
  quatationNumber: any;
  quatationNotes: any;
  quatationJobNumber: any;
  quatationPreparedBy: any;
  quatationProdRefNu: any;
  quatationqDate: any;
  quatationvalidUntil: any;
  quatationTot: any;
  quatationisConfirmed: any;
  quatationID: any;
  quatDropdownItems: any;
  invoiceDropDownItems: any;
  selectedItemInDrop: any;

  constructor( private communicationService: AppService, private extApi: ExtApiService, private cdr: ChangeDetectorRef){
    this.subscription = this.communicationService.data$.subscribe((data: any) => {

      if(data.flag === 'quatation'){
        this.cutomerQuatationInvoice = true;
        this.cutomerInvoice = false;
      }else if(data.flag === 'invoice'){
        this.cutomerQuatationInvoice = false;
        this.cutomerInvoice = true;
      }
    });
  }

  ngOnInit(): void {

  }

  async ngAfterViewInit(): Promise<void> {

    this.loaderEnableDesabled.emit(true);
    await this.loadAllItemTypes();
    await this.loadCompany();
    this.loaderEnableDesabled.emit(false);
  }

  invoiceItems: any = []

  addItem() {
    this.invoiceItems.push({ item: '', description: '', rate: 0, quantity: 0, price: 0 });
    this.calculateTotal();
  }

  removeItem(index: number) {
    this.invoiceItems.splice(index, 1);
    this.calculateTotal();
  }

  updateRate(item: any, event: any) {
    const value = parseFloat(event.target.textContent) || 0;
    item.rate = value;
    item.price = this.calculatePrice(item);
    this.calculateTotal();
  }

  updateQuantity(item: any, event: any) {
    const value = parseFloat(event.target.textContent) || 0;
    item.quantity = value;
    item.price = this.calculatePrice(item);
    this.calculateTotal();
  }

  calculatePrice(item: any) {
    return item.rate * item.quantity;
  }

  calculateTotal() {
    this.totalAmount = this.invoiceItems.reduce((total: any, item: any) => total + item.price, 0);
  }

  async setSelectedCustData(selectedCustData: any){

    this.custDataForInvoice = '';

    this.custDataForInvoice = selectedCustData.custName + ', ' + selectedCustData.custAddress;

    this.custID = selectedCustData.custID;

    this.addBtnEnabled = false;
    this.updateBtnEnabled = true;

    await this.getProducts();
    await this.getCustProducts();

    this.onItemChange(0)

    this.clear()
  }

  async loadAllItemTypes(){
    
    try {
      
      let itemTypes = await this.extApi.Items();
      this.allItems = itemTypes.data.filter((el: any) => el.status === 0);

    } catch (e: any) {
      
      console.log(e)
      this.loaderEnableDesabled.emit(false);
    }
  }

  async loadAllItemTypesForQuat(refNumber: any){
    debugger
    try {
      
      let itemTypes = await this.extApi.GetCustomerProdcutItem({"refNu": refNumber});
      let itemsExceptDeleted = itemTypes.data[0].filter((el: any) => el.status === 0);

      itemsExceptDeleted.forEach((el: any) => {
        
        let findItem = this.allItems.find((elx:any) => elx.id === el.itemId).itemName

        if(findItem)
          el.itemName = findItem
      });

      this.quatDropdownItems = itemsExceptDeleted

    } catch (e: any) {
      
      console.log(e)
      this.loaderEnableDesabled.emit(false);
    }
  }

  async loadCompany(){
    
    try {
      
      let companyData = await this.extApi.GetCompany();
      this.allCompanyData = companyData.data[0].filter((el: any) => el.status === 0);
     

    } catch (e: any) {
      
      console.log(e)
      this.loaderEnableDesabled.emit(false);
    }
  }

  selectAddress(){

    this.comapnyAddress = this.selectedOption.addLineA + ' ' + this.selectedOption.addLineB + ' ' + this.selectedOption.addLineC 
    this.mobile = this.selectedOption.mobile;
    this.fax = this.selectedOption.fax;
    this.email = this.selectedOption.email;

    this.updateBtnEnabled = true;
  }

  public async viewSelectedInvoice(invoice: any){

    if(invoice.quotNumber){

      this.quatationNumber = invoice.quotNumber
      this.quatationNotes = invoice.notes
      this.quatationJobNumber = invoice.jobNumber
      this.quatationPreparedBy = invoice.preparedBy
      this.quatationProdRefNu = invoice.prodRefNu
      this.quatationqDate  = invoice.quotDate
      this.quatationvalidUntil = invoice.validUntil
      this.quatationTot = invoice.totalAmount
      this.quatationisConfirmed = invoice.isConfirmed,
      this.quatationID = invoice.id;

      await this.getQuatationItems(this.quatationID)

    }else{
      this.invoiceNo = invoice.invcNo;
      this.invoiceDate = invoice.invcDate;
      this.jobDescription = invoice.jobDescription;
      this.totalPrice = invoice.totalPrice;
      this.invoicePrimeID = invoice.id;
      
      this.updateBtnEnabled = false;
      this.addBtnEnabled = true;
    }
    
    await this.getInvoiceItems(this.invoicePrimeID)
  }

  async addInvoice(){
    
    this.loaderEnableDesabled.emit(true);

    let reqFields =
      {
        "id": "string",
        "invcNo": this.invoiceNo || 'string',
        "invcDate": this.invoiceDate || "2024-07-19T08:19:10.101Z",
        "jobDescription": this.jobDescription || 'string',
        "custId": this.custID,
        "totalPrice": this.totalPrice
      }
    

    try {

      let invoiceAddRes =  await this.extApi.AddInvoice(reqFields)
      
      await this.loadAllInvoicesBack.emit();

      await this.updateInvoiceItems(invoiceAddRes.data[0]);
      // await this.updateInvoice();
      
      this.loaderEnableDesabled.emit(false);

    } catch (error) {
      alert("error")
      this.loaderEnableDesabled.emit(false);
    }
  }

  // async updateInvoice(){
  //   
  //   this.loaderEnableDesabled.emit(true);

  //   let reqFields = [
  //     {
  //       "id": "string",
  //       "invcNo": this.invoiceNo,
  //       "invcDate": this.invoiceDate,
  //       "jobDescription": this.jobDescription,
  //       "custId": this.custID,
  //       "totalPrice": this.totalPrice
  //     }
  //   ]

  //   try {

  //     let invoiceAddRes =  await this.extApi.UpdateInvoice(reqFields)
  //     console.log(invoiceAddRes)

  //     this.loaderEnableDesabled.emit(false);

  //   } catch (error) {

  //     alert("error")
  //     this.loaderEnableDesabled.emit(false);

  //   }

  // }

  async updateInvoiceItems(invoiceId: any = ''){

    let updateItemObj = 
      {
        "invId": invoiceId || this.invoicePrimeID,
        "invItems": [] as any
      }
    
    this.loaderEnableDesabled.emit(true);

    this.invoiceItems.forEach((el: any) => {
      
      updateItemObj['invItems'].push({
        "id": "string",
        "invId": invoiceId || this.invoicePrimeID,
        "invItem":this.allItems.find((el: any) => el.id === el.id).id,
        "qty": el.quantity,
        "unitPrice": el.rate,
        "totalPrice": el.price,
        "status": 0
      })
    });

    try {

      let invoiceAddRes =  await this.extApi.UpdateInvoiceItem(updateItemObj)
      console.log(invoiceAddRes)
      this.loaderEnableDesabled.emit(false);

    } catch (error) {
      alert("error")
      this.loaderEnableDesabled.emit(false);
    }

  }

  async getInvoiceItems(invoiceID : any){
    
    this.invoiceItems = [];

    let reqData = {
      "invId": invoiceID,
    }

    try {
      
      let invoiceData = await this.extApi.GetInvoiceItem(reqData);

      invoiceData.data.forEach((el: any) => {
        
        this.invoiceItems.push(
          {
            rate: el.unitPrice,
            quantity: el.qty,
            item : this.allItems.find((el: any) => el.id === el.id).name
          }
        )

      });

      console.log(this.invoiceItems)


    } catch (e) {
      
      alert(e)
    }
  }

  clear(){
    this.items = [];
    this.updateBtnEnabled = true;
    this.addBtnEnabled = false;
    this.invoiceDate = '';
    this.invoiceNo = '';
    this.jobDescription = '';
    this.invoiceItems = [];

  }

  async addQuatation(){
    
    this.loaderEnableDesabled.emit(true);

    let momentDate = moment(this.selectedDate, 'YYYY/MM/DD');

    this.selectedDate = momentDate.toISOString();

    let reqFields = 
      {
        "id": "string",
        "custId": this.custID,
        "prodId": this.selectedProdId,
        "prodRefNu": this.prodRef,
        "quotNumber": "string",
        "jobNumber": "string",
        "quotDate": "2024-07-24T03:22:26.844Z",
        "validUntil": "2024-07-24T07:53:23.815Z",
        "totalAmount": 0,
        "notes": "string",
        "isConfirmed": false,
        "preparedBy": "string",
        "status": 0
      }
    
    
    try {

      let invoiceAddRes =  await this.extApi.AddQuotation(reqFields)
      
      await this.loadQuataionBack.emit();

      await this.updateInvoiceItems(invoiceAddRes.data[0]);
      // await this.updateInvoice();
      
      this.loaderEnableDesabled.emit(false);

    } catch (error) {
      alert("error")
      this.loaderEnableDesabled.emit(false);
    }
  }

  async updateQuatationItems(quatationID: any = ''){

    let updateItemObj = 
      {
        "quotId": quatationID || this.quatationID,
        "items": [] as any
      }
    
    this.loaderEnableDesabled.emit(true);

    this.invoiceItems.forEach((el: any) => {
      
      updateItemObj['items'].push({
        "id": "string",
        "quotId": quatationID,
        "itemId": this.allItems.find((el: any) => el.id === el.id).id,
        "quantity": el.quantity,
        "unitPrice": el.rate,
        "totalPrice": el.price,
        "status": 0
      })
    });

    try {

      let invoiceAddRes =  await this.extApi.UpdateInvoiceItem(updateItemObj)
      console.log(invoiceAddRes)
      this.loaderEnableDesabled.emit(false);

    } catch (error) {
      alert("error")
      this.loaderEnableDesabled.emit(false);
    }

  }

  async getQuatationItems(invoiceID : any){
    
    this.invoiceItems = [];

    let reqData = 
      {
        "quotId": [
          invoiceID
        ]
      }
    

    try {
      debugger
      let invoiceData = await this.extApi.GetQuotationItem(reqData);

      invoiceData.data.forEach((el: any) => {
        
        this.invoiceItems.push(
          {
            rate: el.unitPrice,
            quantity: el.quantity,
            item : this.allItems.find((elx: any) => elx.id === el.itemId).itemName
          }
        )

      });

      console.log(this.invoiceItems)


    } catch (e) {
      
      alert(e)
    }
  }

  async getCustProducts(){
    debugger
    let reqFields = {
      "custId": this.custID
    }
    
    try {

      let allProcts = await this.extApi.GetCustomerProdcut(reqFields);
      let custProdcuts = allProcts.data[0].filter((el: any) => el.status !== 1);
      
      this.allProducts.forEach((el: any) => {
        
        let prod = custProdcuts.find((elx: any) => elx.id === el.id)

        if(prod)
          el.refNu = prod.refNu
      })  


    } catch (error) {
      
    }
  }

  async getProducts(){
    debugger
    try {

      let allProcts = await this.extApi.getAllProducts();
      this.allProducts = allProcts.data.filter((el: any) => el.status !== 1);
      
    } catch (error) {
      
    }
  }

  async onProductChange(event: any){

    let selectedProd = this.allProducts.find((el: any) => el.productName === event)

    this.prodRef = selectedProd.refNu;
    this.selectedProdId = selectedProd.id;

    await this.loadAllItemTypesForQuat(this.prodRef)
    
  }

  onItemChange(idx: any){

    debugger
    let findItemValue = this.allItems.find((el: any) => el.id === this.selectedItemInDrop)

    this.invoiceItems[idx].rate = findItemValue.unitPrice || 0;

    this.cdr.detectChanges()

  }
}

interface InvoiceItem {
  item: string;
  description: string;
  rate: number;
  quantity: number;
  price: number;
}