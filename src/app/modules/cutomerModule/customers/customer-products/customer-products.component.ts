import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AppService } from 'src/app/app.service';

import { ColDef } from 'ag-grid-community'; 
import { ExtApiService } from 'src/app/ext-api.service';
import { CustomerSearchComponent } from 'src/app/sharedComp/customer-search/customer-search.component';
import { AgGridAngular } from 'ag-grid-angular';
import { MatDialog } from '@angular/material/dialog';
import { NotificationDialogComponent, NotificationType } from 'src/app/sharedComp/notification-dialog/notification-dialog.component';

@Component({
  selector: 'app-customer-products',
  templateUrl: './customer-products.component.html',
  styleUrls: ['./customer-products.component.scss']
})
export class CustomerProductsComponent implements OnInit, AfterViewInit{

  @ViewChild('customerSearch') CustomerSearchComponent: CustomerSearchComponent | any;
  @ViewChild('agGrid', { static: true }) agGrid: AgGridAngular | any;
  
  flag: boolean = false;
  panelOpenState = false;
  customerProducts: any = [];

  rowData = [] as any;
 
  colDefs: ColDef[] = [
    { headerName: 'Product Name', field: 'productName', width: 185, resizable: true},
    { headerName: 'Short Code', field: 'shortCode', width: 115, resizable: true}
  ];

  colDefsForCustProd: ColDef[] = [
    { headerName: 'Product Name', field: 'productName', width: 185, resizable: true},
    { headerName: 'Payment', field: 'isPaymentsDone', width: 115, resizable: true},
    { headerName: 'Payment done percentage', field: 'paymentDonePrecentage', width: 115, resizable: true},
    { headerName: 'Ref No', field: 'refNu', width: 115, resizable: true},
    { headerName: 'Remark', field: 'remark', width: 115, resizable: true},
    { headerName: 'Description', field: 'description', width: 115, resizable: true},
    { headerName: 'Requested On', field: 'requestedOn', width: 115, resizable: true},
    { headerName: 'Short Code', field: 'prodShortCode', width: 115, resizable: true},
  ];

  colDefsForCustProdItems: ColDef[] = [
    { headerName: 'Item Name', field: 'itemName', width: 185, resizable: true},
    { headerName: 'Referance', field: 'refName', width: 115, resizable: true}
  ];


  prodName: any = '';
  shortCode: any = '';
  buttonText: string = 'Add Product';
  prodId: any;
  selectedCustID: any;

  prodDescription: any = '';
  remark: any = '';
  custProducts: any = [];
  allItems: any = []; //dont
  itemName: any = '';

  custProdName: any = '';
  selectedCustProdData: any;
  prodNameforItems: any = '';

  custProductsItems: any = []
  prodRefNumber: any = '';
  prodRefNumbers: any = [];

  allCustProducts: any = '';
  customerAllProducts: any[] | any;
  prodIdForGetItems: any;

  constructor(private communicationService: AppService, private extApi : ExtApiService, private dialog: MatDialog){

  }
  
  showLoader = false;
  
  handleLeftBar() {

    this.flag = !this.flag;
    
    this.communicationService.sendData({ flag: !this.flag });
  }

  async ngOnInit(): Promise<void> {
      await this.getProducts();
      await this.loadAllItems();
  }

  async ngAfterViewInit(): Promise<void> {
      await this.getAllCustomers();
  }


  async getProducts(){
    
    try {

      let allProcts = await this.extApi.getAllProducts();
      this.rowData = allProcts.data.filter((el: any) => el.status !== 1);
      
    } catch (error) {
      this.notifyMessage("Load Products", "Something went wrong while load products",NotificationType.warn)
    }
  }

