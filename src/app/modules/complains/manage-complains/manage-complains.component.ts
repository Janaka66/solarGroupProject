import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';
import { AppService } from 'src/app/app.service';
import { ExtApiService } from 'src/app/ext-api.service';
import { CommonLoaderComponent } from 'src/app/sharedComp/common-loader/common-loader.component';
import { CustomerSearchComponent } from 'src/app/sharedComp/customer-search/customer-search.component';
import { EmployeeSearchComponent } from 'src/app/sharedComp/employee-search/employee-search.component';
import { NotificationDialogComponent, NotificationType } from 'src/app/sharedComp/notification-dialog/notification-dialog.component';

@Component({
  selector: 'app-manage-complains',
  templateUrl: './manage-complains.component.html',
  styleUrls: ['./manage-complains.component.scss']
})
export class ManageComplainsComponent implements OnInit, AfterViewInit{

  
  @ViewChild('employeeSearch') EmployeeSearchComponent: EmployeeSearchComponent | any;
  @ViewChild('customerSearch') CustomerSearchComponent: CustomerSearchComponent | any;
  @ViewChild('loader') CommonLoaderComponent: CommonLoaderComponent | any;
  
  @ViewChild('inquiryContainer', { static: false }) inquiryContainer: ElementRef | any;
  selectedContainer: HTMLElement | any;
  
  flag: boolean = false;
  inquires = [] as any; 
  description = ""
  inqDate = ''
  completedDate = ''
  selectedInqData: any;
  updateBtnDisabled: boolean = true;
  selctedFfeedBackType = '';
  feedbacks = [] as any;
  feedBackStatus = [] as any;
  selctedFStatus = '';
  isVerifiedBtnDisabled : boolean = true;
  isDeclinedBtnDisabled : boolean = true;
  isNewBtnDisabled : boolean = true;
  isRemoveBtnDisabled : boolean = true;
  isSelectedInqDisabled : boolean = true;
  isloadedEmpDisabled : boolean = true;

  componant = 'inqComp';
  selectedForInq = [] as any;
  ButtonText: string = "Add Complains";

  selectedCustID: any;
  employeNote = '';
  isAcceptedSelectedInqEmp: boolean = true;
  isDeclinedSelectedInqEmp: boolean = true;
  isPendingSelectedInqEmp: boolean = true;
  isTextAreaDesabled: boolean = true;

  selectedAssignedInqEmp: any;

  isLoaderAvailable: boolean = false;
  showLoader = false;

  constructor(private communicationService: AppService, private extApi : ExtApiService, private dialog: MatDialog){
    
  }

  async ngAfterViewInit(): Promise<void> {
    
    this.CommonLoaderComponent.show();

      await this.getAllemployees();
      await this.getAllCustomers();
      await this.getFeedBacks();
      await this.loaAllfeedbackStatus();

    this.CommonLoaderComponent.hide();
  }
  
  handleLeftBar() {

    this.flag = !this.flag;
    
    this.communicationService.sendData({ flag: this.flag });
  }

  ngOnInit(): void {
      
  }

  async getCustomerInquiry(reqFields: any) {
    
              this.CommonLoaderComponent.hide();

      try {
        
        let inquireRes = await this.extApi.GetCustomerCompalin(reqFields)

        if(inquireRes?.data?.length > 0){

          inquireRes.data.forEach((el:any) => {

            el.completedAt = moment(new Date(el.completedAt)).format("YYYY-MM-DD")
            el.complainedAt = moment(new Date(el.complainedAt)).format("YYYY-MM-DD")
  
            el.feedBackType = this.feedbacks.find((fel: any) => fel.cfType === el.cfTypeId)?.typeDesc || '';
            el.feedBackStatus = this.feedBackStatus.find((fel: any) => fel.cfStatusId === el.cfStatusId)?.cfStatusDesc || '';
          })
  
          this.inquires = inquireRes.data.filter((el: any) => el.status === 0);

        }else{
          this.inquires = [];
        }
        
                  this.CommonLoaderComponent.hide();

      } catch (error) {
        console.log(error)
                  this.CommonLoaderComponent.hide();
      }

      this.employeNote = '';
      this.isAcceptedSelectedInqEmp = true
      this.isPendingSelectedInqEmp = true;
  }

  bindEmployeeData(event: any){

    let existData = this.selectedForInq.filter((el: any) => el.id === event.selectedData.id);

    if(existData && !event.checked){

      this.selectedForInq = this.selectedForInq.filter((el: any) => el.id !== existData[0].id);

    }else{

      if(event.checked){

        event.selectedData['inqStatus'] = 'new'
        this.selectedForInq.push(event.selectedData)
        
      }else{
        event.selectedData['inqStatus'] = ''
      }

    }

    if(this.selectedForInq.length !== 0)
      this.isSelectedInqDisabled = false;
    else
      this.isSelectedInqDisabled = true;
  }

