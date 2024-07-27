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
  isDisabledProdSelect: boolean = false;
  allProdItems: any;
  selectedItemId: any;
  selectedProd: any;

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
    // await this.loadAllProdItemTypes()
    this.loaderEnableDesabled.emit(false);
  }

  invoiceItems: any = []

  // Invoice Cell operations======================================================
  addItem() {
    this.invoiceItems.push({ item: '', description: '', rate: 0, quantity: 0, price: 0 });
    this.calculateTotal();
  }

  removeItem(index: number) {
    this.invoiceItems.splice(index, 1);
    this.calculateTotal();
  }

  calculatePrice(item: any) {
    return item.rate * item.quantity;
  }

  calculateTotal() {
    this.totalAmount = this.invoiceItems.reduce((total: any, item: any) => total + item.price, 0);
  }

  // ===============================================================================

  // =============================Init process======================================
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

  // =========================select the address in dropDown==========================
  selectAddress(){

    this.comapnyAddress = this.selectedOption.addLineA + ' ' + this.selectedOption.addLineB + ' ' + this.selectedOption.addLineC 
    this.mobile = this.selectedOption.mobile;
    this.fax = this.selectedOption.fax;
    this.email = this.selectedOption.email;

    this.updateBtnEnabled = true;
  }

  // =========================update job description==========================
  updateJobDescription(event: any) {
    this.jobDescription = event.target.innerText;
  }


  // =========================update job description (backend)==========================
  async updateDescription(){

    this.loaderEnableDesabled.emit(true);

    let reqFields = [
      {
        "id": this.invoicePrimeID,
        "invcNo": this.invoiceNo,
        "invcDate": "2024-07-24T18:54:05.954Z",
        "jobDescription": this.jobDescription,
        "custId": this.custID,
        "totalPrice": this.totalAmount
      }
    ]

    try {

      let invoiceAddRes =  await this.extApi.UpdateInvoice(reqFields)
      console.log(invoiceAddRes)

      this.clear();
      await this.loadAllInvoicesBack.emit();

      this.loaderEnableDesabled.emit(false);

    } catch (error) {

      alert("error")
      this.loaderEnableDesabled.emit(false);

    }
  }

  // =========================invoice Item qty rate change==========================
  onItemChangeInvoice(index: number) {
    const selectedItem = this.allItems.find((item: any) => item.id === this.invoiceItems[index].invItem);
    if (selectedItem) {
      this.invoiceItems[index].rate = selectedItem.unitPrice;
      this.invoiceItems[index].price = this.invoiceItems[index].quantity * selectedItem.unitPrice;
    }
  }

  updateRateInvoice(item: any, event: any) {
    const newRate = event.target.innerText;
    item.rate = newRate;
    item.price = item.quantity * newRate;
    this.calculateTotal();
  }

  updateQuantityInvoice(item: any, event: any) {
    const newQuantity = event.target.innerText;
    item.quantity = newQuantity;
    item.price = newQuantity * item.rate;
    this.calculateTotal();
  }

  // =========================View Selected Invoice==========================
    public async viewSelectedInvoice(invoice: any){

    // if(invoice.quotNumber){

      // this.quatationNumber = invoice.quotNumber
      // this.quatationNotes = invoice.notes
      // this.quatationJobNumber = invoice.jobNumber
      // this.quatationPreparedBy = invoice.preparedBy
      // this.quatationProdRefNu = invoice.prodRefNu
      // this.quatationqDate  = invoice.quotDate
      // this.quatationvalidUntil = invoice.validUntil
      // this.quatationTot = invoice.totalAmount
      // this.totalAmount = this.quatationTot
      // this.quatationisConfirmed = invoice.isConfirmed,
      // this.quatationID = invoice.id;
      // this.selectedProd = invoice.prodId

      // this.updateBtnEnabled = false;
      // this.addBtnEnabled = true;

      // this.selectedProduct = this.allProducts.find((el: any) => el.id === invoice.prodId).productName
      // await this.onProductChange(this.selectedProduct)




    //   this.isDisabledProdSelect = true;

    // }else{

      this.invoiceNo = invoice.invcNo;
      this.invoiceDate = invoice.invcDate;
      this.jobDescription = invoice.jobDescription;
      this.totalPrice = invoice.totalPrice;
      this.invoicePrimeID = invoice.id;
      this.totalAmount = invoice.totalPrice;
      
      this.updateBtnEnabled = false;
      this.addBtnEnabled = true;
      this.isDisabledProdSelect = true;
      
      await this.getInvoiceItems(this.invoicePrimeID)
    // }
    
  }

  // =========================select customer and send to viewr==========================
      async setSelectedCustData(selectedCustData: any){
  
      this.custDataForInvoice = '';

      this.custDataForInvoice = selectedCustData.custName + ', ' + selectedCustData.custAddress;

      this.custID = selectedCustData.custID;

      this.addBtnEnabled = false;
      this.updateBtnEnabled = true;
      this.isDisabledProdSelect = false;

      this.invoiceDate = '';
      this.invoiceNo = '';
      this.jobDescription = '';
      this.invoiceItems = [];
      this.totalAmount = 0;

      this.addBtnEnabled = false;

      // await this.getProducts();
      // await this.getCustProducts();

      // this.onItemChange(0)

    }

    async getInvoiceItems(invoiceID : any){

      let reqData = {
        "invId": invoiceID,
      }

      try {
        
        let invoiceData = await this.extApi.GetInvoiceItem(reqData);

        this.invoiceItems = invoiceData.data.map((invoiceItem: any) => {
          const dropdownItem = this.allItems.find((item: any) => item.id === invoiceItem.invItem);
          if (dropdownItem) {
            return {
              ...invoiceItem,
              itemName: this.getItemNameById(dropdownItem.id),
              rate: invoiceItem.unitPrice,
              price: invoiceItem.totalPrice,
              quantity: invoiceItem.qty
              
            };
          }
          return invoiceItem;
        });

        this.cdr.detectChanges()

      } catch (e) {
        
        alert('get invo')
      }
    }

    getItemNameById(itemId: string): string {
      const item = this.allItems.find((i: any) => i.id === itemId);
      return item ? item.itemName : '';
    }

    async addInvoice(){
    
      this.loaderEnableDesabled.emit(true);

      let reqFields =
        {
          "id": "string",
          "invcNo": this.invoiceNo || 'string',
          "invcDate": "2024-07-19T08:19:10.101Z",
          "jobDescription": this.jobDescription || 'string',
          "custId": this.custID,
          "totalPrice": this.totalPrice
        }
      

      try {

        let invoiceAddRes =  await this.extApi.AddInvoice(reqFields)
        
        await this.loadAllInvoicesBack.emit();

        await this.updateInvoiceItems(invoiceAddRes.data[0]);
        
        this.loaderEnableDesabled.emit(false);

      } catch (error) {
        alert("error")
        this.loaderEnableDesabled.emit(false);
      }
    }

    async updateInvoiceItems(invoiceId: any = ''){

      let updateItemObj = 
        {
          "invId": this.invoicePrimeID || invoiceId,
          "invItems": [] as any
        }
      
      this.loaderEnableDesabled.emit(true);

      this.invoiceItems.forEach((el: any) => {
        
        updateItemObj['invItems'].push({
          "id": this.invoiceItems.find((i: any) => i.invItem === el.invItem).id || 'string',
          "invId": this.invoicePrimeID || invoiceId,
          "invItem":this.allItems.find((i: any) => i.id === el.invItem).id,
          "qty": parseFloat(el.quantity),
          "unitPrice": parseFloat(el.rate),
          "totalPrice": parseFloat(el.price),
          "status": 0,
          "flag":"saved"
        })
      });

      try {

        let invoiceAddRes =  await this.extApi.UpdateInvoiceItem(updateItemObj)

        this.loaderEnableDesabled.emit(false);

        this.invoiceDate = '';
        this.invoiceNo = '';
        this.jobDescription = '';
        this.invoiceItems = [];

        await this.loadAllInvoicesBack.emit();

        this.totalAmount = 0
        
      } catch (error) {
        alert("error")
        this.loaderEnableDesabled.emit(false);
      }

    }

  //   async setSelectedCustQuotData(selectedCustData: any){

  //     this.custDataForInvoice = '';

  //     this.custDataForInvoice = selectedCustData.custName + ', ' + selectedCustData.custAddress;

  //     this.custID = selectedCustData.custID;

  //     this.addBtnEnabled = false;
  //     this.updateBtnEnabled = true;
  //     this.isDisabledProdSelect = false;

  //     // await this.getProducts();
  //     // await this.getCustProducts();

  //   }

    clear(){
      this.items = [];
      this.updateBtnEnabled = true;
      this.addBtnEnabled = false;
      this.invoiceDate = '';
      this.invoiceNo = '';
      this.jobDescription = '';
      this.invoiceItems = [];
      this.totalAmount = 0;
      this.prodRef = '';
      this.allProducts = [];
      this.custDataForInvoice = ''
    }

