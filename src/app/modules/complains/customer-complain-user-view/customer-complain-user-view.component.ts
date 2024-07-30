import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';
import { AppService } from 'src/app/app.service';
import { ExtApiService } from 'src/app/ext-api.service';
import { NotificationDialogComponent, NotificationType } from 'src/app/sharedComp/notification-dialog/notification-dialog.component';

@Component({
  selector: 'app-customer-complain-user-view',
  templateUrl: './customer-complain-user-view.component.html',
  styleUrls: ['./customer-complain-user-view.component.scss']
})
export class CustomerComplainUserViewComponent implements OnInit, AfterViewInit{

  
  allCustomerInqs = [] as any
  
  @Input() isAdmin = true;
  flag: boolean = false;
  employeCompNote: any = '';

  constructor(private communicationService: AppService, private extApi : ExtApiService , private dialog: MatDialog){

  }

  ngOnInit(): void {
      
  }

  async ngAfterViewInit(): Promise<void> {
      debugger
    await this.GetEmployeeAssignedComplains();
  }
  
  approveComplaint(complaint: any) {
  debugger
    complaint.isHandled = true;
    complaint.comisHandled = true;
  }

  rejectComplaint(complaint: any) {
  debugger
    complaint.isHandled = false;
    complaint.comisHandled = false;
  }

  handleLeftBar() {

    this.flag = !this.flag;
    
    this.communicationService.sendData({ flag: !this.flag });
  }

  async GetEmployeeAssignedComplains(){

    this.allCustomerInqs = [];
    
    try {
      
      let result = await this.extApi.GetEmployeeAssignedComplains()
      result.data.forEach((el:any) => {
        
        this.allCustomerInqs.push({
          "addedAt": el.addedAt,
          "adminNotes": el.adminNotes,
          "ccheid": el.ccheid,
          "ccid": el.ccid,
          "completedAt": el.completedAt,
          "custId": el.custId,
          "employeeNotes": el.employeeNotes,
          "empID": el.empID,
          "isHandled": el.isHandled,
          "comcfStatusId": el.customerComplain.cfStatusId,
          "comcfTypeId": el.customerComplain.compId,
          "comcompId": el.customerComplain.compId,
          "comcomplainedAt": moment(el.customerComplain.complainedAt).format('YYYY-MM-DD'),
          "comcompletedAt": moment( el.customerComplain.completedAt).format('YYYY-MM-DD'),
          "comcustId": el.customerComplain.custId, 
          "description": el.customerComplain.description,
          "comisHandled": el.customerComplain.isHandled,
          "comDisplayName": el.customerProfile.dispName,
          "status": 0
        })

      });

      console.log(this.allCustomerInqs)

    } catch (error) {
      console.log(error)
    }
  }

  async update(com: any){
    debugger

    console.log(com)

    let reqFields = [{
      "ccheid": com.ccheid,
      "custId": com.custId,
      "ccid": com.ccid,
      "empID": com.empID,
      "addedAt": com.addedAt,
      "completedAt": com.completedAt,
      "isHandled": com.isHandled,
      "adminNotes": com.adminNotes,
      "employeeNotes": com.employeeNotes,
      "status": 6,
    }]

    try {
      
      let result = await this.extApi.UpdateEmployeeAssignedComplain(reqFields);

      console.log(result)

      this.notifyMessage("Update Inquiry", "Successfully Updated" ,NotificationType.success)

      await this.GetEmployeeAssignedComplains();
      
    } catch (error) {
      console.log(error)
    }
  }

  onEmployeeNotesChange(complaint: any, newNotes: string) {
    complaint.employeeNotes = newNotes;
  }

  private notifyMessage(title: string, message: string, notificationType: NotificationType) {

    this.dialog.open(NotificationDialogComponent, {
      width: '300px',
      data: { title, message, notificationType}
    });
  }
}
