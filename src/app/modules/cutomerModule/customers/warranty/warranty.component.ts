import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { ExtApiService } from 'src/app/ext-api.service';
import { CommonLoaderComponent } from 'src/app/sharedComp/common-loader/common-loader.component';
import { EmployeeSearchComponent } from 'src/app/sharedComp/employee-search/employee-search.component';

@Component({
  selector: 'app-warranty',
  templateUrl: './warranty.component.html',
  styleUrls: ['./warranty.component.scss']
})
export class WarrantyComponent implements OnInit , AfterViewInit {

  @ViewChild('loader') CommonLoaderComponent: CommonLoaderComponent | any;
  @ViewChild('employeeSearch') EmployeeSearchComponent: EmployeeSearchComponent | any;
  
  flag: boolean = false;

  constructor(private communicationService: AppService, private extApi : ExtApiService){
    
  }
  handleLeftBar() {

    this.flag = !this.flag;
    
    this.communicationService.sendData({ flag: !this.flag });
  }

  ngOnInit(): void {
    
  }
  async ngAfterViewInit(): Promise<void> {
   
    await this.getAllemployees();
  }

  async getAllemployees(){

    try {
      
      let result = await this.extApi.GetEmployee();

      this.EmployeeSearchComponent.showEmployees(result.data);

    } catch (e: any) {
      console.log(e.error)
    }
  }

  async bindEmployeeData(empData :any){
   
    
  }
}
