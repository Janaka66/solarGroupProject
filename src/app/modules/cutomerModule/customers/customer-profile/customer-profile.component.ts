import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.scss']
})
export class CustomerProfileComponent {

  @ViewChild('printArea') printArea: ElementRef | any;
  
  flag: boolean = false;
  panelOpenState = false;

  accountSettingAvailable : boolean = true;
  securitySettingAvailable : boolean = false;
  enableIcons: boolean = false;
  
  constructor(private communicationService: AppService, public cdr: ChangeDetectorRef){
    window.onresize = this.enableButtonsDependOnScreenSize.bind(this);
  }

  handleLeftBar() {

    this.flag = !this.flag;
    
    this.communicationService.sendData({ flag: !this.flag });
  }

  changeUserProfileView(eventName: any){

    if(eventName === 'account-settings'){

      this.accountSettingAvailable = true;
      this.securitySettingAvailable  = false;

    }else if(eventName === 'security-settings'){

      this.securitySettingAvailable  = true;
      this.accountSettingAvailable = false;
    }

  }

  enableButtonsDependOnScreenSize(event : any){
    
    if(event.currentTarget.innerWidth <= 780){
      this.enableIcons = true;
      console.log('true')
    }else{
      this.enableIcons = false;
      console.log('false')
    }

    this.cdr.detectChanges()
  }
}
