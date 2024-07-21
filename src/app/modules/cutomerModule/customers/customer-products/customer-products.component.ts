import { Component } from '@angular/core';
import { AppService } from 'src/app/app.service';

import { ColDef } from 'ag-grid-community'; 

@Component({
  selector: 'app-customer-products',
  templateUrl: './customer-products.component.html',
  styleUrls: ['./customer-products.component.scss']
})
export class CustomerProductsComponent {

  flag: boolean = false;
  panelOpenState = false;
  
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

  constructor(private communicationService: AppService){

  }
  
  showLoader = false;
  
  handleLeftBar() {

    this.flag = !this.flag;
    
    this.communicationService.sendData({ flag: !this.flag });
  }



}