  async addProducts(){
    
    if(!this.prodName && !this.shortCode){
      this.notifyMessage("Add Products", "Requested fields are missing", NotificationType.warn)
    }
    else{

      let reqFields = [
        {
          "id": "string",
          "productName": this.prodName,
          "shortCode": this.shortCode,
          "status": 0
        }
      ]
  
      try {
  
        let allProcts = await this.extApi.AddProdcut(reqFields);
        
        this.notifyMessage("Add Products", "Successfully created the product", NotificationType.success)
  
        await this.getProducts();
  
        this.prodName = ''
        this.shortCode = ''
  
      } catch (error) {
        this.notifyMessage("Add Products", "Something went wrong when creating the product",NotificationType.error)
      }
    }

  }

  async updateProducts(){
    
    if(!this.prodName && !this.shortCode){
      this.notifyMessage("Update Products", "Requested fields are missing", NotificationType.warn)
    }else{

      let reqFields = [
        {
          "id": this.prodId,
          "productName": this.prodName,
          "shortCode": this.shortCode,
          "status": 0
        }
      ]    
  
      try {
  
        let allProcts = await this.extApi.UpdateProdcut(reqFields);
        
        this.notifyMessage("Update Product", "Successfully updated the product",NotificationType.success)
        await this.getProducts();
  
        this.prodName = ''
        this.shortCode = ''
  
      } catch (error) {
        this.notifyMessage("Update Products", "Something went wrong when updating the product",NotificationType.error)
      }
    }

  }

  async removeProduct(){
    
    if(!this.prodId && !this.prodName && !this.prodName){
      this.notifyMessage("Remove Product", "Requested fields are missing", NotificationType.warn)
    }else{

          
    let reqFields = [
      {
        "id": this.prodId,
        "productName": this.prodName,
        "shortCode": this.shortCode,
        "status": 1
      }
    ]    

    try {

      let allProcts = await this.extApi.UpdateProdcut(reqFields);
      
      this.notifyMessage("Remove Product", "Successfully remove the product",NotificationType.success)
      await this.getProducts();

      this.prodName = ''
      this.shortCode = ''

    } catch (error) {
      this.notifyMessage("Remove Products", "Something went wrong when removing the product",NotificationType.error)
    }

    }

  }

