import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';

import { ColDef } from 'ag-grid-community'; 
import { ExtApiService } from 'src/app/ext-api.service';
@Component({
  selector: 'app-customer-products',
  templateUrl: './customer-products.component.html',
  styleUrls: ['./customer-products.component.scss']
})
export class CustomerProductsComponent implements OnInit{

  flag: boolean = false;
  panelOpenState = false;
  customerProducts: any = [];

  rowData = [];
 
  colDefs: ColDef[] = [
    { headerName: 'Product Name', field: 'productName', width: 185, resizable: true},
    { headerName: 'Short Code', field: 'shortCode', width: 115, resizable: true}
  ];

  prodName: any = '';
  shortCode: any = '';
  buttonText: string = 'Add Product';
  prodId: any;

  constructor(private communicationService: AppService, private extApi : ExtApiService){

  }
  
  showLoader = false;
  
  handleLeftBar() {

    this.flag = !this.flag;
    
    this.communicationService.sendData({ flag: !this.flag });
  }

  ngOnInit(): void {
      this.getProducts()
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

}