  bindCutomerData(event : any){

    this.selectedCustID = event.id;

    this.getCustomerInquiry({custId: event.id});
    this.isloadedEmpDisabled = true;

    this.selectedForInq = [];

  }

  async selectInqSelectedEmp(emp : any){

    let reqFields = {
      "complains": [this.selectedInqData.compId],
      "employees": [emp.id]
    }

    try {
      
      let getEmpByInq = await this.extApi.GetCustomerComplainHasEmp(reqFields);

      this.employeNote = getEmpByInq.data[0][0]?.employeeNotes || '';
      
      if(getEmpByInq.data[0][0].isHandled){

        this.isAcceptedSelectedInqEmp = getEmpByInq.data[0][0].isHandled;
        this.isPendingSelectedInqEmp = false;

        this.notifyMessage("Compains", "This has been already handled" ,NotificationType.success)

      }
      else{

        this.isAcceptedSelectedInqEmp = getEmpByInq.data[0][0].isHandled;
        this.isPendingSelectedInqEmp = true;

        this.notifyMessage("Compains", "This is still pending. Please wait ......" ,NotificationType.success)
      }

      this.selectedAssignedInqEmp = getEmpByInq.data[0][0];

      this.isTextAreaDesabled = false;
      
    }catch(e: any){
      console.log(e)
    }
  }

  verifyOrDecline(parm:any){

    if(parm){
      this.isAcceptedSelectedInqEmp = parm;
      this.isPendingSelectedInqEmp = !parm

      this.selectedAssignedInqEmp.isHandled = parm;

    }else{
      this.isAcceptedSelectedInqEmp = parm;
      this.isPendingSelectedInqEmp = !parm

      this.selectedAssignedInqEmp.isHandled = parm;
    }

  }

  async UpdateAssignedEmpForInq(){

    
    this.CommonLoaderComponent.show();

    let reqFields = [{

      "ccheid": this.selectedAssignedInqEmp.ccheid,
      "custId": this.selectedAssignedInqEmp.custId,
      "ccid": this.selectedAssignedInqEmp.ccid,
      "empID": this.selectedAssignedInqEmp.empID,
      "addedAt": this.selectedAssignedInqEmp.addedAt,
      "completedAt": this.selectedAssignedInqEmp.completedAt,
      "isHandled": this.selectedAssignedInqEmp.isHandled,
      "adminNotes": "string",
      "employeeNotes": this.employeNote,
      "status": 6,
    }]

    try {
      
      let res = await this.extApi.UpdateEmployeeAssignedComplain(reqFields);

      this.notifyMessage("Compains", "Successfully updated" ,NotificationType.success)

      this.isDeclinedSelectedInqEmp = true;
      this.isAcceptedSelectedInqEmp = true;
      this.isTextAreaDesabled = true;
      this.isPendingSelectedInqEmp = true;

      this.employeNote = '';
      
      this.CommonLoaderComponent.hide();

    } catch (e: any) {
      this.notifyMessage("Compains", "updated faild" ,NotificationType.error)
      this.CommonLoaderComponent.hide();
    }
  }

  async getAllemployees(selectedIq = []){

    try {
      
      let result = await this.extApi.GetEmployee();

      if(selectedIq.length > 0){

        result.data.forEach((el: any) => {

          let getInqdataIdx = selectedIq.findIndex((elIq: any) => elIq.empID === el.id)

          if(getInqdataIdx !== -1){
            el['checked'] = true
            this.selectedForInq.push(el)
          }
          else
            el['checked'] = false

        })
      }

      this.EmployeeSearchComponent.showEmployees(result.data);

    } catch (e: any) {
      console.log(e.error)
    }
  }

  async getAllCustomers(){

    try {
      
      let result = await this.extApi.getAllCustomers();
      this.CustomerSearchComponent.showCustomers(result.data[0]);

    } catch (e: any) {
      console.log(e.error)
    }
  }

