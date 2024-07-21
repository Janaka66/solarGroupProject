import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { AppService } from 'src/app/app.service';
import { ExtApiService } from 'src/app/ext-api.service';
import { CommonLoaderComponent } from 'src/app/sharedComp/common-loader/common-loader.component';
import { CustomerSearchComponent } from 'src/app/sharedComp/customer-search/customer-search.component';
import { EmployeeSearchComponent } from 'src/app/sharedComp/employee-search/employee-search.component';

@Component({
  selector: 'app-manage-inquiries',
  templateUrl: './manage-inquiries.component.html',
  styleUrls: ['./manage-inquiries.component.scss']
})
export class ManageInquiriesComponent implements OnInit, AfterViewInit {

  @ViewChild('employeeSearch') EmployeeSearchComponent: EmployeeSearchComponent | any;
  @ViewChild('customerSearch') CustomerSearchComponent: CustomerSearchComponent | any;
  @ViewChild('loader') CommonLoaderComponent: CommonLoaderComponent | any;
  
  @ViewChild('inquiryContainer', { static: false }) inquiryContainer: ElementRef | any;
  selectedContainer: HTMLElement | any;
  
  flag: boolean = false;
  panelOpenState = false;
  customerNameDetails: any;
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
  isInqDateDisabled : boolean = true;
  isCompleteDateDisabled : boolean = true;
  isVerifiedBtnDisabled : boolean = true;
  isDeclinedBtnDisabled : boolean = true;
  isNewBtnDisabled : boolean = true;
  isRemoveBtnDisabled : boolean = true;
  isSelectedInqDisabled : boolean = true;
  isloadedEmpDisabled : boolean = true;

  componant = 'inqComp';
  selectedForInq = [] as any;
  ButtonText: string = 'Add Inquiry';
  isLoaderAvailable : boolean = false;
  selectedCustID: any;
  employeNote = '';
 
  isDeclinedSelectedInqEmp = true;
  isAcceptedSelectedInqEmp = true;
  isTextAreaDesabled = true;
  isPendingSelectedInqEmp = true;

  selectedAssignedInqEmp: any;

  
  constructor(private communicationService: AppService, private extApi : ExtApiService){
    
  }

  async ngAfterViewInit(): Promise<void> {
    
    this.CommonLoaderComponent.show();

      await this.getAllemployees();
      await this.getAllCustomers();
      await this.getFeedBacks();
      await this.loaAllfeedbackStatus();

    this.CommonLoaderComponent.hide();
  }
  
  showLoader = false;
  
  handleLeftBar() {

    this.flag = !this.flag;
    
    this.communicationService.sendData({ flag: !this.flag });
  }

  ngOnInit(): void {
      
  }

  async getCustomerInquiry(reqFields: any) {
    
    this.isLoaderAvailable = true;

      try {
        
        let inquireRes = await this.extApi.GetCustomerInquiry(reqFields)

        if(inquireRes?.data?.length > 0){

          inquireRes.data.forEach((el:any) => {

            el.completedAt = moment(new Date(el.completedAt)).format("YYYY-MM-DD")
            el.iquiryAddeddAt = moment(new Date(el.iquiryAddeddAt)).format("YYYY-MM-DD")
  
            el.feedBackType = this.feedbacks.find((fel: any) => fel.cfType === el.cfTypeId)?.typeDesc || '';
            el.feedBackStatus = this.feedBackStatus.find((fel: any) => fel.cfStatusId === el.cfStatusId)?.cfStatusDesc || '';
          })
  
          this.inquires = inquireRes.data.filter((el: any) => el.status === 0);

        }else{
          this.inquires = [];
        }
        
        this.isLoaderAvailable = false;

      } catch (error) {
        console.log(error)
        this.isLoaderAvailable = false;
      }
  }

  bindEmployeeData(event: any){

    this.isLoaderAvailable = true;

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

    this.isLoaderAvailable = false;
  }

