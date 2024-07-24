import { Component, Input } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-customer-complain-user-view',
  templateUrl: './customer-complain-user-view.component.html',
  styleUrls: ['./customer-complain-user-view.component.scss']
})
export class CustomerComplainUserViewComponent {

  
  @Input() complaints = [
    {
      complainedAt: '2024-06-28T00:43:42.173104',
      completedAt: '2024-07-16T23:19:08.0444592',
      description: 'Complaint 1 description',
      isHandled: false,
      customers: [
        { name: 'Customer 1', email: 'customer1@example.com' },
        { name: 'Customer 2', email: 'customer2@example.com' }
      ]
    },
    {
      complainedAt: '2024-07-01T11:23:42.173104',
      completedAt: '2024-07-20T16:19:08.0444592',
      description: 'Complaint 2 description',
      isHandled: false,
      customers: [
        { name: 'Customer 1', email: 'customer1@example.com' },
        { name: 'Customer 2', email: 'customer2@example.com' }
      ]
    },
    {
      complainedAt: '2024-06-28T00:43:42.173104',
      completedAt: '2024-07-16T23:19:08.0444592',
      description: 'Complaint 1 description',
      isHandled: false,
      customers: [
        { name: 'Customer 1', email: 'customer1@example.com' },
        { name: 'Customer 2', email: 'customer2@example.com' }
      ]
    },
    {
      complainedAt: '2024-07-01T11:23:42.173104',
      completedAt: '2024-07-20T16:19:08.0444592',
      description: 'Complaint 2 description',
      isHandled: false,
      customers: [
        { name: 'Customer 1', email: 'customer1@example.com' },
        { name: 'Customer 2', email: 'customer2@example.com' }
      ]
    },
    {
      complainedAt: '2024-06-28T00:43:42.173104',
      completedAt: '2024-07-16T23:19:08.0444592',
      description: 'Complaint 1 description',
      isHandled: false,
      customers: [
        { name: 'Customer 1', email: 'customer1@example.com' },
        { name: 'Customer 2', email: 'customer2@example.com' },
        { name: 'Customer 1', email: 'customer1@example.com' },
        { name: 'Customer 2', email: 'customer2@example.com' },
        { name: 'Customer 1', email: 'customer1@example.com' },
        { name: 'Customer 2', email: 'customer2@example.com' },
        { name: 'Customer 1', email: 'customer1@example.com' },
        { name: 'Customer 2', email: 'customer2@example.com' }
      ]
    },
    {
      complainedAt: '2024-07-01T11:23:42.173104',
      completedAt: '2024-07-20T16:19:08.0444592',
      description: 'Complaint 2 description',
      isHandled: false,
      customers: [
        { name: 'Customer 1', email: 'customer1@example.com' },
        { name: 'Customer 2', email: 'customer2@example.com' }
      ]
    }
    
  ];
  
  @Input() isAdmin = true;
  flag: boolean = false;

  constructor(private communicationService: AppService ){

  }
  
  approveComplaint(complaint: any) {
  
    complaint.isHandled = true;
    console.log(`Approved complaint: ${complaint.description}`);
  }

  rejectComplaint(complaint: any) {
  
    complaint.isHandled = false;
    console.log(`Rejected complaint: ${complaint.description}`);
  }

  handleLeftBar() {

    this.flag = !this.flag;
    
    this.communicationService.sendData({ flag: !this.flag });
  }
}