//   async loadAllItemTypesForQuat(refNumber: any){
//     
//     try {
      
//       let req = {
//         "custId": this.custID,
//         "prodId": this.selectedProd,
//         "refNu": refNumber
//       }

//       let itemTypes = await this.extApi.GetCustomerProdcutItem(req);
//       let itemsExceptDeleted = itemTypes.data[0].filter((el: any) => el.status === 0);

//       itemsExceptDeleted.forEach((el: any) => {
        
//         let findItem = this.allItems.find((elx:any) => elx.id === el.itemId).itemName

//         if(findItem)
//           el.itemName = findItem
//       });

//       this.quatDropdownItems = itemsExceptDeleted

//       this.cdr.detectChanges()
      
//       await this.getQuatationItems(this.quatationID, this.quatDropdownItems)
      
//     } catch (e: any) {
      
//       console.log(e)
//       this.loaderEnableDesabled.emit(false);
//     }
//   }

//   async loadCompany(){
    
//     try {
      
//       let companyData = await this.extApi.GetCompany();
//       this.allCompanyData = companyData.data[0].filter((el: any) => el.status === 0);
     

//     } catch (e: any) {
      
//       console.log(e)
//       this.loaderEnableDesabled.emit(false);
//     }
//   }

//   selectAddress(){

