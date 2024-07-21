import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-customer-search',
  templateUrl: './customer-search.component.html',
  styleUrls: ['./customer-search.component.scss']
})
export class CustomerSearchComponent implements OnInit, AfterViewInit {

  @Output() selcetedCustomerData : EventEmitter<any> = new EventEmitter();
  
  searchResult : any;
  selectedSearchRes: any;

  constructor(){

  }

  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {

  }

  showCustomers(customers: any){
    
    this.searchResult =  customers
  }

  sendSelectedData(selectedData:any, event: any){

    this.selcetedCustomerData.emit(selectedData);

    this.selectedSearchRes = selectedData;
  }

}
