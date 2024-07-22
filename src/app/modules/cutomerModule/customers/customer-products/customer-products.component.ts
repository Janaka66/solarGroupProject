import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AppService } from 'src/app/app.service';

import { ColDef } from 'ag-grid-community'; 
import { ExtApiService } from 'src/app/ext-api.service';
import { CustomerSearchComponent } from 'src/app/sharedComp/customer-search/customer-search.component';
@Component({
  selector: 'app-customer-products',
  templateUrl: './customer-products.component.html',
  styleUrls: ['./customer-products.component.scss']
})
export class CustomerProductsComponent implements OnInit, AfterViewInit{

  @ViewChild('customerSearch') CustomerSearchComponent: CustomerSearchComponent | any;
  
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
    { headerName: 'Short Code', field: 'shortCode', width: 115, resizable: true}
  ];

  prodName: any = '';
  shortCode: any = '';
  buttonText: string = 'Add Product';
  prodId: any;
  selectedCustID: any;

  prodDescription: any = '';
  remark: any = '';
  custProducts: any = [];
  allItems: any = [];
  itemName: any = '';

  constructor(private communicationService: AppService, private extApi : ExtApiService){

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
      alert("error")
    }
  }

  async addProducts(){
    
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
      
      alert('successfully added')
      await this.getProducts();

      this.clear();

    } catch (error) {
      alert("error")
    }
  }

  async updateProducts(){
    
    let reqFields = [
      {
        "id": "string",
        "productName": this.prodName,
        "shortCode": this.shortCode,
        "status": 0
      }
    ]    

    try {

      let allProcts = await this.extApi.UpdateProdcut(reqFields);
      
      alert('successfully Updated')
      await this.getProducts();

      this.clear();

    } catch (error) {
      alert("error")
    }
  }

  async removeProduct(){
    
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
      
      alert('successfully Removed')
      await this.getProducts();

      this.clear();

    } catch (error) {
      alert("error")
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

  
  bindCutomerData(event : any){

    this.selectedCustID = event.id;

  }

  async getAllCustomers(){

    try {
      
      let result = await this.extApi.getAllCustomers();
      this.CustomerSearchComponent.showCustomers(result.data[0]);

    } catch (e: any) {
      console.log(e.error)
    }
  }

  
  async addCustomerProducts(){
debugger
    let reqFields = [
      {
        "id": "string",
        "custId": "string",
        "prodShortCode": this.rowData.find((el: any) => el.productName === this.prodName).shortCode,
        "refNu": "string",
        "requestedOn": "2024-07-22T17:56:43.006Z",
        "prodId": this.rowData.find((el: any) => el.productName === this.prodName).id,
        "stageId": "string",
        "description": this.prodDescription,
        "remark": this.remark,
        "isPaymentsDone": false,
        "paymentDonePrecentage": 0,
        "status": 0
      }
    ]

    try {
      
      let addCustProductRes = await this.extApi.AddCustomerProdcut(reqFields);
      alert("successfull");

      await this.getCustProducts();
      

    } catch (error) {
      alert("error")
    }
  }

  async getCustProducts(){
    debugger
    let reqFields = {
      "custId": this.selectedCustID,
    }

    try {

      let allCustomerProdData = await this.extApi.GetCustomerProdcut(reqFields);
      this.custProducts = allCustomerProdData.data;
      
    } catch (error) {
      alert("error")
    }
  }

  async updateCustProducts(){
    
    let reqFields = [
      {
        "id": "string",
        "custId": "string",
        "prodShortCode": "string",
        "refNu": "string",
        "requestedOn": "2024-07-22T23:04:50.019Z",
        "prodId": "string",
        "stageId": "string",
        "description": "string",
        "remark": "string",
        "isPaymentsDone": false,
        "paymentDonePrecentage": 0,
        "status": 0
      }
    ]

    
    try {
      
      let addCustProductRes = await this.extApi.UpdateCustomerProdcut(reqFields);
      alert("successfull");

      await this.getCustProducts();
      

    } catch (error) {
      alert("error")
    }
  }

  async removeCustProducts(){

    let reqFields = [
      {
        "id": "string",
        "custId": "string",
        "prodShortCode": "string",
        "refNu": "string",
        "requestedOn": "2024-07-22T23:04:50.019Z",
        "prodId": "string",
        "stageId": "string",
        "description": "string",
        "remark": "string",
        "isPaymentsDone": false,
        "paymentDonePrecentage": 0,
        "status": 1
      }
    ]

    
    try {
      
      let addCustProductRes = await this.extApi.UpdateCustomerProdcut(reqFields);
      alert("successfull");

      await this.getCustProducts();
      

    } catch (error) {
      alert("error")
    }
  }

  selectCUstomerProduct(event: any){

  }

  async loadAllItems(){
    
    try {
      
      let loadedAllItems = await this.extApi.Items();
      this.allItems = loadedAllItems.data;

    } catch (e: any) {
      
      console.log(e)
    }
  }

  async updateCustomerProdItems(){

    let reqFields = {
      "custId": this.selectedCustID,
      "prodId": this.rowData.find((el: any) => el.productName === this.prodName).id,
      "customerProductItem": [
        {
          "id": "string",
          "custId": this.selectedCustID,
          "prodId": this.rowData.find((el: any) => el.productName === this.prodName).id,
          "itemId": this.allItems.find((el: any) => el.itemName === this.itemName).id,
          "status": 0
        }
      ]
    }

    try {

      let res = await this.extApi.UpdateCustomerProdcutItem(reqFields)
      
    } catch (error) {
      alert("error")
    }
  }

  async removeCustomerProdItems(){

    let reqFields = {
      "custId": this.selectedCustID,
      "prodId": this.rowData.find((el: any) => el.productName === this.prodName).id,
      "customerProductItem": [
        {
          "id": "string",
          "custId": this.selectedCustID,
          "prodId": this.rowData.find((el: any) => el.productName === this.prodName).id,
          "itemId": this.allItems.find((el: any) => el.itemName === this.itemName).id,
          "status": 1
        }
      ]
    }

    try {

      let res = await this.extApi.UpdateCustomerProdcutItem(reqFields)
      
    } catch (error) {
      alert("error")
    }

  }
  

}