  async updateInquiry(){
debugger
    this.CommonLoaderComponent.hide();

    let reqFields = [] as any


    if(this.selectedForInq.length === 0){

      let updatedRes = await this.extApi.UpdateCustomerComplainEmp({
        "compId": this.selectedInqData.compId,
        "list":[]
      });

      alert('success')
    }else{
      this.selectedForInq.forEach((el: any) => {
        
        console.log(this.selectedInqData)
        reqFields.push(
          {
            "ccheid": "string",
            "custId": this.selectedCustID,
            "ccid": this.selectedInqData.compId,
            "empID": el.id,
            "addedAt": this.selectedInqData.complainedAt,
            "completedAt": this.selectedInqData.completedAt,
            "adminNotes": "string",
            "employeeNotes": "",
            "isHandled": false,
            "status": 0
          }
        )
      });
      
      try {
        
        let updatedRes = await this.extApi.UpdateCustomerComplainEmp({
          "compId": reqFields[0].ccid,
          "list":reqFields
        });
        
        if(updatedRes.status === '200'){

          this.notifyMessage("Compains", "Successfully updated" ,NotificationType.success)

          this.clear()
          await this.getAllCustomers()
        }

                  this.CommonLoaderComponent.hide();

      } catch (error) {
        console.log(error)
                  this.CommonLoaderComponent.hide();
      }
    }

  }

  showClickedData(inquire: any, container: HTMLElement){

    if (this.selectedContainer) {
      this.selectedContainer.classList.remove('highlight');
    }

    this.selectedContainer = container;
    this.selectedContainer.classList.add('highlight');

    this.isloadedEmpDisabled = false;

    this.selectedInqData = inquire

    this.getEmployeesInInq();

    this.updateBtnDisabled = false;

    this.selectedForInq = [];

    this.employeNote = '';
    this.isAcceptedSelectedInqEmp = true
    this.isPendingSelectedInqEmp = true;
  }

  async getEmployeesInInq(){

              this.CommonLoaderComponent.hide();

    let reqFields = {"complains": [this.selectedInqData.compId]}

    try {
      
      let getAllEmpByInq = await this.extApi.GetCustomerComplainHasEmp(reqFields);

      if(getAllEmpByInq.data[0].length > 0){
        
        getAllEmpByInq.data[0].forEach(async (el: any) => {
          
          try {
            
            let empData = await this.extApi.GetEmployee({"id": el.empID});
            
            el['initials'] = empData?.data[0]?.initials || 'Not'
            el['fName'] = empData?.data[0]?.fname || 'Found'

          } catch (error) {
            
            console.log(error)

          }
          
          
        });

        let allSelectedEmpData = getAllEmpByInq.data[0];

        await this.getAllemployees(allSelectedEmpData);

        this.isSelectedInqDisabled = false;

        this.ButtonText = "Update Complains"

      }
      else{
        this.selectedForInq = [];
        this.ButtonText = "Add Complains"
        await this.getAllemployees(this.selectedForInq);
      }

                this.CommonLoaderComponent.hide();

    } catch (error) {
      console.log(error)
                this.CommonLoaderComponent.hide();
    }

  }

  clear(){
    this.description = '';
    this.inqDate = '';
    this.completedDate = '';
    this.selctedFfeedBackType = '';
    this.selctedFStatus = '';
    this.inquires = [];
    this.selectedInqData = '';

    this.updateBtnDisabled = true;
    this.isNewBtnDisabled = true;
    this.isRemoveBtnDisabled = false;
    this.isVerifiedBtnDisabled = true;
    this.isDeclinedBtnDisabled = true;
    this.isSelectedInqDisabled = true;
    this.isloadedEmpDisabled = true;
    this.updateBtnDisabled = true;

    this.inquires = [];
    this.selectedForInq = [];

    this.getAllemployees()

    this.ButtonText = "Add Inquiry"

    this.isDeclinedSelectedInqEmp = true;
    this.isAcceptedSelectedInqEmp = true;
    this.isTextAreaDesabled = true;
    
    this.isPendingSelectedInqEmp = true;
  }

  async getFeedBacks(){

    try {
      
      let feedbacksTypes = await this.extApi.GetFeedbacktype();
      this.feedbacks = feedbacksTypes.data.filter((el: any) => el.status === 0);

    } catch (e: any) {
      
      console.log(e)
    }
  }

  async loaAllfeedbackStatus(){

    try {
      
      let loadedFeedBackStatus = await this.extApi.GetFeedbackStatus();
      this.feedBackStatus = loadedFeedBackStatus.data.filter((el: any) => el.status === 0);

    } catch (e: any) {
      
      console.log(e)
    }
  }

  verifyInq(){

    this.selectedInqData['isHandledTheInquiry'] = true;

    this.isDeclinedBtnDisabled = false;
    this.isVerifiedBtnDisabled = true;

  }

  declineInq(){

    this.selectedInqData['isHandledTheInquiry'] = false;

    this.isDeclinedBtnDisabled = true;
    this.isVerifiedBtnDisabled = false;

  }

  private notifyMessage(title: string, message: string, notificationType: NotificationType) {

    this.dialog.open(NotificationDialogComponent, {
      width: '300px',
      data: { title, message, notificationType}
    });
  }
}