  bindCutomerData(event : any){

    this.selectedCustID = event.id;

    this.getCustomerInquiry({custId: event.id});
    this.isloadedEmpDisabled = true;

    this.selectedForInq = []

    this.isDeclinedSelectedInqEmp = true;
    this.isAcceptedSelectedInqEmp = true;
    this.isTextAreaDesabled = true;

    this.employeNote = '';

  }

  async selectInqSelectedEmp(emp : any){

    let reqFields = {
      "custId": [this.selectedCustID],
      "inquiries": [this.selectedInqData.cInqId],
      "employees": [emp.id]
    }

    try {
      
      let getEmpByInq = await this.extApi.GetCustomerInqHasEmp(reqFields);

      this.employeNote = getEmpByInq.data[0][0]?.employeeNotes || '';

      if(getEmpByInq.data[0][0].isAccepted){

        this.isAcceptedSelectedInqEmp = getEmpByInq.data[0][0].isAccepted;
        this.isDeclinedSelectedInqEmp = getEmpByInq.data[0][0].isRejected;

        this.isPendingSelectedInqEmp = true;
      }
      else if(getEmpByInq.data[0][0].isRejected){

        this.isAcceptedSelectedInqEmp = getEmpByInq.data[0][0].isAccepted;
        this.isDeclinedSelectedInqEmp = getEmpByInq.data[0][0].isRejected;

        this.isPendingSelectedInqEmp = true;
      }else{
        this.isPendingSelectedInqEmp = false;
      }

      this.selectedAssignedInqEmp = getEmpByInq.data[0][0];

      this.isTextAreaDesabled = false;

    }catch(e: any){
      console.log(e)
    }
  }

  removeEmployee(event : any){

  }

  verifyOrDecline(parm:any){

    if(parm){
      this.isAcceptedSelectedInqEmp = parm;
      this.isDeclinedSelectedInqEmp = !parm

      this.selectedAssignedInqEmp.isAccepted = parm;
      this.selectedAssignedInqEmp.isRejected = !parm;

    }else{
      this.isAcceptedSelectedInqEmp = parm;
      this.isDeclinedSelectedInqEmp = !parm

      this.selectedAssignedInqEmp.isRejected = !parm;
      this.selectedAssignedInqEmp.isAccepted = parm;
    }

  }

  async UpdateAssignedEmpForInq(){

    let reqFields = [{

      "cihempId": this.selectedAssignedInqEmp.cihempId,
      "custId": this.selectedAssignedInqEmp.custId,
      "inqId": this.selectedAssignedInqEmp.inqId,
      "empId": this.selectedAssignedInqEmp.empId,
      "addedAt": this.selectedAssignedInqEmp.addedAt,
      "completedAt": this.selectedAssignedInqEmp.completedAt,
      "adminNotes": this.selectedAssignedInqEmp.adminNotes,
      "employeeNotes": this.employeNote,
      "isAccepted": this.selectedAssignedInqEmp.isAccepted,
      "isRejected": this.selectedAssignedInqEmp.isRejected,
      "status": 0,
    }]

    try {
      
      let res = await this.extApi.UpdateEmployeesAssignedInquiry(reqFields);

      alert('success')

      this.isDeclinedSelectedInqEmp = true;
      this.isAcceptedSelectedInqEmp = true;
      this.isTextAreaDesabled = true;

      this.employeNote = '';

    } catch (e: any) {
      console.log(e)
    }
  }

