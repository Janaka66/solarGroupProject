import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { AppService } from 'src/app/app.service';
import { ExtApiService } from 'src/app/ext-api.service';
import { CommonLoaderComponent } from 'src/app/sharedComp/common-loader/common-loader.component';
import { CustomerSearchComponent } from 'src/app/sharedComp/customer-search/customer-search.component';

@Component({
  selector: 'app-customer-complains',
  templateUrl: './customer-complains.component.html',
  styleUrls: ['./customer-complains.component.scss']
})
export class CustomerComplainsComponent implements OnInit , AfterViewInit{

  
  @ViewChild('customerSearch') CustomerSearchComponent: CustomerSearchComponent | any;
  @ViewChild('loader') CommonLoaderComponent: CommonLoaderComponent | any;

  flag: boolean = false;
  panelOpenState = false;
  complain = [] as any; 
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
  custID: any;
  isLoaderAvailable: boolean = false;
  isInqDateDisabled : boolean = true;
  isCompleteDateDisabled : boolean = true;

  constructor(private communicationService: AppService, private extApi : ExtApiService){

  }

  async ngAfterViewInit(): Promise<void> {

    this.CommonLoaderComponent.show();

    await this.getAllCustomers();
    await this.getFeedBacks();
    await this.loaAllfeedbackStatus();

    this.CommonLoaderComponent.hide();

  }
  

  
  handleLeftBar() {

    this.flag = !this.flag;
    
    this.communicationService.sendData({ flag: !this.flag });
  }

  async ngOnInit(): Promise<void> {

  }

  async getCustomercomplain(reqFields: any) {
    
    this.isLoaderAvailable = true;

      try {
        
        let allComplains = await this.extApi.GetCustomerCompalin(reqFields)

        allComplains.data.forEach((el:any) => {

          el.completedAt = moment(new Date(el.completedAt)).format("YYYY-MM-DD")
          el.complainedAt = moment(new Date(el.complainedAt)).format("YYYY-MM-DD")

          el.feedBackType = this.feedbacks.find((fel: any) => fel.cfType === el.cfTypeId)?.typeDesc || '';
          el.feedBackStatus = this.feedBackStatus.find((fel: any) => fel.cfStatusId === el.cfStatusId)?.cfStatusDesc || '';
        })

        this.complain = allComplains.data.filter((el: any) => el.status === 0);

        this.isLoaderAvailable = false;

      } catch (error) {
        console.log(error)
        this.isLoaderAvailable = false;
      }
  }

  bindCutomerData(event: any){

    this.getCustomercomplain({custId: event.id})

    this.isNewBtnDisabled = false;
    this.updateBtnDisabled = true;

    this.custID = event.id

    this.clear();
  }

  async getAllCustomers(){
    
    try {
      
      let result = await this.extApi.getAllCustomers();
      this.CustomerSearchComponent.showCustomers(result.data[0]);

    } catch (e: any) {
      console.log(e.error)
    }
  }

  async addcomplain(){
    
    this.isLoaderAvailable = true;

    if(!this.feedbacks.find((el: any) => el.typeDesc === this?.selctedFfeedBackType)?.cfType || !this.feedBackStatus.find((el: any) => el.cfStatusDesc === this?.selctedFStatus)?.cfStatusId || !this.description){

      alert("request fields are missing");

      this.isLoaderAvailable = false;

      return;
    }
    
    let reqFields = [
      {
        "compId": "string",
        "custId": this.complain[0]?.custId || this.custID,
        "cfTypeId": this.feedbacks.find((el: any) => el.typeDesc === this.selctedFfeedBackType).cfType,
        "cfStatusId": this.feedBackStatus.find((el: any) => el.cfStatusDesc === this.selctedFStatus).cfStatusId,
        "description": this.description,
        "isHandled": this.selectedInqData?.isHandledThecomplain,
        "status": 0
      }
    ]

    try {
      
      let addRes = await this.extApi.AddCustomerComplain(reqFields);
      
      if(addRes.status === '200'){
        alert('success')
        this.clear()
        await this.getAllCustomers();
      }

      this.isLoaderAvailable = false;

    } catch (error) {
      console.log(error)
      this.isLoaderAvailable = false;
    }

  }