  public generateUniqueCode(): any {

    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;

    for (let i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    this.shortCode = result;
  }

  onRowClicked(event: any): void { 

    this.prodName = event.data.productName;
    this.shortCode = event.data.shortCode;
    this.prodId = event.data.id;

    this.buttonText = "Update Product"
  }

  clear(){

    this.prodName = '';
    this.shortCode = '';

    this.buttonText = "Add Product"

  }

  onButtonClick(): void {
    if (this.buttonText === 'Update Product') {
      this.updateProducts();
    } else if (this.buttonText === 'Add Product') {
      this.addProducts();
    }
  }

  
  async bindCutomerData(event : any){

    this.selectedCustID = event.id;

    await this.getCustProducts();

      this.itemName = '';
      this.custProdName = '';
      this.selectedCustProdData = '';
      this.prodNameforItems = '';
      this.prodRefNumber = '';
      this.allCustProducts = '';
      this.prodIdForGetItems = '';
      this.prodName = '';
      this.shortCode = '';
      this.prodId;
      this.prodDescription = '';
      this.remark = '';

  }

  async getAllCustomers(){

    try {
      
      let result = await this.extApi.getAllCustomers();

      this.CustomerSearchComponent.showCustomers(result.data[0].filter((clNum: any) => clNum.status === 0));

    } catch (e: any) {
      console.log(e.error)
    }
  }

  
  async addCustomerProducts(){

    let reqFields = [
      {
        "id": "string", 
        "custId": this.selectedCustID || '',
        "prodShortCode": this.rowData.find((el: any) => el?.productName === this?.custProdName)?.shortCode || '',
        "refNu": "string",
        "requestedOn": "2024-07-22T17:56:43.006Z",
        "prodId": this.rowData.find((el: any) => el?.productName === this?.custProdName)?.id || '',
        "stageId": "000001",
        "description": this.prodDescription || '',
        "remark": this.remark || '',
        "isPaymentsDone": false,
        "paymentDonePrecentage": 0,
        "status": 0
      }
    ]

    if(!reqFields[0].custId && !reqFields[0].prodShortCode && !reqFields[0].prodId && !reqFields[0].description && !reqFields[0].remark){
      this.notifyMessage("Add Product (Customer)", "Requested fields are missing", NotificationType.warn)
    }else{

      try {
      
        let addCustProductRes = await this.extApi.AddCustomerProdcut(reqFields);
        
        this.notifyMessage("Add Product (Customer)", "Successfully added the product to selected customer",NotificationType.success)
  
        await this.getCustProducts();
        
        this.prodDescription = ''
        this.remark = ''

      } catch (error) {
        this.notifyMessage("Add Product (customer)", "Something went wrong when adding a product to the customer",NotificationType.error)
      }

    }

  }

  async getCustProducts(){
    
    let custProdArray: any = [];

    let reqFields = {
      "custId": this.selectedCustID,
    }

    try {

      let allCustomerProdData = await this.extApi.GetCustomerProdcut(reqFields);

      allCustomerProdData.data[0] = allCustomerProdData.data[0].filter((clNum: any) => clNum.status === 0);

      console.log(this.rowData)

      allCustomerProdData.data[0].forEach((el: any) => {
        
        if(el.status !== 1){

          custProdArray.push(
            {
              productName: this.rowData.find((elx: any) => elx.id === el.prodId).productName,
              isPaymentsDone: el.isPaymentsDone,
              paymentDonePrecentage: el.paymentDonePrecentage,
              prodShortCode: el.prodShortCode,
              refNu: el.refNu,
              remark: el.remark,
              description: el.description,
              requestedOn: el.requestedOn,
              custId: el.custId,
              id  : el.id,
              prodId: el.prodId,
              stageId: el.stageId
  
            }
          )
        }

      });

      this.customerAllProducts = [...custProdArray]

      this.custProducts = custProdArray;

      this.agGrid.api.redrawRows();
      
    } catch (error) {
      alert("error")
    }
  }

  async updateCustProducts(){

    let reqFields = [
      {
        "id": this.selectedCustProdData?.id || '',
        "custId": this.selectedCustProdData?.custId || '',
        "prodShortCode": this.selectedCustProdData?.prodShortCode || '',
        "refNu": this.selectedCustProdData?.refNu || '',
        "requestedOn": this.selectedCustProdData?.requestedOn || '',
        "prodId": this.rowData.find((el: any) => el?.productName === this?.custProdName)?.id  || '', 
        "stageId": this.selectedCustProdData?.stageId || '',
        "description": this.prodDescription || '',
        "remark": this.remark || '',
        "isPaymentsDone": this.selectedCustProdData?.isPaymentsDone || false,
        "paymentDonePrecentage": this.selectedCustProdData?.paymentDonePrecentage || 0,
        "status": 0
      }
    ]

    if(!reqFields[0].custId && !reqFields[0].prodShortCode && !reqFields[0].prodId && !reqFields[0].description && !reqFields[0].remark){
      this.notifyMessage("Update Product (Customer)", "Requested fields are missing", NotificationType.warn)
    }else{

      try {
      
        let addCustProductRes = await this.extApi.UpdateCustomerProdcut(reqFields);
        this.notifyMessage("Update Product (Customer)", "Successfully update the product of selected customer",NotificationType.success)
  
        await this.getCustProducts();
        
  
      } catch (error) {
        this.notifyMessage("Update Product (customer)", "Something went wrong when updating a product",NotificationType.error)
      }

    }
    
  }

  async removeCustProducts(){

    let reqFields = [
      {
        "id": this.selectedCustProdData?.id || '',
        "custId": this.selectedCustProdData?.custId || '',
        "prodShortCode": this.selectedCustProdData?.prodShortCode || '',
        "refNu": this.selectedCustProdData?.refNu || '',
        "requestedOn": this.selectedCustProdData?.requestedOn || '',
        "prodId": this.rowData.find((el: any) => el?.productName === this?.custProdName)?.id  || '', 
        "stageId": this.selectedCustProdData?.stageId || '',
        "description": this.prodDescription || '',
        "remark": this.remark || '',
        "isPaymentsDone": this.selectedCustProdData?.isPaymentsDone || false,
        "paymentDonePrecentage": this.selectedCustProdData?.paymentDonePrecentage || 0,
        "status": 1
      }
    ]

    
    if(!reqFields[0].custId && !reqFields[0].prodShortCode && !reqFields[0].prodId && !reqFields[0].description && !reqFields[0].remark){
      this.notifyMessage("Remove Product (Customer)", "Requested fields are missing", NotificationType.warn)
    }else{

      try {
      
        let addCustProductRes = await this.extApi.UpdateCustomerProdcut(reqFields);
        this.notifyMessage("Remove Product (Customer)", "Successfully remove the product from selected customer",NotificationType.success)
  
        await this.getCustProducts();
        
  
      } catch (error) {
        this.notifyMessage("Remove Product (Customer)", "Something went wrong when remove the product from selected customer",NotificationType.error)
      }

    }
    
  }

  selectCUstomerProduct(event: any){

    this.custProdName = event.data.productName,
    this.remark = event.data.remark,
    this.prodDescription = event.data.description; 

    this.selectedCustProdData = event.data;
  }

  async loadAllItems(){

    try {
      
      let loadedAllItems = await this.extApi.Items();

      this.allItems = loadedAllItems.data.filter((clNum: any) => clNum.status === 0);

    } catch (e: any) {
      
      console.log(e)
    }
  }

  async onProductNameChange(event: any){

    this.prodIdForGetItems = event.value;
    
    let reqFields = {
      "custId": this.selectedCustID,
      "prodId": event.value
    }

    try {

      let allCustomerProdData = await this.extApi.GetCustomerProdcut(reqFields);

      let filteredRes = allCustomerProdData.data[0].filter((clNum: any) => clNum.status === 0);

      this.prodRefNumbers = filteredRes

    }catch(e: any){
      alert("error")
    }
  }

  async updateCustomerProdItems(){

    let items = [] as any;

    let filteredProd = this.prodRefNumbers.filter((el: any) => el.refNu === this.prodRefNumber && el.status === 0)

    if(!filteredProd[0].custId && !filteredProd[0].prodId && !filteredProd[0].refNu){
      this.notifyMessage("Update Product items", "Requested fields are missing", NotificationType.warn)
    }else{

      this.custProductsItems.forEach((elx: any) => {
        
        items.push(
          {
            "id": "string",
            "custId": this.selectedCustID,
            "prodId": this.prodNameforItems,
            "refNu": this.prodRefNumber,
            "itemId": this.allItems.find((el: any) => el.itemName === elx.itemName).id,
            "status": 0
          }
        )
      });

      let reqFields = {
        "custId": this.selectedCustID,
        "prodId": this.prodNameforItems,
        "refNu": this.prodRefNumber,
        "customerProductItem": items
      }
  
      try {
  
        let res = await this.extApi.UpdateCustomerProdcutItem(reqFields)
  
        this.notifyMessage("Update Product items", "Successfully updated the product items to the selected customer",NotificationType.success)
  
        await this.getCustProdItems({
          "custId": this.selectedCustID,
          "prodId": this.prodIdForGetItems,
          "refNu" : filteredProd[0].refNu
        });
  
      } catch (error) {
        this.notifyMessage("Update Product items", "Something went wrong when updated the product items of the selected customer",NotificationType.error)
      }
    }

  }

  async getcustProd() {
    
    try {

      let reqFields = {
        "custId": this.selectedCustID,
      }
      
      let res = await this.extApi.GetCustomerProdcut(reqFields);

      let notDeleted = res.data[0].filter((clNum: any) => clNum.status === 0);

      return notDeleted
  
      
    } catch (error) {
      console.log("error")
    }
  }

  async getCustProdItems(reqFields: any = {"custId": this.selectedCustID,}) {
    
    let custProdItemArray = [] as any;

    try {
      
      let res = await this.extApi.GetCustomerProdcutItem(reqFields);

      res.data[0] = res.data[0].filter((clNum: any) => clNum.status === 0);

      res.data[0].forEach((el: any) => {
        
        custProdItemArray.push({
          'itemName' : this.allItems.find((item: any) => item.id === el.itemId).itemName,
          'refName'  : el.refNu,
          'prodName': this.rowData.find((prod: any) => prod.id).productName
        })

      });

      this.custProductsItems = custProdItemArray
      
    } catch (error) {
      console.log("error")
    }
  }


  async removeCustomerProdItems(){

    let filteredProd = this.prodRefNumbers.filter((el: any) => el.refNu === this.prodRefNumber && el.status === 0)

    if(!filteredProd[0].custId && !filteredProd[0].prodId && !filteredProd[0].refNu){
      this.notifyMessage("Remove Product items", "Requested fields are missing", NotificationType.warn)
    }else{

      let reqFields = {
        "custId": filteredProd[0].custId,
        "prodId": filteredProd[0].prodId,
        "refNu": filteredProd[0].refNu,
        "customerProductItem": [
          {
            "id": "string",
            "custId": filteredProd[0].custId,
            "prodId": filteredProd[0].prodId,
            "refNu": filteredProd[0].refNu,
            "itemId": this.allItems.find((el: any) => el.itemName === this.itemName).id,
            "status": 1
          }
        ]
      }
  
      try {
  
        let res = await this.extApi.UpdateCustomerProdcutItem(reqFields)
  
        this.notifyMessage("Remove Product items", "Successfully remove the product items from the selected customer",NotificationType.success)
  
        await this.getCustProdItems();
  
      } catch (error) {
        this.notifyMessage("Remove Product items", "Something went wrong when removing the product items from the selected customer",NotificationType.error)
      }
    }

  }
  
  async selectCUstomerProductsItems(event : any){

    this.itemName = event.data.itemName
    this.prodNameforItems = this.rowData.find((prod: any) => prod.productName).id

    await this.onProductNameChange(this.prodNameforItems);

    this.prodRefNumber = event.data.refName

  }

  private notifyMessage(title: string, message: string, notificationType: NotificationType) {

    this.dialog.open(NotificationDialogComponent, {
      width: '300px',
      data: { title, message, notificationType}
    });
  }

  async filterProdAndItems(event: any){

    console.log(this.customerAllProducts)
    // if(!this.custProducts || !this.custProducts?.length || this.custProducts.length === 0){
    //   this.notifyMessage("Filter", "Please select the customer first",NotificationType.warn)
    // }else{

      this.custProducts = this.customerAllProducts.filter((el: any) => el.prodId === event.value.id)      
    // }

  }

  async loadItemsByRefAndProd(event: any){

    if(!this.prodIdForGetItems){
      this.notifyMessage("Filter Items", "Please select product",NotificationType.warn)
    }else[

      await this.getCustProdItems({
        "custId": this.selectedCustID,
        "prodId": this.prodIdForGetItems,
        "refNu": event.value,
      })

    ]
    
  }

  addItemsToCustomerProd(){

    let items = []
    this.custProductsItems.forEach((el: any) => {
      
      items.push({
        'itemName' : el.itemName,
        'refName'  : el.refName,
        'prodName' : el.prodName
      })

    });

    items.push({
      'itemName' : this.itemName,
      'refName'  : this.prodRefNumber,
      'prodName': this.rowData.find((prod: any) => prod.id === this.prodNameforItems).productName
    })

    this.custProductsItems = items
    this.agGrid.api.redrawRows()

  }
}