  async getAllemployees(selectedIq = []){


    try {
      
      let result = await this.extApi.GetEmployee();

      if(selectedIq.length > 0){

        result.data.forEach((el: any) => {

          let getInqdataIdx = selectedIq.findIndex((elIq: any) => elIq.empId === el.id)

          if(getInqdataIdx !== -1){
            el['checked'] = true
            this.selectedForInq.push(el)
          }
          else
            el['checked'] = false

        })
      }
      console.log(this.selectedForInq)
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

    let reqFields = [] as any

    this.selectedForInq.forEach((el: any) => {
      
      reqFields.push(
        {
          "cihempId": "string",
          "custId": this.selectedCustID,
          "inqId": this.selectedInqData.cInqId,
          "empId": el.id,
          "addedAt": this.selectedInqData.iquiryAddeddAt,
          "completedAt": this.selectedInqData.completedAt,
          "adminNotes": "string",
          "employeeNotes": '',
          "isAccepted": this.selectedInqData.isAccepted,
          "isRejected": this.selectedInqData.isAccepted,
          "status": 0
        }
      )
    });
    
    try {
      
      let updatedRes = await this.extApi.UpdateCustomerInquiryEmp({
        "inqId": reqFields[0].inqId,
        "inqEmployees":reqFields
      });
      
      if(updatedRes.status === '200'){

        alert('success')
        this.clear()
        this.getAllCustomers()
      }


    } catch (error) {
      console.log(error)
    }

  }

  async removeInquiry(){

    let reqFields = [
      {
        "cInqId": this.selectedInqData.cInqId,
        "custId": this.selectedInqData.custId,
        "cfTypeId": this.feedbacks.find((el: any) => el.typeDesc === this.selctedFfeedBackType).cfType,
        "cfStatusId": this.feedBackStatus.find((el: any) => el.cfStatusDesc === this.selctedFStatus).cfStatusId,
        "description": this.description,
        "isAccepted": this.selectedInqData.isAcceptedTheInquiry,
        "isRejected": this.selectedInqData.isAccepted,
        "status": 1
      }
    ]

    try {
      
      let removeRes = await this.extApi.UpdateCustomerInquiry(reqFields)
      
      if(removeRes.status === '200'){

        alert('success')
        this.clear();

        this.getAllemployees()
      }

    } catch (error) {
      console.log(error)
    }
  }

  showClickedData(inquire: any, container: HTMLElement){

    this.selectedForInq = [];

    if (this.selectedContainer) {
      this.selectedContainer.classList.remove('highlight');
    }

    this.selectedContainer = container;
    this.selectedContainer.classList.add('highlight');

    this.isloadedEmpDisabled = false;

    this.selectedInqData = inquire

    this.getEmployeesInInq();

    this.updateBtnDisabled = false;

    this.isDeclinedSelectedInqEmp = true;
    this.isAcceptedSelectedInqEmp = true;
    this.isTextAreaDesabled = true;

    this.employeNote = '';

    this.selectedForInq = [];
    
  }

  async getEmployeesInInq(){

    this.isLoaderAvailable = true;

    let reqFields = {"inquiries": [this.selectedInqData.cInqId]}

    try {
      
      let getAllEmpByInq = await this.extApi.GetCustomerInqHasEmp(reqFields);

      if(getAllEmpByInq.data[0].length > 0){
        
        getAllEmpByInq.data[0].forEach(async (el: any) => {
          
          try {
            
            let empData = await this.extApi.GetEmployee(JSON.stringify(el.empId));
            
            el['initials'] = empData?.data[0]?.initials || 'Not'
            el['fName'] = empData?.data[0]?.fname || 'Found'

          } catch (error) {
            
            console.log(error)
            this.isLoaderAvailable = false;

          }
          
          
        });

        let allSelectedEmpData = getAllEmpByInq.data[0];

        await this.getAllemployees(allSelectedEmpData);

        this.isSelectedInqDisabled = false;
        this.ButtonText = "Update Inquiry"

      }
      else{
        this.selectedForInq = [];
        this.ButtonText = "Add Inquiry"
        await this.getAllemployees(this.selectedForInq);
      }

      this.isLoaderAvailable = false;

    } catch (error) {
      console.log(error)
      this.isLoaderAvailable = false;
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

    this.getAllemployees();

    this.ButtonText = "Add Inquiry"

    this.isDeclinedSelectedInqEmp = true;
    this.isAcceptedSelectedInqEmp = true;
    this.isTextAreaDesabled = true;
    this.isPendingSelectedInqEmp = false;
    
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

    this.selectedInqData['isAcceptedTheInquiry'] = true;

    this.isDeclinedBtnDisabled = false;
    this.isVerifiedBtnDisabled = true;

  }

  declineInq(){

    this.selectedInqData['isAcceptedTheInquiry'] = false;

    this.isDeclinedBtnDisabled = true;
    this.isVerifiedBtnDisabled = false;

  }
}
