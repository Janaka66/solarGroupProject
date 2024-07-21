import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { ExtApiService } from 'src/app/ext-api.service';
import { EmployeeSearchComponent } from 'src/app/sharedComp/employee-search/employee-search.component';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';
import { CustomerSearchComponent } from 'src/app/sharedComp/customer-search/customer-search.component';
import { CommonLoaderComponent } from 'src/app/sharedComp/common-loader/common-loader.component';

@Component({
  selector: 'app-customer-inquiries',
  templateUrl: './customer-inquiries.component.html',
  styleUrls: ['./customer-inquiries.component.scss']
})
export class CustomerInquiriesComponent implements OnInit, AfterViewInit{

  @ViewChild('customerSearch') CustomerSearchComponent: CustomerSearchComponent | any;
  @ViewChild('loader') CommonLoaderComponent: CommonLoaderComponent | any;
  
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
  custID: any;
  isLoaderAvailable : boolean = false;

  constructor(private communicationService: AppService, private extApi : ExtApiService){
    
  }

  async ngAfterViewInit(): Promise<void> {
   
    this.CommonLoaderComponent.show();

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

        inquireRes.data.forEach((el:any) => {

          el.completedAt = moment(new Date(el.completedAt)).format("YYYY-MM-DD")
          el.iquiryAddeddAt = moment(new Date(el.iquiryAddeddAt)).format("YYYY-MM-DD")

          el.feedBackType = this.feedbacks.find((fel: any) => fel.cfType === el.cfTypeId)?.typeDesc || '';
          el.feedBackStatus = this.feedBackStatus.find((fel: any) => fel.cfStatusId === el.cfStatusId)?.cfStatusDesc || '';
        })

        this.inquires = inquireRes.data.filter((el: any) => el.status === 0);

        this.isLoaderAvailable = false;

      } catch (error) {
        console.log(error);
        this.isLoaderAvailable = false;
      }
  }

  bindCutomerData(event: any){

    this.getCustomerInquiry({custId: event.id})

    this.isNewBtnDisabled = false;
    this.updateBtnDisabled = true;

    this.custID = event.id

    this.clear();
  }

  removeEmployee(event : any){

  }

  async getAllCustomers(){

    try {
      
      let result = await this.extApi.getAllCustomers();
      this.CustomerSearchComponent.showCustomers(result.data[0]);

    } catch (e: any) {
      console.log(e.error)
      this.isLoaderAvailable = false;
    }
  }

  async addInquiry(){

    this.isLoaderAvailable = true;

    
    if(!this.feedbacks.find((el: any) => el.typeDesc === this?.selctedFfeedBackType)?.cfType || !this.feedBackStatus.find((el: any) => el.cfStatusDesc === this?.selctedFStatus)?.cfStatusId || !this.description){

      alert("request fields are missing");

      this.isLoaderAvailable = false;

      return;
    }

    let reqFields = [
      {
        "cInqId": "string",
        "custId": this.inquires[0]?.custId || this.custID,
        "cfTypeId": this.feedbacks.find((el: any) => el.typeDesc === this.selctedFfeedBackType).cfType,
        "cfStatusId": this.feedBackStatus.find((el: any) => el.cfStatusDesc === this.selctedFStatus).cfStatusId,
        "description": this.description,
        "isAccepted": this.selectedInqData?.isAcceptedTheInquiry,
        "isrejected": this.selectedInqData?.isDeclinedTheInquiry,
        "status": 0
      }
    ]

    try {
      
      let addRes = await this.extApi.AddCustomerInquiry(reqFields);
      
      if(addRes.status === '200'){
        alert('success')
        this.clear()
        await this.getAllCustomers()
      }

      this.isLoaderAvailable = false;

    } catch (error) {
      console.log(error)
      this.isLoaderAvailable = false;
    }

  }

  async updateInquiry(){

    this.isLoaderAvailable = true;

    let reqFields = [
      {
        "cInqId": this.selectedInqData.cInqId,
        "custId": this.selectedInqData.custId,
        "cfTypeId": this.feedbacks.find((el: any) => el.typeDesc === this.selctedFfeedBackType).cfType,
        "cfStatusId": this.feedBackStatus.find((el: any) => el.cfStatusDesc === this.selctedFStatus).cfStatusId,
        "description": this.description,
        "isAccepted": this.selectedInqData?.isAcceptedTheInquiry,
        "isrejected": this.selectedInqData?.isDeclinedTheInquiry,
        "status": 0
      }
    ]

    if(!this.feedbacks.find((el: any) => el.typeDesc === this?.selctedFfeedBackType)?.cfType || !this.feedBackStatus.find((el: any) => el.cfStatusDesc === this?.selctedFStatus)?.cfStatusId || !this.description){

      alert("request fields are missing");

      this.isLoaderAvailable = false;

      return;
    }

    try {
      
      let updatedRes = await this.extApi.UpdateCustomerInquiry(reqFields);
      
      if(updatedRes.status === '200'){

        alert('success')
        this.clear()
        await this.getAllCustomers()
      }

      this.isLoaderAvailable = false;

    } catch (error) {
      console.log(error)
      this.isLoaderAvailable = false;
    }

  }

  async removeInquiry(){

    this.isLoaderAvailable = true;

    let reqFields = [
      {
        "cInqId": this.selectedInqData.cInqId,
        "custId": this.selectedInqData.custId,
        "cfTypeId": this.feedbacks.find((el: any) => el.typeDesc === this.selctedFfeedBackType).cfType,
        "cfStatusId": this.feedBackStatus.find((el: any) => el.cfStatusDesc === this.selctedFStatus).cfStatusId,
        "description": this.description,
        "isAccepted": this.selectedInqData.isAcceptedTheInquiry,
        "isrejected": this.selectedInqData?.isDeclinedTheInquiry,
        "status": 1
      }
    ]

    try {
      
      let removeRes = await this.extApi.UpdateCustomerInquiry(reqFields)
      
      if(removeRes.status === '200'){

        alert('success')
        this.clear();

        await this.getAllCustomers()
      }

      this.isLoaderAvailable = false;

    } catch (error) {
      console.log(error)
      this.isLoaderAvailable = false;
    }
  }

  showClickedData(data: any){

    this.description = data.description
    this.inqDate = data.iquiryAddeddAt
    this.completedDate = data.completedAt
    this.selctedFfeedBackType = this.feedbacks.find((el: any) => el.cfType === data.cfTypeId)?.typeDesc || '';
    this.selctedFStatus = this.feedBackStatus.find((el: any) => el.cfStatusId === data.cfStatusId)?.cfStatusDesc || '';
    this.selectedInqData = data;

    this.selectedInqData['isAcceptedTheInquiry'] = data.isAccepted;
    this.selectedInqData['isDeclinedTheInquiry'] = data.isrejected;

    this.updateBtnDisabled = false;
    this.isNewBtnDisabled = true;
    this.isRemoveBtnDisabled = false;
    this.isVerifiedBtnDisabled = data.isAccepted;
    this.isDeclinedBtnDisabled = data.isrejected;
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
    this.selectedInqData['isDeclinedTheInquiry'] = false;

    this.isDeclinedBtnDisabled = false;
    this.isVerifiedBtnDisabled = true;

  }

  declineInq(){

    this.selectedInqData['isDeclinedTheInquiry'] = true;
    this.selectedInqData['isAcceptedTheInquiry'] = false;

    this.isDeclinedBtnDisabled = true;
    this.isVerifiedBtnDisabled = false;

  }

}
