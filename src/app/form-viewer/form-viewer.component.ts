import { AfterViewInit, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ColDef } from 'ag-grid-community'; 
import { AppService } from '../app.service';
import { Subscription } from 'rxjs';
import { ExtApiService } from '../ext-api.service';

@Component({
  selector: 'app-form-viewer',
  templateUrl: './form-viewer.component.html',
  styleUrls: ['./form-viewer.component.scss']
})
export class FormViewerComponent implements OnInit, AfterViewInit{

  @Output() loaderEnableDesabled: EventEmitter<any> = new EventEmitter<any>();  
  @Output() loadAllInvoicesBack: EventEmitter<any> = new EventEmitter<any>();  

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

  constructor( private communicationService: AppService, private extApi: ExtApiService){
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
  }

  removeItem(index: number) {
    this.invoiceItems.splice(index, 1);
  }

  updateRate(item: any, event: any) {
    const newValue = parseFloat(event.target.innerText);
    if (!isNaN(newValue)) {
      item.rate = newValue;
      this.calculatePrice(item); // Trigger total recalculation
      this.calculateTotal();
      this.updateItem(item);
    }
  }

  updateQuantity(item: any, event: any) {
    const newValue = parseInt(event.target.innerText, 10);
    if (!isNaN(newValue)) {
      item.quantity = newValue;
      this.calculatePrice(item); // Trigger total recalculation
      this.calculateTotal();
      this.updateItem(item);
    }
  }

  updateItem(updatedItem: any) {

      let findIdx = this.invoiceItems.findIndex((el: any) => el.item === updatedItem.item);

      if(findIdx !== -1){

        this.invoiceItems[findIdx].rate = updatedItem.rate;
        this.invoiceItems[findIdx].quantity = updatedItem.quantity;
        this.invoiceItems[findIdx].price = updatedItem.price;

      }else{

        this.invoiceItems.push({
          item: updatedItem.item, rate: updatedItem.rate, quantity: updatedItem.quantity,
          description: '',
          price: 0
        })
      }
    
  }

  calculatePrice(item: any) {
    return item.rate * item.quantity;
  }

  calculateTotal() {
    
    this.totalAmount = 0;

    this.items.forEach((el:any) => {
      
        this.totalAmount += el.rate * el.quantity
    });
  }

  setSelectedCustData(selectedCustData: any){

    this.custDataForInvoice = '';

    this.custDataForInvoice = selectedCustData.custName + ', ' + selectedCustData.custAddress;

    this.custID = selectedCustData.custID;

    this.addBtnEnabled = false;
    this.updateBtnEnabled = true;
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

    this.invoiceNo = invoice.invcNo;
    this.invoiceDate = invoice.invcDate;
    this.jobDescription = invoice.jobDescription;
    this.totalPrice = invoice.totalPrice;
    this.invoicePrimeID = invoice.id;
    
    this.updateBtnEnabled = false;
    this.addBtnEnabled = true;

    await this.getInvoiceItems(this.invoiceNo)
  }

  async addInvoice(){
    debugger
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
      await this.updateInvoice();
      
      this.loaderEnableDesabled.emit(false);

    } catch (error) {
      alert("error")
      this.loaderEnableDesabled.emit(false);
    }
  }

  async updateInvoice(){
    debugger
    this.loaderEnableDesabled.emit(true);

    let reqFields = [
      {
        "id": "string",
        "invcNo": this.invoiceNo,
        "invcDate": this.invoiceDate,
        "jobDescription": this.jobDescription,
        "custId": this.custID,
        "totalPrice": this.totalPrice
      }
    ]

    try {

      let invoiceAddRes =  await this.extApi.UpdateInvoice(reqFields)
      console.log(invoiceAddRes)

      this.loaderEnableDesabled.emit(false);

    } catch (error) {

      alert("error")
      this.loaderEnableDesabled.emit(false);

    }

  }

  async updateInvoiceItems(invoiceId: any = ''){
    debugger
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
    debugger
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

//       id: "000001"
// invId: "000001"
// invItem: "000001"
// qty: 0
// status: 0
// totalPrice: 0


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
}

interface InvoiceItem {
  item: string;
  description: string;
  rate: number;
  quantity: number;
  price: number;
}