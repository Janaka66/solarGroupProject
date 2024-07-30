import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ExtApiService } from 'src/app/ext-api.service';

@Component({
  selector: 'app-employee-search',
  templateUrl: './employee-search.component.html',
  styleUrls: ['./employee-search.component.scss']
})
export class EmployeeSearchComponent implements OnInit, AfterViewInit {

  @Output() selectedEmployeeData : EventEmitter<any> = new EventEmitter();
  @Output() removeEmployeeEvent : EventEmitter<any> = new EventEmitter();
  @Output() selectEmpInq : EventEmitter<any> = new EventEmitter();
  @Input() compName : any;

  searchResult : any;
  selectedSearchRes: any;

  constructor(private extApi: ExtApiService){

  }

  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {

  }

  showEmployees(employees: any){
    debugger
    this.searchResult =  employees

    console.log('========show emp=========')
    console.log(this.searchResult)
  }

  sendSelectedData(selectedData:any, event: any){

    this.selectedEmployeeData.emit(selectedData);

    this.selectedSearchRes = selectedData;
  }

  selectEmpForInquiries(selectedData:any, event: any){
debugger
    this.selectEmpInq.emit({selectedData: selectedData, checked: event.target.checked});

  }

  async removeEmployee(employeeData: any){

    this.removeEmployeeEvent.emit(employeeData);
    
  }

}
