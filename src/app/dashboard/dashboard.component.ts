import { AfterViewInit, ChangeDetectorRef, Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { AppService } from '../app.service';
import { Subscription } from 'rxjs';
import { SliderWindowComponent } from '../slider-window/slider-window.component';
import { ExtApiService } from '../ext-api.service';
import * as moment from 'moment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit{

    @ViewChild('sliderWindow') SliderWindowComponent: SliderWindowComponent | any;
    
    flag: boolean = false;

    subscription: Subscription;
    
      inquiries = []
    
      complaints = []
    
      duePayments = [];

      displayedColumnsInquiries: string[] = ['cInqId', 'description', 'iquiryAddeddAt', 'completedAt', 'dispName', 'isAccepted'];
      displayedColumnsComplaints: string[] = ['compId', 'complainedAt', 'completedAt','dispName', 'description', 'isHandled', ];
      displayedColumnsDuePayments: string[] = ['id', 'dueFrom','duePayment','isCleared', 'isMessageSent','dispName','productName'];
      
    
  constructor(private communicationService: AppService, private cdr: ChangeDetectorRef, private extApi: ExtApiService){

    this.subscription = this.communicationService.data$.subscribe((data: any) => {
        
        if(data === 'slider')
            this.SliderWindowComponent.sliderEnableDisable({width: 100, height: 780});
 
    });
  }

    async ngAfterViewInit(): Promise<void> {
        this.cdr.detectChanges();

        await this.GetCustomerInquiry()
        await this.GetCustomerCompalin()
        await this.GetCustDuePayments()
    }
  
    ngOnInit(){

    }

    handleLeftBar() {
        
        this.communicationService.sendData({ flag: false });
    }



    async GetCustomerInquiry(){
debugger
      try {

        let inqForDash = await this.extApi.GetCustomerInquiry()
        console.log(inqForDash)

        inqForDash.data.forEach((el: any) => {
        
          el.dispName = el.customerProfile.dispName
          el.iquiryAddeddAt = moment(el.iquiryAddeddAt).format('YYYY-MM-DD')
          el.completedAt = moment(el.completedAt).format('YYYY-MM-DD')
        });

        this.inquiries = inqForDash.data
        
      } catch (error) {
        
      }
    }

    async GetCustomerCompalin(){
      
      try {
        
        let complForDash = await this.extApi.GetCustomerCompalin()
        console.log(complForDash)
        
        
        complForDash.data.forEach((el: any) => {
        
          el.dispName = el.customerProfile.dispName
          el.iquiryAddeddAt = moment(el.complainedAt).format('YYYY-MM-DD')
          el.completedAt = moment(el.completedAt).format('YYYY-MM-DD')
        });
   
        this.complaints = complForDash.data
  

      } catch (error) {
        
      }

    }

    async GetCustDuePayments(){
      
      try {
        
        let dueForDash = await this.extApi.GetCustDuePayments()
        console.log(dueForDash)

        dueForDash.data.forEach((el: any) => {
        
          el.dispName = el.customerProfile.dispName
          el.dueFrom = moment(el.dueFrom).format('YYYY-MM-DD')
          el.completedAt = moment(el.completedAt).format('YYYY-MM-DD')
          el.productName = el.product.productName
        });

        this.duePayments = dueForDash.data

      } catch (error) {
        
      }

    }

}
