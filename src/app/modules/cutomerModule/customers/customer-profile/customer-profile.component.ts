import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppService } from 'src/app/app.service';
import { ExtApiService } from 'src/app/ext-api.service';
import { EmployeeSearchComponent } from 'src/app/sharedComp/employee-search/employee-search.component';
import { NotificationDialogComponent, NotificationType } from 'src/app/sharedComp/notification-dialog/notification-dialog.component';

@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.scss']
})
export class CustomerProfileComponent implements OnInit, AfterViewInit {

  @ViewChild('printArea') printArea: ElementRef | any;
  @ViewChild('employeeSearch') EmployeeSearchComponent: EmployeeSearchComponent | any;
  
  flag: boolean = false;
  panelOpenState = false;

  accountSettingAvailable : boolean = true;
  securitySettingAvailable : boolean = false;
  regsterUserAvailable : boolean = false;
  enableIcons: boolean = false;
  email = ''
  verificationCode = ''
  currenrtPassword = ''
  newPassword = ''
  userName: any; 
  displayName: any = ''
  userNameForRegister: any = '';
  emailForRegUser: any = '';
  phoneNmberForRegUser: any = '';
  newPasswordForRegUser: any = '';
  selectedUserMode: any = '';
  allUserMods = [] as any;
  componant = 'inqComp'; 
  selectedEmployeeForRegUser: any = '';
  allEmployees: any;
  allUsers : any = [];

  constructor(private communicationService: AppService, public cdr: ChangeDetectorRef, private extApi : ExtApiService, private dialog: MatDialog){
    window.onresize = this.enableButtonsDependOnScreenSize.bind(this);
  }

  ngOnInit(): void {
      
  }

  async ngAfterViewInit(): Promise<void> {
  
    await this.loaAllprofiles();
  }

  handleLeftBar() {

    this.flag = !this.flag;
    
    this.communicationService.sendData({ flag: !this.flag });
  }

  async changeUserProfileView(eventName: any){

    if(eventName === 'account-settings'){

      this.accountSettingAvailable = true;
      this.securitySettingAvailable  = false;
      this.regsterUserAvailable = false;

      await this.getUserByMode();
      await this.getAllEmployees();

    }else if(eventName === 'security-settings'){

      this.securitySettingAvailable  = true;
      this.accountSettingAvailable = false;
      this.regsterUserAvailable = false;
    }
    else if(eventName === 'user-register'){
      this.regsterUserAvailable = true;
      this.accountSettingAvailable = false;
      this.securitySettingAvailable  = false;

      await this.getAllEmployees();
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

  async loaAllprofiles(){
        try {
          
          let profiles = await this.extApi.GetUserMode();
          this.allUserMods = profiles.data.filter((el: any) => el.status === 0);
    
        } catch (e: any) {
          
          console.log(e)
        }
      }
  
    emailVerifications(){

      const email = this.emailForRegUser.toLowerCase();
      const emailRegex = /^[^\s@]+@[^\s@]+$/;
      const containsGmail = email.endsWith('@gmail.com');
      const symbolsRegex = /[!#$%^&*(),?":{}|<>]/; 
  
      if (!emailRegex.test(this.emailForRegUser) || !containsGmail || symbolsRegex.test(this.emailForRegUser)) {
        this.notifyMessage("Add phone email", "Invalid email address" ,NotificationType.warn)
        return
      }else{
        return false
      }
    }

    async register(){
 

      if(!this.displayName || !this.selectedEmployeeForRegUser || !this.userNameForRegister || !this.emailForRegUser || !this.selectedUserMode || !this.phoneNmberForRegUser){

        this.notifyMessage("Register User", "Requested fields are missing" ,NotificationType.warn);
      }
      
      let reqFields = [
        {
          "id": "string",
          "dispname": this.displayName,
          "regID": this.selectedEmployeeForRegUser,
          "userName": this.userNameForRegister,
          "email": this.emailForRegUser,
          "passwordHash": this.newPasswordForRegUser,
          "phoneNumber": this.phoneNmberForRegUser,
          "userModeId": this.selectedUserMode
        }
      ]
      
      let isVerifiedEMail = this.emailVerifications();

      if(!isVerifiedEMail){

        try {

          let regUserRes = await this.extApi.RegisterUsers(reqFields);
          this.notifyMessage("Register User", "Successfully registered" ,NotificationType.success);
          this.clear();
          
        } catch (error: any) {
          this.notifyMessage("Register User", error.error.errors.errors[0].description ,NotificationType.success)
        }

      }
    }
      
    async getAllEmployees(){

      try {

        let res = await this.extApi.GetEmployee();

        this.allEmployees = res.data;

        console.log(res.data)
        
      } catch (error) {
        console.log(error)
      }

    }

    async getUserByMode(){

        this.allUsers = [];
  
        try {
  
          let res = await this.extApi.GetUsers();
          this.allUsers = res.data

          console.log(this.allUsers)
          

        } catch (error) {
          console.log(error)
        }

    }


    async updateUser(){
      
      let reqFields = 
        {
          "id": "string",
          "dispname": this.displayName,
          "regID": this.selectedEmployeeForRegUser,
          "userName": this.userNameForRegister,
          "email": this.emailForRegUser,
          "passwordHash": this.newPasswordForRegUser || 'string',
          "phoneNumber": this.phoneNmberForRegUser,
          "userModeId": this.selectedUserMode
        }
      
      

        try {

         let regUserRes = await this.extApi.UpdateUsers(reqFields);
          this.notifyMessage("Register User", "Successfully registered" ,NotificationType.success);
          this.clear();
          
        } catch (error: any) {
          this.notifyMessage("Register User", error.error.errors.errors[0].description ,NotificationType.success)
        }

    }


    clear(){

      this.userNameForRegister = '';
      this.emailForRegUser = '';
      this.phoneNmberForRegUser = '';
      this.newPasswordForRegUser = '';
      this.selectedUserMode = '';
      this.selectedEmployeeForRegUser = ''
      this.allUsers = [];
      this.displayName = '';

    }

    loadUserData(user: any) {
      this.displayName = user.dispname;
      this.userNameForRegister = user.userName;
      this.emailForRegUser = user.email;
      this.phoneNmberForRegUser = user.phoneNumber;
      this.selectedUserMode = user.userModeId;
      this.selectedEmployeeForRegUser = user.regID
    }

  private notifyMessage(title: string, message: string, notificationType: NotificationType) {

    this.dialog.open(NotificationDialogComponent, {
      width: '300px',
      data: { title, message, notificationType}
    });
  }

}