  async updatecomplain(){
    
    this.isLoaderAvailable = true;
    
    if(!this.feedbacks.find((el: any) => el.typeDesc === this?.selctedFfeedBackType)?.cfType || !this.feedBackStatus.find((el: any) => el.cfStatusDesc === this?.selctedFStatus)?.cfStatusId || !this.description){

      alert("request fields are missing");

      this.isLoaderAvailable = false;

      return;
    }

    let reqFields = [
      {
        "compId": this.selectedInqData.compId,
        "custId": this.selectedInqData.custId,
        "cfTypeId": this.feedbacks.find((el: any) => el.typeDesc === this.selctedFfeedBackType).cfType,
        "cfStatusId": this.feedBackStatus.find((el: any) => el.cfStatusDesc === this.selctedFStatus).cfStatusId,
        "description": this.description,
        "isHandled": this.selectedInqData?.isHandledThecomplain,
        "status": 0
      }
    ]

    try {
      
      let updatedRes = await this.extApi.UpdateCustomerComplain(reqFields);
      
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

  async removecomplain(){
    
    this.isLoaderAvailable = true;

    let reqFields = [
      {
        "compId": this.selectedInqData.compId,
        "custId": this.selectedInqData.custId,
        "cfTypeId": this.feedbacks.find((el: any) => el.typeDesc === this.selctedFfeedBackType).cfType,
        "cfStatusId": this.feedBackStatus.find((el: any) => el.cfStatusDesc === this.selctedFStatus).cfStatusId,
        "description": this.description,
        "isHandled": this.selectedInqData.isHandledThecomplain,
        "status": 1
      }
    ]

    try {
      
      let removeRes = await this.extApi.UpdateCustomerComplain(reqFields)
      
      if(removeRes.status === '200'){

        alert('success')
        this.clear();

        await this.getAllCustomers();
      }

      this.isLoaderAvailable = false;

    } catch (error) {
      console.log(error)
      this.isLoaderAvailable = false;
    }
  }

  showClickedData(data: any){
    
    this.description = data.description
    this.inqDate = data.complainedAt
    this.completedDate = data.completedAt
    this.selctedFfeedBackType = this.feedbacks.find((el: any) => el.cfType === data.cfTypeId)?.typeDesc || '';
    this.selctedFStatus = this.feedBackStatus.find((el: any) => el.cfStatusId === data.cfStatusId)?.cfStatusDesc || '';
    this.selectedInqData = data;

    this.selectedInqData['isHandledThecomplain'] = data.isHandled;

    this.updateBtnDisabled = false;
    this.isNewBtnDisabled = true;
    this.isRemoveBtnDisabled = false;

    if(data.isHandled){
      this.isVerifiedBtnDisabled = true
      this.isDeclinedBtnDisabled = false
    }
    else{
      this.isVerifiedBtnDisabled = false
      this.isDeclinedBtnDisabled = true
    }
  }

  clear(){
    this.description = '';
    this.inqDate = '';
    this.completedDate = '';
    this.selctedFfeedBackType = '';
    this.selctedFStatus = '';
    this.complain = [];
    this.selectedInqData = '';

    this.updateBtnDisabled = true;
    this.isRemoveBtnDisabled = true;
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
    
    this.selectedInqData['isHandledThecomplain'] = true;

    this.isDeclinedBtnDisabled = false;
    this.isVerifiedBtnDisabled = true;

  }

  declineInq(){
    
    this.selectedInqData['isHandledThecomplain'] = false;

    this.isDeclinedBtnDisabled = true;
    this.isVerifiedBtnDisabled = false;

  }

}
