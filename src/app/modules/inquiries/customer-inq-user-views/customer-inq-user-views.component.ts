import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';
import { AppService } from 'src/app/app.service';
import { ExtApiService } from 'src/app/ext-api.service';
import { NotificationDialogComponent, NotificationType } from 'src/app/sharedComp/notification-dialog/notification-dialog.component';

@Component({
  selector: 'app-customer-inq-user-views',
  templateUrl: './customer-inq-user-views.component.html',
  styleUrls: ['./customer-inq-user-views.component.scss']
})
export class CustomerInqUserViewsComponent implements OnInit, AfterViewInit{

  @Input() inquiries = [] as any;

  @Input() isAdmin = true;
  flag: boolean = false;

  constructor(private communicationService: AppService, private extApi : ExtApiService, private dialog: MatDialog ){

  }


  ngOnInit(): void {
      
  }

  async ngAfterViewInit(): Promise<void> {
      debugger
    await this.GetEmployeeAssignedInquiries();
  }
  
  acceptInquiry(inquiry: any) {
 
    inquiry.inqisAccepted = true;
    inquiry.inqisrejected = false;

    inquiry.isAccepted = true;
    inquiry.isRejected = false;
  }

  rejectInquiry(inquiry: any) {

    inquiry.isAccepted = false;
    inquiry.isRejected = true;

    inquiry.isAccepted = false;
    inquiry.inqisrejected = true;
    
  }

  handleLeftBar() {

    this.flag = !this.flag;
    
    this.communicationService.sendData({ flag: !this.flag });
  }

  async GetEmployeeAssignedInquiries(){

    this.inquiries = [];

    try {
      
      let result = await this.extApi.GetEmployeeAssignedInquiries()
      result.data.forEach((el:any) => {
        
        this.inquiries.push({
          "addedAt": el.addedAt,
          "adminNotes": el.adminNotes,
          "cihempId": el.cihempId,
          "completedAt": el.completedAt,
          "custName": el.custName,
          "custId": el.custId,
          "employeeNotes": el.employeeNotes,
          "empId": el.empId,
          "inqId": el.inqId,
          "isAccepted": el.isAccepted,
          "isRejected": el.isRejected,
          "rejectedAt": el.rejectedAt,
          "cInqId": el.customerInquiry.cInqId,
          "cfStatusId": el.customerInquiry.cfStatusId,
          "cfTypeId": el.customerInquiry.cfTypeId,
          "inqcompletedAt": moment(el.customerInquiry.completedAt).format('YYYY-MM-DD'),
          "inqinqcustId": el.customerInquiry.inqcustId,
          "inqdescription": el.customerInquiry.description,
          "inqiquiryAddeddAt": moment( el.customerInquiry.iquiryAddeddAt).format('YYYY-MM-DD'),
          "inqisAccepted": el.customerInquiry.isAccepted,
          "inqisrejected": el.customerInquiry.isrejected,
          "inqrejectedAt": moment(el.customerInquiry.rejectedAt).format('YYYY-MM-DD'),
          "inqrejectedBy": el.customerInquiry.rejectedBy,
          "dispName": el.customerProfile.dispName,
          "status": 0
        })

      });

      console.log(this.inquiries)

    } catch (error) {
      console.log(error)
    }
  }

  async update(inq: any){
debugger
    let reqFields = [{
      "cihempId": inq.cihempId,
      "custId": inq.custId,
      "custName": inq.dispName,
      "inqId": inq.inqId,
      "empId": inq.empId,
      "addedAt": inq.addedAt,
      "rejectedAt": inq.rejectedAt,
      "completedAt": inq.completedAt,
      "adminNotes": inq.adminNotes,
      "employeeNotes": inq.employeeNotes,
      "isRejected": inq.inqisrejected,
      "isAccepted": inq.inqisAccepted,
      "status": 0,
    }]

    try {
      
      let result = await this.extApi.GetEmployeeAssignedInquiries(reqFields);

      console.log(result)

      this.notifyMessage("Update Inquiry", "Successfully Updated" ,NotificationType.success)

      await this.GetEmployeeAssignedInquiries();
      
    } catch (error) {
      console.log(error)
    }
  }

  private notifyMessage(title: string, message: string, notificationType: NotificationType) {

    this.dialog.open(NotificationDialogComponent, {
      width: '300px',
      data: { title, message, notificationType}
    });
  }
}
