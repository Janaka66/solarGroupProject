import { Component, Input } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-customer-inq-user-views',
  templateUrl: './customer-inq-user-views.component.html',
  styleUrls: ['./customer-inq-user-views.component.scss']
})
export class CustomerInqUserViewsComponent {

  @Input() inquiries = [
    {
      iquiryAddeddAt: '2024-07-15T18:04:23.071',
      rejectedAt: '2024-07-17T07:56:49.9674647',
      completedAt: '2024-07-23T14:46:31.0469596',
      description: 'Inquiry 1 description',
      isrejected: false,
      isAccepted: true,
      rejectedBy: '000001',
      employees: [
        { name: 'Employee 1', email: 'employee1@example.com' },
        { name: 'Employee 2', email: 'employee2@example.com' }
      ]
    },
    {
      iquiryAddeddAt: '2024-07-20T10:30:23.071',
      rejectedAt: null,
      completedAt: null,
      description: 'Inquiry 2 description',
      isrejected: false,
      isAccepted: false,
      rejectedBy: null,
      employees: [
        { name: 'Employee 3', email: 'employee3@example.com' },
        { name: 'Employee 4', email: 'employee4@example.com' }
      ]
    }

  ];

  @Input() isAdmin = true;
  flag: boolean = false;

  constructor(private communicationService: AppService ){

  }
  
  acceptInquiry(inquiry: any) {
 
    inquiry.isAccepted = true;
    inquiry.isrejected = false;
    inquiry.rejectedBy = null;
  }

  rejectInquiry(inquiry: any) {

    inquiry.isAccepted = false;
    inquiry.isrejected = true;
    inquiry.rejectedBy = 'Current Admin ID'; 
  }

  handleLeftBar() {

    this.flag = !this.flag;
    
    this.communicationService.sendData({ flag: !this.flag });
  }
}