//     this.comapnyAddress = this.selectedOption.addLineA + ' ' + this.selectedOption.addLineB + ' ' + this.selectedOption.addLineC 
//     this.mobile = this.selectedOption.mobile;
//     this.fax = this.selectedOption.fax;
//     this.email = this.selectedOption.email;

//     this.updateBtnEnabled = true;
//   }

//   public async viewSelectedInvoice(invoice: any){
// 
//     if(invoice.quotNumber){

//       this.quatationNumber = invoice.quotNumber
//       this.quatationNotes = invoice.notes
//       this.quatationJobNumber = invoice.jobNumber
//       this.quatationPreparedBy = invoice.preparedBy
//       this.quatationProdRefNu = invoice.prodRefNu
//       this.quatationqDate  = invoice.quotDate
//       this.quatationvalidUntil = invoice.validUntil
//       this.quatationTot = invoice.totalAmount
//       this.totalAmount = this.quatationTot
//       this.quatationisConfirmed = invoice.isConfirmed,
//       this.quatationID = invoice.id;
//       this.selectedProd = invoice.prodId

//       this.updateBtnEnabled = false;
//       this.addBtnEnabled = true;

//       this.selectedProduct = this.allProducts.find((el: any) => el.id === invoice.prodId).productName
//       await this.onProductChange(this.selectedProduct)




//       this.isDisabledProdSelect = true;

//     }else{

//       this.invoiceNo = invoice.invcNo;
//       this.invoiceDate = invoice.invcDate;
//       this.jobDescription = invoice.jobDescription;
//       this.totalPrice = invoice.totalPrice;
//       this.invoicePrimeID = invoice.id;
//       this.totalAmount = invoice.totalPrice;
      
//       this.updateBtnEnabled = false;
//       this.addBtnEnabled = true;
//       this.isDisabledProdSelect = true;
      
//       await this.getInvoiceItems(this.invoicePrimeID)
//     }
    

//   }



//   async updateInvoice(){
    
//     this.loaderEnableDesabled.emit(true);

//     let reqFields = [
//       {
//         "id": "string",
//         "invcNo": this.invoiceNo,
//         "invcDate": this.invoiceDate,
//         "jobDescription": this.jobDescription,
//         "custId": this.custID,
//         "totalPrice": this.totalPrice
//       }
//     ]

//     try {

//       let invoiceAddRes =  await this.extApi.UpdateInvoice(reqFields)
//       console.log(invoiceAddRes)

//       this.loaderEnableDesabled.emit(false);

//     } catch (error) {

//       alert("error")
//       this.loaderEnableDesabled.emit(false);

//     }

//   }



//   async updateDescription(){

// 
//     this.loaderEnableDesabled.emit(true);

//     let reqFields = [
//       {
//         "id": this.invoicePrimeID,
//         "invcNo": this.invoiceNo,
//         "invcDate": "2024-07-24T18:54:05.954Z",
//         "jobDescription": this.jobDescription,
//         "custId": this.custID,
//         "totalPrice": this.totalAmount
//       }
//     ]

//     try {

//       let invoiceAddRes =  await this.extApi.UpdateInvoice(reqFields)
//       console.log(invoiceAddRes)

//       this.clear();
//       await this.loadAllInvoicesBack.emit();

//       this.loaderEnableDesabled.emit(false);

//     } catch (error) {

//       alert("error")
//       this.loaderEnableDesabled.emit(false);

//     }
    
//   }

