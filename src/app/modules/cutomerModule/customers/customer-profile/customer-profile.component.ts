import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppService } from 'src/app/app.service';
import { ExtApiService } from 'src/app/ext-api.service';
import { NotificationDialogComponent, NotificationType } from 'src/app/sharedComp/notification-dialog/notification-dialog.component';

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
  email = ''
  verificationCode = ''
  currenrtPassword = ''
  newPassword = ''
  userName: any; 


  constructor(private communicationService: AppService, public cdr: ChangeDetectorRef, private extApi : ExtApiService, private dialog: MatDialog){
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

  async getVerificationCode(){

    if(!this.userName && !this.email){
      this.notifyMessage("Get Verification Code", "Please provide user name and email" ,NotificationType.warn)
    }else{


      let req = {
        "userName": this.userName,
        "email": this.email
      }
  
      try {
  
        let resCode = await this.extApi.RequestResetPassword(req);

        console.log(resCode)
        
      } catch (error) {
        console.log(error)
      }

    }

  }

  async updatePrivacy(){

    if(!this.verificationCode){
      this.notifyMessage("Update Password", "Please get the verification code" ,NotificationType.warn)
    }else{

      let req = {
        "userName": this.userName,
        "email": this.email,
        "password": this.newPassword,
        "token": this.verificationCode
      }

      try {
        
        let resertPassRes = await this.extApi.ResetPassword(req);

        console.log(resertPassRes);
  
        this.notifyMessage("Update Password", "Successfully reset the password" ,NotificationType.success)

      } catch (error) {
        console.log(error)
      }

    }
  }

  private notifyMessage(title: string, message: string, notificationType: NotificationType) {

    this.dialog.open(NotificationDialogComponent, {
      width: '300px',
      data: { title, message, notificationType}
    });
  }

}
