import { AfterViewInit, ChangeDetectorRef, Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { AppService } from '../app.service';
import { Subscription } from 'rxjs';
import { SliderWindowComponent } from '../slider-window/slider-window.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit{

    @ViewChild('sliderWindow') SliderWindowComponent: SliderWindowComponent | any;
    
    flag: boolean = false;

    subscription: Subscription;

    duePayments = [
        { id: '000001', custId: '000001', amount: 500 },
        // Add more dummy data or fetch from your service
      ];
    
      complaints = [
        {
          compId: '000001',
          custId: '000001',
          cfTypeId: '000010',
          complainedAt: '2024-06-28T05:11:49.4261945',
          completedAt: '2024-07-17T08:40:05.44278',
          cfStatusId: '000002',
          description: 'stringxxxxxxxxxx',
          isHandled: true,
          status: 0
        },
        // Add more dummy data or fetch from your service
      ];
    
      inquiries = [
        {
          cInqId: '000001',
          custId: '000001',
          cfTypeId: '000007',
          cfStatusId: '000001',
          inquiryAddeddAt: '2024-07-15T18:04:23.071',
          rejectedAt: '2024-07-17T07:56:49.9674647',
          completedAt: '2024-07-23T14:46:31.0469596',
          description: 'string',
          isrejected: false,
          isAccepted: true,
          rejectedBy: '000001',
          status: 0
        },
        // Add more dummy data or fetch from your service
      ];
    
    
  constructor(private communicationService: AppService, private cdr: ChangeDetectorRef){

    this.subscription = this.communicationService.data$.subscribe((data: any) => {
        
        if(data === 'slider')
            this.SliderWindowComponent.sliderEnableDisable({width: 100, height: 780});
 
    });
  }

    ngAfterViewInit(): void {
        this.cdr.detectChanges();
    }
  
    ngOnInit(){

    }

    handleLeftBar() {
        
        this.communicationService.sendData({ flag: false });
    }

}