//   // ------------------------
//   onItemChange(index: number) {
//     const selectedItem = this.allItems.find((item: any) => item.id === this.invoiceItems[index].invItem);
//     if (selectedItem) {
//       this.invoiceItems[index].rate = selectedItem.unitPrice;
//       this.invoiceItems[index].price = this.invoiceItems[index].quantity * selectedItem.unitPrice;
//     }
//   }

//   updateRate(item: any, event: any) {
//     const newRate = event.target.innerText;
//     item.rate = newRate;
//     item.price = item.quantity * newRate;
//     this.calculateTotal();
//   }

//   updateQuantity(item: any, event: any) {
//     const newQuantity = event.target.innerText;
//     item.quantity = newQuantity;
//     item.price = newQuantity * item.rate;
//     this.calculateTotal();
//   }

//   // --------------------------


//   clear(){
//     this.items = [];
//     this.updateBtnEnabled = true;
//     this.addBtnEnabled = false;
//     this.invoiceDate = '';
//     this.invoiceNo = '';
//     this.jobDescription = '';
//     this.invoiceItems = [];
//     this.totalAmount = 0;
//     this.prodRef = '';
//     this.allProducts = [];
//     this.custDataForInvoice = ''


//   }

//   // =======================================================================
//   async addQuatation(){
    
//     this.loaderEnableDesabled.emit(true);

//     let momentDate = moment(this.selectedDate, 'YYYY/MM/DD');

//     this.selectedDate = momentDate.toISOString();

//     let reqFields = 
//       {
//         "id": "string",
//         "custId": this.custID,
//         "prodId": this.selectedProdId,
//         "prodRefNu": this.prodRef,
//         "quotNumber": "string",
//         "jobNumber": "string",
//         "quotDate": "2024-07-24T03:22:26.844Z",
//         "validUntil": "2024-07-24T07:53:23.815Z",
//         "totalAmount": 0,
//         "notes": "string",
//         "isConfirmed": false,
//         "preparedBy": "string",
//         "status": 0
//       }
    
    
//     try {

//       let invoiceAddRes =  await this.extApi.AddQuotation(reqFields)

//       await this.updateQuatationItems(invoiceAddRes.data[0]);
//       // await this.updateInvoice();
      
//       this.loaderEnableDesabled.emit(false);

//     } catch (error) {
//       alert("error")
//       this.loaderEnableDesabled.emit(false);
//     }
//   }

//   async updateQuatationItems(quatationID: any = ''){

//     let updateItemObj = 
//       {
//         "quotId": quatationID || this.quatationID,
//         "items": [] as any
//       }
    
//     this.loaderEnableDesabled.emit(true);

//     this.invoiceItems.forEach((el: any) => {
      
//       updateItemObj['items'].push({
//         "id": this.invoiceItems.find((i: any) => i.itemId === el.itemId).id,
//         "quotId": quatationID || this.quatationID,
//         "itemId": this.allItems.find((elx: any) => elx.id === el.itemId).id,
//         "quantity": parseFloat(el.quantity),
//         "unitPrice": parseFloat(el.rate),
//         "totalPrice": parseFloat(el.price),
//         "status": 0
//       })
//     });

//     try {

//       let invoiceAddRes =  await this.extApi.UpdateQuotationItems(updateItemObj)

//       this.loaderEnableDesabled.emit(false);

//       this.clear();
//       await this.loadQuataionBack.emit();

//       this.totalAmount = 0

//     } catch (error) {
//       alert("error")
//       this.loaderEnableDesabled.emit(false);
//     }

//   }

//   async updateQuatation(){
    
//     this.loaderEnableDesabled.emit(true);

//     let reqFields = {
//       "id": "string",
//       "custId": this.custID,
//       "prodId": this.selectedProdId,
//       "prodRefNu": this.prodRef,
//       "quotNumber": "string",
//       "jobNumber": "string",
//       "quotDate": "2024-07-24T03:22:26.844Z",
//       "validUntil": "2024-07-24T07:53:23.815Z",
//       "totalAmount": 0,
//       "notes": "string",
//       "isConfirmed": false,
//       "preparedBy": "string",
//       "status": 0
//     }

//     try {

//       let invoiceAddRes =  await this.extApi.UpdateQuotation(reqFields)
//       console.log(invoiceAddRes)

//       this.loaderEnableDesabled.emit(false);

//     } catch (error) {

//       alert("error")
//       this.loaderEnableDesabled.emit(false);

//     }

//   }

//   // get inv items
//   async getQuatationItems(invoiceID : any, quatDropdownItems : any){

//     let reqData = 
//       {
//         "quotId": [
//           invoiceID
//         ]
//       }

//     try {

//       
      
//       let invoiceData = await this.extApi.GetQuotationItem(reqData);

//       console.log(invoiceData)
//       console.log(this.allProdItems)
//       console.log(this.allItems)

//       this.invoiceItems = invoiceData.data.map((invoiceItem: any) => {
//         const dropdownItem = quatDropdownItems.find((item: any) => item.itemId === invoiceItem.itemId);
//         if (dropdownItem) {
//           return {
//             ...invoiceItem,
//             itemName: this.getItemNameById(dropdownItem.itemId),
//             rate: invoiceItem.unitPrice,
//             price: invoiceItem.totalPrice

//           };
//         }
//         return invoiceItem;
//       });


//     } catch (e) {
      
//       alert('getQout item')
//     }
//   }

//   async getInvoiceItems(invoiceID : any){

//     let reqData = {
//       "invId": invoiceID,
//     }

//     try {
      

//         let invoiceData = await this.extApi.GetInvoiceItem(reqData);

//         this.invoiceItems = invoiceData.data.map((invoiceItem: any) => {
//           const dropdownItem = this.allItems.find((item: any) => item.id === invoiceItem.invItem);
//           if (dropdownItem) {
//             return {
//               ...invoiceItem,
//               itemName: this.getItemNameById(dropdownItem.id),
//               rate: invoiceItem.unitPrice,
//               price: invoiceItem.totalPrice
              
//             };
//           }
//           return invoiceItem;
//         });

//         this.cdr.detectChanges()

//     } catch (e) {
      
//       alert('get invo')
//     }
//   }
//   // ===============================================


//   async getCustProducts(){
//     
//     let reqFields = {
//       "custId": this.custID
//     }
    
//     try {

//       let allProcts = await this.extApi.GetCustomerProdcut(reqFields);
//       let custProdcuts = allProcts.data[0].filter((el: any) => el.status !== 1);
      
//       this.allProducts.forEach((el: any) => {
        
//         let prod = custProdcuts.find((elx: any) => elx.id === el.id)

//         if(prod)
//           el.refNu = prod.refNu
//       })  

//       this.cdr.detectChanges();

//     } catch (error) {
      
//     }
//   }

//   async getProducts(){

//     try {

//       let allProcts = await this.extApi.getAllProducts();
//       this.allProducts = allProcts.data.filter((el: any) => el.status !== 1);
      
//     } catch (error) {
      
//     }
//   }

//   async onProductChange(event: any){
// 
//     let selectedProd = this.allProducts.find((el: any) => el.productName === event)

//     this.prodRef = selectedProd.refNu;
//     this.selectedProdId = selectedProd.id;

//     await this.loadAllItemTypesForQuat(this.prodRef)
    
//   }

//   // onItemChange(idx: any){

//   //   
//   //   let findItemValue = this.allItems.find((el: any) => el.id === this.selectedItemInDrop)

//   //   this.invoiceItems[idx].rate = findItemValue.unitPrice || 0;

//   //   this.cdr.detectChanges()

//   // }

//   updateJobDescription(event: any) {
//     this.jobDescription = event.target.innerText;
//   }


//   getItemNameById(itemId: string): string {
//     const item = this.allItems.find((i: any) => i.id === itemId);
//     return item ? item.itemName : '';
//   }

//   // ------------------------------

//   onItemQoutChange(index: number): void {
//     this.selectedItemId = this.invoiceItems[index].id;
//     const selectedDropdownItem = this.quatDropdownItems.find((item: any) => item.itemId === this.selectedItemId);
//     if (selectedDropdownItem) {
//       this.invoiceItems[index].itemId = this.selectedItemId;
//       this.invoiceItems[index].itemName = this.getItemNameById(this.selectedItemId);
//       // update rate and price if necessary
//     }
//   }

//   updateQuotRate(item: any, event: any): void {
//     const newRate = +event.target.innerText;
//     item.unitPrice = newRate;
//     item.totalPrice = newRate * item.quantity;
//     this.calculateTotalQuot();
//   }

//   updateQuotQuantity(item: any, event: any): void {
//     const newQuantity = +event.target.innerText;
//     item.quantity = newQuantity;
//     item.totalPrice = newQuantity * item.unitPrice;
//     this.calculateTotalQuot()
//   }

//   removeQuotItem(index: number): void {
//     this.invoiceItems.splice(index, 1);
//   }

//   calculateTotalQuot() {
//     
//     this.totalAmount = this.invoiceItems.reduce((total: any, item: any) => total + item.totalPrice, 0);
//   }
}

interface InvoiceItem {
  item: string;
  description: string;
  rate: number;
  quantity: number;
  price: number;
}