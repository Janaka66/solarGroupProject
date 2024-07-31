import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, ElementRef, OnInit, ViewChild, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ExtApiService } from '../ext-api.service';
import { AppService } from '../app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-slider-window',
  templateUrl: './slider-window.component.html',
  styleUrls: ['./slider-window.component.scss'],
  animations: [
    trigger('slideMenu', [
      state('false', style({ transform: 'translateY(100%)' })), // Off-screen position (bottom)
      state('true', style({ transform: 'translateY(0)' })),      // On-screen position (top)
      transition('true <=> false', animate('400ms ease-in-out'))
    ])
  ]
  
})
export class SliderWindowComponent implements OnInit {

  @ViewChild('sliderEle', { static: false }) sliderEle: ElementRef | any;
  
  @ViewChild('actionBtnContainerForBrand', { static: false }) actionBtnContainerForBrand: ElementRef | any;
  @ViewChild('actionBtnContainerForComp', { static: false }) actionBtnContainerForComp: ElementRef | any;
  @ViewChild('actionBtnContainerForDesig', { static: false }) actionBtnContainerForDesig: ElementRef | any;
  @ViewChild('actionBtnContainerForDoctype', { static: false }) actionBtnContainerForDoctype: ElementRef | any;
  @ViewChild('actionBtnContainerForFeedBackStatus', { static: false }) actionBtnContainerForFeedBackStatus: ElementRef | any;
  @ViewChild('actionBtnContainerForFeedBackType', { static: false }) actionBtnContainerForFeedBackType: ElementRef | any;
  @ViewChild('actionBtnContainerForItemType', { static: false }) actionBtnContainerForItemType: ElementRef | any;
  @ViewChild('actionBtnContainerForStage', { static: false }) actionBtnContainerForStage: ElementRef | any;
  @ViewChild('actionBtnContainerForItems', { static: false }) actionBtnContainerForItems: ElementRef | any;
  @ViewChild('actionBtnContainerManufac', { static: false }) actionBtnContainerManufac: ElementRef | any;
  @ViewChild('actionBtnContainerForprofile', { static: false }) actionBtnContainerForprofile: ElementRef | any;
  @ViewChild('actionBtnContainerForwarrenty', { static: false }) actionBtnContainerForwarrenty: ElementRef | any;

  isLoading: boolean = false;
  sliderWindowState: boolean = false;
  
  // brands
  step = signal(0);
  brand: any;
  allBrandNames = [] as any;

  //company
  companyItems: any;
  companyLogo: any;
  allCompanyData: any = [];

  removeUpdateTextForBrand: any = 'REMOVE';
  removeUpdateTextForComp: any = 'REMOVE';
  removeUpdateTextForDesig: any = 'REMOVE';
  removeUpdateTextForDocType: any = 'REMOVE';
  removeUpdateTextForFeedBackStatus: any = 'REMOVE';
  removeUpdateTextForFeedBackType: any = 'REMOVE';
  removeUpdateTextForItemType: any = 'REMOVE';
  removeUpdateTextForStage: any = 'REMOVE';
  removeUpdateTextForItems: any = 'REMOVE';
  removeUpdateTextForManuFac: any = 'REMOVE';
  removeUpdateTextForProfile: any = 'REMOVE';
  removeUpdateTextForwarrenty = 'REMOVE'

  isLoaderAvailableForBrand: boolean = false;
  isLoaderAvailableForCompany: boolean = false;
  isLoaderAvailableForDesignation: boolean = false;
  isLoaderAvailableForDocType: boolean = false;
  isLoaderAvailableForFeedbackStatus: boolean = false;
  isLoaderAvailableForFeedbackType: boolean = false;
  isLoaderAvailableForItemType: boolean = false;
  isLoaderAvailableForItems: boolean = false;
  isLoaderAvailableForManuFac: boolean = false;
  isLoaderAvailableForStage: boolean = false;

  selectedCompanyItemIdx : any;

  //Designation
  designation: any;
  alldesoignations = [] as any;

  //Doc type
  docType: any;
  allSavedDocsTypes = [] as any;

  //feedBackStatus
  feedbackStatusForm: any;
  allfeedbackStatus = [] as any;

  //feedback types
  feedbackTypeForm: any;
  allfeedbackTypes = [] as any;

  //item types
  itemTypeForm: any;
  allSavedItemTypes = [] as any;

  //Items
  items: any;
  itemTypes = [] as any;
  allItems = [] as any;
  manuFac = [] as any;
  
  //Manufacture
  manufatureItems: any;
  allSavedIManufatureItems = [] as any;

  //stages
  stage: any;
  allSavedStages = [] as any;
  disableDocTypeRemoveIcon: boolean = false;

  //Profile
  flag: any;
  isLoaderAvailableForprofile: boolean = false;
  profile: any;
  allSavedprofiles: any;

  //Warrenty
  isLoaderAvailableForwarrenty: boolean = false;
  warrenty: any;
  allSavedwarrentys: any;

  constructor(private formBuilder: FormBuilder, private extApi: ExtApiService, private communicationService: AppService, private router: Router){
    this.brand = this.formBuilder.group({
      brandName:    ['', Validators.required]
    });

    this.companyItems = this.formBuilder.group({

      cmpName:          ['', Validators.required],
      addLineA:         ['', Validators.required],
      addLineB:         ['', Validators.required],
      addLineC:         ['', Validators.required],
      phone:            ['', Validators.required],
      mobile:           ['', Validators.required],
      fax:              ['', Validators.required],
      email:            ['', Validators.required],

    });

    this.designation = this.formBuilder.group({
      desgDesc:    ['', Validators.required],
    });

    this.docType = this.formBuilder.group({
      documentType:    ['', Validators.required],
    });

    this.feedbackStatusForm = this.formBuilder.group({
      cfStatusDesc:    ['', Validators.required],
    });

    this.feedbackTypeForm = this.formBuilder.group({
      typeDesc:    ['', Validators.required],
    });

    this.itemTypeForm = this.formBuilder.group({
      name:    ['', Validators.required],
    });

    this.items = this.formBuilder.group({

      itemName:         ['', Validators.required],
      description:      ['', Validators.required],
      model:            ['', Validators.required],
      powerRating:      ['', Validators.required],
      efficiency:       ['', Validators.required],
      unitPrice:        ['', Validators.required],
      warrantyPeriod:   ['', Validators.required],
      stockQuantity:    ['', Validators.required],
      itemType:         ['', Validators.required],
      ManuFactures:     ['', Validators.required],
      brandName:        ['', Validators.required],

    });

    this.manufatureItems = this.formBuilder.group({
      name:       ['', Validators.required],
      pNumber:    ['', Validators.required],
      email:      ['', Validators.required],
      address:    ['', Validators.required],
    });

    this.stage = this.formBuilder.group({
      stagDesc:    ['', Validators.required],
    });

    this.profile = this.formBuilder.group({
      modeDesc:    ['', Validators.required],
    });

    this.warrenty = this.formBuilder.group({
      actionDesc:    ['', Validators.required],
    });
  }

  async ngOnInit(): Promise<void> {

  }

  sliderEnableDisable(data: any){
debugger
    this.sliderWindowState = true;
    
    this.clearAll();

    setTimeout(() => {
      this.sliderEle.nativeElement.style.width = data.width + '%'
      this.sliderEle.nativeElement.style.height = data.height + 'px'
      this.initAll()
    });

  }

  async initAll(){

    this.isLoading = true;

    await this.loaAllbrands();
    await this.loadCompany();
    await this.loaAllfeedbacks();
    await this.loaAllDocuments();
    await this.loaAllfeedbackStatus();
    await this.loaAllfeedbackTypes();
    await this.loadAllItemTypes();
    await this.loadAllIManufatureItems();
    await this.loadAllItems();
    await this.loaAllStages();
    await this.loaAllprofiles();
    await this.loaAllwarrentys();

    this.isLoading = false;
    
  }


  sliderClose(){
    this.sliderWindowState = false;
  }

  setStep(index: number) {
    this.step.set(index);
  }

  nextStep() {
    this.step.update(i => i + 1);
  }

  prevStep() {
    this.step.update(i => i - 1);
  }

  // Brand management
  async addInputType(){

    this.isLoaderAvailableForBrand = true;

    if(this.brand.value.brandName === ''){

      this.isLoaderAvailableForBrand = false;
      alert("brand is empty")
      return
    }

    if(this.allBrandNames.find((el: any) => el.brandName === this.brand.value.brandName)){

      this.isLoaderAvailableForBrand = false;
      alert("brand is already added")
      return
    }

    let reqFields = [
      {
        "id": "string",
        "brandName": this.brand.value.brandName,
        "status": 0
      }
    ]

    try {

      let adTypeRes = await this.extApi.AddBrand(reqFields);
      console.log(adTypeRes)

      await this.loaAllbrands()
      
      this.brand.reset();

      this.isLoaderAvailableForBrand = false;

    } catch (e: any) {
      
      console.log(e)
      this.isLoaderAvailableForBrand = false;
    }

  }

  async loaAllbrands(){

    try {
      
      let brandsTypes = await this.extApi.GetBrand();
      this.allBrandNames = brandsTypes.data[0].filter((el: any) => el.status === 0);

      console.log(this.allBrandNames)

    } catch (e: any) {
      
      console.log(e)
    }
  }

  async removebrand(i: any){

    this.isLoaderAvailableForBrand = true;

    try {
      
      let removebrandRes = await this.extApi.UpdateBrand([{id: this.allBrandNames[i].id, brandName: this.allBrandNames[i].brandName, status: 1}])
      console.log(removebrandRes)

      await this.loaAllbrands()

      this.isLoaderAvailableForBrand = false;

    } catch (e:any) {
      console.log(e)

      this.isLoaderAvailableForBrand = false;
    }

  }

  bindBrandDataToUI(data: any, i : any){

    let allBottomClzElements = this.actionBtnContainerForBrand.nativeElement.querySelectorAll('.bottom')

    allBottomClzElements.forEach((el:any, idx: any) => {
      
      el.classList.remove('remove')
      el.classList.remove('update')

      if(parseInt(el.id) === i){
        el.classList.remove('remove')
        el.classList.add('update')
        el.innerHTML = "UPDATE"

        this.allBrandNames[idx]['btnTxt'] = 'update'

      }else{
        el.innerHTML = 'REMOVE';
        el.classList.add('remove');
        this.allBrandNames[idx]['btnTxt'] = 'remove'
      }

    });

    this.brand.setValue({
      brandName:  data.brandName,
    })


  }

  async updateBrand(i: any){

    this.isLoaderAvailableForBrand = true;

    try {
      
      let updateBrandRes = await this.extApi.UpdateBrand([{id: this.allBrandNames[i].id, brandName: this.brand.value.brandName, status: 0}])
      console.log(updateBrandRes);

      this.brand.reset();
      await this.loaAllbrands();

      this.isLoaderAvailableForBrand = false;

    } catch (e:any) {
      console.log(e)

      this.isLoaderAvailableForBrand = false;
    }

  }

  // Company Management
  async addCompany(){

    this.isLoaderAvailableForCompany = true;

    let reqFields = [
      {
        "cmpId"   : 'string',
        "cmpName" : this.companyItems.value.cmpName,
        "regNo"   : 'string',
        "addLineA": this.companyItems.value.addLineA,
        "addLineB": this.companyItems.value.addLineB,
        "addLineC": this.companyItems.value.addLineC,
        "phone"   : this.companyItems.value.phone,
        "mobile"  : this.companyItems.value.mobile,
        "fax"     : this.companyItems.value.fax,
        "email"   : this.companyItems.value.email,
        "logo"    : this.companyLogo,
        "status"  : 0
      }
    ]

    try {

      let addCompanyRes = await this.extApi.AddCompany(reqFields);
      console.log(addCompanyRes);

      this.loadCompany()
      
      this.companyItems.reset();
      
      this.isLoaderAvailableForCompany = false;

    } catch (e: any) {
      
      console.log(e)

      this.isLoaderAvailableForCompany = false;

    }

  }

  async loadCompany(){
    
    try {
      
      let companyData = await this.extApi.GetCompany();
      this.allCompanyData = companyData.data[0].filter((el: any) => el.status === 0);
     
      console.log(this.allCompanyData)

    } catch (e: any) {
      
      console.log(e)
    }
  }

  async removeCompany(i: any){

    this.isLoaderAvailableForCompany = true;

    try {
      
      let removeItems = await this.extApi.updateCopany(
        [{
          "cmpId"   : this.allCompanyData[i].cmpId,
          "cmpName" : this.allCompanyData[i].cmpName,
          "regNo"   : this.allCompanyData[i].regNo,
          "addLineA": this.allCompanyData[i].addLineA,
          "addLineB": this.allCompanyData[i].addLineB,
          "addLineC": this.allCompanyData[i].addLineC,
          "phone"   : this.allCompanyData[i].phone,
          "mobile"  : this.allCompanyData[i].mobile,
          "fax"     : this.allCompanyData[i].fax,
          "email"   : this.allCompanyData[i].email,
          "logo"    : this.companyLogo,
          "status"  : 1
        }]
      )

      console.log(removeItems)

      await this.loadCompany();

      this.isLoaderAvailableForCompany = false;

    } catch (e:any) {
      console.log(e)
      this.isLoaderAvailableForCompany = false;
    }

  }

  async updateCompany(i: any){

    this.isLoaderAvailableForCompany = true;

    try {
      
      let updateItems = await this.extApi.updateCopany(
        [{
          "cmpId"   : this.allCompanyData[i].cmpId,
          "cmpName" : this.companyItems.value.cmpName,
          "regNo"   : this.allCompanyData[i].regNo,
          "addLineA": this.companyItems.value.addLineA,
          "addLineB": this.companyItems.value.addLineB,
          "addLineC": this.companyItems.value.addLineC,
          "phone"   : this.companyItems.value.phone,
          "mobile"  : this.companyItems.value.mobile,
          "fax"     : this.companyItems.value.fax,
          "email"   : this.companyItems.value.email,
          "logo"    : this.companyLogo,
          "status"  : 0
        }]
      )

      console.log(updateItems)

      this.companyItems.reset();

      await this.loadCompany();
      this.isLoaderAvailableForCompany = false;

    } catch (e:any) {
      console.log(e)
      this.isLoaderAvailableForCompany = false;
    }

  }

  uploadFile(e: any){

    const file = e.target.files[0];

    if (file.length === 0)
      return;


    const reader = new FileReader();
    reader.readAsDataURL(file); 
    reader.onload = (_event) => { 
      const base64String = (reader.result as string).replace(/^data:image\/[a-z]+;base64,/, '');
      this.companyLogo = base64String;

      e.target.value = null;
    } 
  }

  bindCompanyDataToUI(data: any, i: any){
    
    let allBottomClzElements = this.actionBtnContainerForComp.nativeElement.querySelectorAll('.bottom')

    allBottomClzElements.forEach((el:any, idx: any) => {
      
      el.classList.remove('remove')
      el.classList.remove('update')

      if(parseInt(el.id) === i){
        el.classList.remove('remove')
        el.classList.add('update')
        el.innerHTML = "UPDATE"

        this.allCompanyData[idx]['btnTxt'] = 'update'

      }else{
        el.innerHTML = 'REMOVE';
        el.classList.add('remove');
        this.allCompanyData[idx]['btnTxt'] = 'remove'
      }

    });

    this.companyItems.setValue({
      cmpName:          data.cmpName,
      addLineA:         data.addLineA,
      addLineB:         data.addLineB,
      addLineC:         data.addLineC,
      phone:            data.phone,
      mobile:           data.mobile,
      fax:              data.fax,
      email:            data.email
    })

    this.companyLogo = data.logo
    
  }

  //Designation
  async addDesignation(){

    this.isLoaderAvailableForDesignation = true;

    if(this.designation.value.desgDesc === ''){

      this.isLoaderAvailableForDesignation = false;
      alert("designation is empty")
      return
    }

    if(this.alldesoignations.find((el: any) => el.desgDesc === this.designation.value.desgDesc)){

      this.isLoaderAvailableForDesignation = false;
      alert("designation is already added")
      return
    }

    let reqFields = [
      {
        "id": "string",
        "desgDesc": this.designation.value.desgDesc,
        "status": 0
      }
    ]

    try {

      let adTypeRes = await this.extApi.AddEmployeeDesignation(reqFields);
      console.log(adTypeRes)

      await this.loaAllfeedbacks()
      
      this.designation.reset();
      this.isLoaderAvailableForDesignation = false;

    } catch (e: any) {
      
      console.log(e)
      this.isLoaderAvailableForDesignation = false;
    }

  }

  async loaAllfeedbacks(){

    try {
      
      let feedbacksTypes = await this.extApi.GetEmployeeDesignation();
      this.alldesoignations = feedbacksTypes.data.filter((el: any) => el.status === 0);

      console.log(this.alldesoignations)

    } catch (e: any) {
      
      console.log(e)
    }
  }

  async removefeedback(i: any){
    
    this.isLoaderAvailableForDesignation = true;

    try {
      
      let removefeedbackRes = await this.extApi.UpdateEmployeeDesignation([{id: this.alldesoignations[i].id, desgDesc: this.alldesoignations[i].desgDesc, status: 1}])
      console.log(removefeedbackRes)

      await this.loaAllfeedbacks()

      this.isLoaderAvailableForDesignation = false;

    } catch (e:any) {
      console.log(e)

      this.isLoaderAvailableForDesignation = false;
    }

  }

  async updateDesignation(i: any){

    this.isLoaderAvailableForDesignation = true;

    try {
      
      let updateDesignationRes = await this.extApi.UpdateEmployeeDesignation([{id: this.alldesoignations[i].id, desgDesc: this.designation.value.desgDesc, status: 0}])
      console.log(updateDesignationRes);

      this.designation.reset();
      this.loaAllfeedbacks();

      this.isLoaderAvailableForDesignation = false;

    } catch (e:any) {
      console.log(e)

      this.isLoaderAvailableForDesignation = false;
    }
    
  }

  bindDesigDataToUI(data: any, i: any){
    
    let allBottomClzElements = this.actionBtnContainerForDesig.nativeElement.querySelectorAll('.bottom')

    allBottomClzElements.forEach((el:any, idx: any) => {
      
      el.classList.remove('remove')
      el.classList.remove('update')

      if(parseInt(el.id) === i){
        el.classList.remove('remove')
        el.classList.add('update')
        el.innerHTML = "UPDATE"

        this.alldesoignations[idx]['btnTxt'] = 'update'

      }else{
        el.innerHTML = 'REMOVE';
        el.classList.add('remove');
        this.alldesoignations[idx]['btnTxt'] = 'remove'
      }

    });

    this.designation.setValue({
      desgDesc: data.desgDesc,
    })
    
  }

  //Doc type
  async addDocType(){

    this.isLoaderAvailableForDocType = true;

    if(this.docType.value.documentType === ''){

      this.isLoaderAvailableForDocType = false;
      alert("Document type is empty")
      return
    }

    if(this.allSavedDocsTypes.find((el: any) => el.name === this.docType.value.documentType)){

      this.isLoaderAvailableForDocType = false;
      alert("type is already added")
      return
    }

    let reqFields = [
      {
        "id": "string",
        "name": this.docType.value.documentType,
        "status": 0
      }
    ]

    try {

      let adTypeRes = await this.extApi.AddDocType(reqFields);
      console.log(adTypeRes)

      await this.loaAllDocuments()
      
      
      this.docType.reset();

      this.isLoaderAvailableForDocType = false;

    } catch (e: any) {
      
      console.log(e)
      this.isLoaderAvailableForDocType = false;
    }

  }

  async loaAllDocuments(){

    try {
      
      let documentsTypes = await this.extApi.DocTypes();
      this.allSavedDocsTypes = documentsTypes.data.filter((el: any) => el.status === 0);

    } catch (e: any) {
      
      console.log(e)
    }
  }

  async removeDocType(i: any){

    this.isLoaderAvailableForDocType = true;

    try {
      
      let removeDOcTypeRes = await this.extApi.UpdateDocType({id: this.allSavedDocsTypes[i].id, name: this.allSavedDocsTypes[i].name, status: 1})
      console.log(removeDOcTypeRes)

      this.loaAllDocuments()
      this.isLoaderAvailableForDocType = false;

    } catch (e:any) {
      console.log(e)

      this.isLoaderAvailableForDocType = false;
    }

  }

  async updateDocType(i: any){
    
    this.isLoaderAvailableForDocType = true;

    try {
      
      let updateDocTypeRes = await this.extApi.UpdateDocType({id: this.allSavedDocsTypes[i].id, name: this.docType.value.documentType, status: 0})
      console.log(updateDocTypeRes)

      this.docType.reset();
      this.loaAllDocuments();

      this.isLoaderAvailableForDocType = false;

    } catch (e:any) {
      console.log(e)
      this.isLoaderAvailableForDocType = false;
      
    }
    
  }

  bindDocTypeDataToUI(data: any, i: any){
    
    let allBottomClzElements = this.actionBtnContainerForDoctype.nativeElement.querySelectorAll('.bottom')

    allBottomClzElements.forEach((el:any, idx: any) => {
      
      el.classList.remove('remove')
      el.classList.remove('update')

      if(parseInt(el.id) === i){
        el.classList.remove('remove')
        el.classList.add('update')
        el.innerHTML = "UPDATE"

        this.allSavedDocsTypes[idx]['btnTxt'] = 'update'

      }else{
        el.innerHTML = 'REMOVE';
        el.classList.add('remove');
        this.allSavedDocsTypes[idx]['btnTxt'] = 'remove'
      }

    });

    this.docType.setValue({
      documentType: data.name,
    })
    
  }

  //feedBack ststus
  async addFeedBackStatus(){

    this.isLoaderAvailableForFeedbackStatus = true;

    if(this.feedbackStatusForm.value.cfStatusDesc === ''){

    this.isLoaderAvailableForFeedbackStatus = false;
      alert("feedback is empty")
      return
    }

    if(this.allfeedbackStatus.find((el: any) => el.cfStatusDesc === this.feedbackStatusForm.value.cfStatusDesc)){

      this.isLoaderAvailableForFeedbackStatus = false;

      alert("feedback is already added")
      return
    }

    let reqFields = [
      {
        "cfStatusId": "string",
        "cfStatusDesc": this.feedbackStatusForm.value.cfStatusDesc,
        "status": 0
      }
    ]

    try {

      let adTypeRes = await this.extApi.AddFeedbackStatus(reqFields);
      console.log(adTypeRes)

      await this.loaAllfeedbackStatus()
      
      this.feedbackStatusForm.reset();
      this.isLoaderAvailableForFeedbackStatus = false;

    } catch (e: any) {
      
      console.log(e)
      this.isLoaderAvailableForFeedbackStatus = false;
    }

  }

  async loaAllfeedbackStatus(){

    try {
      
      let feedbacksTypes = await this.extApi.GetFeedbackStatus();
      this.allfeedbackStatus = feedbacksTypes.data.filter((el: any) => el.status === 0);

    } catch (e: any) {
      
      console.log(e)
    }
  }

  async removefeedbackStatus(i: any){

    this.isLoaderAvailableForFeedbackStatus = true;

    try {
      
      let removefeedbackRes = await this.extApi.UpdateFeedbackStatus([{cfStatusId: this.allfeedbackStatus[i].cfStatusId, cfStatusDesc: this.allfeedbackStatus[i].cfStatusDesc, status: 1}])
      console.log(removefeedbackRes)

      await this.loaAllfeedbackStatus()

      this.isLoaderAvailableForFeedbackStatus = false;

    } catch (e:any) {
      console.log(e)

      this.isLoaderAvailableForFeedbackStatus = false;
    }

  }

  bindFeedbackStatusDataToUI(data: any, i: any){
    
    
    let allBottomClzElements = this.actionBtnContainerForFeedBackStatus.nativeElement.querySelectorAll('.bottom')

    allBottomClzElements.forEach((el:any, idx: any) => {
      
      el.classList.remove('remove')
      el.classList.remove('update')

      if(parseInt(el.id) === i){
        el.classList.remove('remove')
        el.classList.add('update')
        el.innerHTML = "UPDATE"

        this.allfeedbackStatus[idx]['btnTxt'] = 'update'

      }else{
        el.innerHTML = 'REMOVE';
        el.classList.add('remove');
        this.allfeedbackStatus[idx]['btnTxt'] = 'remove'
      }

    });

    this.feedbackStatusForm.setValue({
      cfStatusDesc: data.cfStatusDesc,
    })

  }

  async updateFeedbackStatus(i:any){

    this.isLoaderAvailableForFeedbackStatus = true;

    try {
      
      let updateFeedBackStausRes = await this.extApi.UpdateFeedbackStatus([{cfStatusId: this.allfeedbackStatus[i].cfStatusId, cfStatusDesc: this.feedbackStatusForm.value.cfStatusDesc, status: 0}])
      console.log(updateFeedBackStausRes)

      this.feedbackStatusForm.reset();
      await this.loaAllfeedbackStatus();

      this.isLoaderAvailableForFeedbackStatus = false;

    } catch (e:any) {
      console.log(e)

      this.isLoaderAvailableForFeedbackStatus = false;
    }

  }

  //feedBack types
  async addFeedbackTypes(){

    this.isLoaderAvailableForFeedbackType = true;

    if(this.feedbackTypeForm.value.typeDesc === ''){

      this.isLoaderAvailableForFeedbackType = false;

      alert("feedback is empty")
      return
    }

    if(this.allfeedbackTypes.find((el: any) => el.typeDesc === this.feedbackTypeForm.value.typeDesc)){

      this.isLoaderAvailableForFeedbackType = false;

      alert("feedback is already added")
      return
    }

    let reqFields = [
      {
        "cfType": "string",
        "typeDesc": this.feedbackTypeForm.value.typeDesc,
        "status": 0
      }
    ]

    try {

      let adTypeRes = await this.extApi.AddFeedbackType(reqFields);
      console.log(adTypeRes)

      await this.loaAllfeedbackTypes()
      
      this.feedbackTypeForm.reset();

      this.isLoaderAvailableForFeedbackType = false;

    } catch (e: any) {
      
      console.log(e)
      this.isLoaderAvailableForFeedbackType = false;
    }

  }

  async loaAllfeedbackTypes(){

    try {
      
      let feedbacksTypes = await this.extApi.GetFeedbacktype();
      this.allfeedbackTypes = feedbacksTypes.data.filter((el: any) => el.status === 0);

    } catch (e: any) {
      
      console.log(e)
    }
  }

  async removefeedbackType(i: any){

    this.isLoaderAvailableForFeedbackType = true;

    try {
      
      let removefeedbackRes = await this.extApi.UpdateFeedbackType([{cfType: this.allfeedbackTypes[i].cfType, typeDesc: this.allfeedbackTypes[i].typeDesc, status: 1}])
      console.log(removefeedbackRes)

      await this.loaAllfeedbackTypes()

      this.isLoaderAvailableForFeedbackType = false;

    } catch (e:any) {
      console.log(e)

      this.isLoaderAvailableForFeedbackType = false;
    }

  }

  async updateFeedbackType(i: any){

    this.isLoaderAvailableForFeedbackType = true;

    try {
      
      let removefeedbackRes = await this.extApi.UpdateFeedbackType([{cfType: this.allfeedbackTypes[i].cfType, typeDesc: this.feedbackTypeForm.value.typeDesc, status: 0}])
      console.log(removefeedbackRes)


      await this.loaAllfeedbackTypes();
      this.feedbackTypeForm.reset()
      this.isLoaderAvailableForFeedbackType = false;

    } catch (e:any) {
      console.log(e)

      this.isLoaderAvailableForFeedbackType = false;
    }

    
  }

  bindFeedbackTypeDataToUI(data: any, i: any){
    
    
    let allBottomClzElements = this.actionBtnContainerForFeedBackType.nativeElement.querySelectorAll('.bottom')

    allBottomClzElements.forEach((el:any, idx: any) => {
      
      el.classList.remove('remove')
      el.classList.remove('update')

      if(parseInt(el.id) === i){
        el.classList.remove('remove')
        el.classList.add('update')
        el.innerHTML = "UPDATE"

        this.allfeedbackTypes[idx]['btnTxt'] = 'update'

      }else{
        el.innerHTML = 'REMOVE';
        el.classList.add('remove');
        this.allfeedbackTypes[idx]['btnTxt'] = 'remove'
      }

    });

    this.feedbackTypeForm.setValue({
      typeDesc: data.typeDesc,
    })

  }

  //Item Types
  async addItemType(){

    this.isLoaderAvailableForItemType = true;

    if(this.itemTypeForm.value.name === ''){

      this.isLoaderAvailableForItemType = false;
      alert("Item Type is empty")
      return
    }

    if(this.allSavedItemTypes.find((el: any) => el.name === this.itemTypeForm.value.name)){

      this.isLoaderAvailableForItemType = false;
      alert("Item Type is already added")
      return
    }

    let reqFields = [
      {
        "id": "string",
        "name": this.itemTypeForm.value.name,
        "status": 0
      }
    ]

    try {

      let addItemTypeRes = await this.extApi.AddItemType(reqFields);
      console.log(addItemTypeRes)

      await this.loadAllItemTypes()

      this.itemTypeForm.reset();
      this.isLoaderAvailableForItemType = false;

    } catch (e: any) {
      
      console.log(e)
      this.isLoaderAvailableForItemType = false;
    }

  }

  async loadAllItemTypes(){
    
    try {
      
      let itemTypes = await this.extApi.ItemTypes();
      this.allSavedItemTypes = itemTypes.data.filter((el: any) => el.status === 0);

    } catch (e: any) {
      
      console.log(e)
    }
  }

  async removeItemType(i: any){

    this.isLoaderAvailableForItemType = true;

    try {
      
      let removeItemType = await this.extApi.UpdateItemType([{id: this.allSavedItemTypes[i].id, name: this.allSavedItemTypes[i].name, status: 1}])
      console.log(removeItemType)

      await this.loadAllItemTypes()

      this.isLoaderAvailableForItemType = false;

    } catch (e:any) {
      console.log(e)

      this.isLoaderAvailableForItemType = false;
    }

  }

  bindItemTypeDataToUI(data: any, i: any){

    
    let allBottomClzElements = this.actionBtnContainerForItemType.nativeElement.querySelectorAll('.bottom')

    allBottomClzElements.forEach((el:any, idx: any) => {
      
      el.classList.remove('remove')
      el.classList.remove('update')

      if(parseInt(el.id) === i){
        el.classList.remove('remove')
        el.classList.add('update')
        el.innerHTML = "UPDATE"

        this.allSavedItemTypes[idx]['btnTxt'] = 'update'

      }else{
        el.innerHTML = 'REMOVE';
        el.classList.add('remove');
        this.allSavedItemTypes[idx]['btnTxt'] = 'remove'
      }

    });

    this.itemTypeForm.setValue({
      name: data.name,
    })

  }

  async updateItemType(i: any){

    this.isLoaderAvailableForItemType = true;

    try {
      
      let removeItemType = await this.extApi.UpdateItemType([{id: this.allSavedItemTypes[i].id, name: this.itemTypeForm.value.name, status: 0}])
      console.log(removeItemType)

      await this.loadAllItemTypes();
      this.itemTypeForm.reset();
      this.isLoaderAvailableForItemType = false;

    } catch (e:any) {
      console.log(e)

            this.isLoaderAvailableForItemType = false;
    }

  }

  //items
  async addItem(){

    this.isLoaderAvailableForItems = true;

    let reqFields = [
      {
        "id": "string",
        "itemName": this.items.value.itemName,
        "description": this.items.value.description,
        "model": this.items.value.model,
        "powerRating": this.items.value.powerRating,
        "efficiency":this.items.value.efficiency,
        "unitPrice": this.items.value.unitPrice,
        "warrantyPeriod": this.items.value.warrantyPeriod,
        "stockQuantity": this.items.value.stockQuantity,
        "manFcId": this.items.value.ManuFactures,
        "itemTypeId": this.items.value.itemType,
        "brandId":  this.items.value.brandName,
        "status": 0
      }
    ]

    try {

      let addItemRes = await this.extApi.AddItems(reqFields);
      console.log(addItemRes);

      await this.loadAllItems()
      
      this.items.reset();
      this.isLoaderAvailableForItems = false;

    } catch (e: any) {
      
      console.log(e)
      this.isLoaderAvailableForItems = false;
    }

  }

  async loadAllItems(){
    
    try {
      
      let loadedAllItems = await this.extApi.Items();

      loadedAllItems.data.forEach((el: any) => {
        el['itemTypeInUi']      = this.allSavedItemTypes.find((itype: any) => itype.id === el.itemTypeId)?.name || ''
        el['ManuFacturesInUi']  = this.allSavedIManufatureItems.find((mnf: any) => mnf.id === el.manFcId)?.name || ''
        el['brandNameInUi']     = this.allBrandNames.find((brnd: any) => brnd.id === el.brandId)?.brandName || ''
      });  
      
      this.allItems = loadedAllItems.data.filter((el: any) => el.status === 0);

    } catch (e: any) {
      
      console.log(e)
    }
  }

  async removeItem(i: any){

    this.isLoaderAvailableForItems = true;

    try {
      
      let removeItems = await this.extApi.UpdateItem(
        [{
          "id": this.allItems[i].id,
          "itemName": this.allItems[i].itemName,
          "description": this.allItems[i].description,
          "model": this.allItems[i].model,
          "powerRating": this.allItems[i].powerRating,
          "efficiency": this.allItems[i].efficiency,
          "unitPrice": this.allItems[i].unitPrice,
          "warrantyPeriod": this.allItems[i].warrantyPeriod,
          "stockQuantity": this.allItems[i].stockQuantity,
          "manFcId": this.allItems[i].manFcId,
          "itemTypeId":this.allItems[i].itemTypeId,
          "brandId" : this.allItems[i].brandId,
          "status": 1
        }]
      )

      console.log(removeItems)

      await this.loadAllItems()
      this.isLoaderAvailableForItems = false;

    } catch (e:any) {
      console.log(e)

      this.isLoaderAvailableForItems = false;
    }

  }

  bindItemDataToUI(data: any, i: any){
    
    
    let allBottomClzElements = this.actionBtnContainerForItems.nativeElement.querySelectorAll('.bottom')

    allBottomClzElements.forEach((el:any, idx: any) => {
      
      el.classList.remove('remove')
      el.classList.remove('update')

      if(parseInt(el.id) === i){
        el.classList.remove('remove')
        el.classList.add('update')
        el.innerHTML = "UPDATE"

        this.allItems[idx]['btnTxt'] = 'update'

      }else{
        el.innerHTML = 'REMOVE';
        el.classList.add('remove');
        this.allItems[idx]['btnTxt'] = 'remove'
      }
    })

    this.items.setValue({
      itemName:  data.itemName,
      description: data.description,
      model: data.model,
      powerRating: data.powerRating,
      efficiency: data.efficiency,
      unitPrice: data.unitPrice,      
      warrantyPeriod: data.warrantyPeriod,  
      stockQuantity: data.stockQuantity,  
      itemType: data.itemTypeId,
      ManuFactures: data.manFcId,
      brandName: data.brandId,
    })

    console.log( this.items.values)

  }

  async updateItem(i: any){

    this.isLoaderAvailableForItems = true;

    try {
      
      let removeItems = await this.extApi.UpdateItem(
        [{
          "id": this.allItems[i].id,
          "itemName": this.items.value.itemName,
          "description": this.items.value.description,
          "model": this.items.value.model,
          "powerRating": this.items.value.powerRating,
          "efficiency": this.items.value.efficiency,
          "unitPrice": this.items.value.unitPrice,
          "warrantyPeriod": this.items.value.warrantyPeriod,
          "stockQuantity": this.items.value.stockQuantity,
          "manFcId": this.items.value.ManuFactures,
          "itemTypeId": this.items.value.itemType,
          "brandId": this.items.value.brandName,
          "status": 0
        }]
      )

      console.log(removeItems)

      await this.loadAllItems();
      this.items.reset();
      this.isLoaderAvailableForItems = false;

    } catch (e:any) {
      console.log(e)

      this.isLoaderAvailableForItems = false;
    }

  }

  //manufacture
  async addManufature(){

    this.isLoaderAvailableForManuFac = true;

    if(this.manufatureItems.value.name === ''){
      this.isLoaderAvailableForManuFac = false;
      alert("Item is empty")
      return
    }

    if(this.allSavedIManufatureItems.find((el: any) => el.name === this.manufatureItems.value.name)){

      this.isLoaderAvailableForManuFac = false;
      alert("Item has been already added")
      return
    }

    let reqFields = [
      {
        "id"      : "string",
        "name"    : this.manufatureItems.value.name,
        "phoneNo" : this.manufatureItems.value.pNumber,
        "email"   : this.manufatureItems.value.email,
        "address" : this.manufatureItems.value.address,
        "status"  : 0
      }
    ]

    try {

      let addManufactureeRes = await this.extApi.AddManufac(reqFields);
      console.log(addManufactureeRes)

      await this.loadAllIManufatureItems()
      
      this.manufatureItems.reset();
      this.isLoaderAvailableForManuFac = false;

    } catch (e: any) {
      
      console.log(e)
      this.isLoaderAvailableForManuFac = false;
    }

  }

  async loadAllIManufatureItems(){

    try {
      
      let manufacItems = await this.extApi.Manufacturer();
      this.allSavedIManufatureItems = manufacItems.data.filter((el: any) => el.status === 0);


    } catch (e: any) {
      
      console.log(e)
    }
  }

  async removeManuFacItem(i: any){

    this.isLoaderAvailableForManuFac = true;

    try {
      
      let removeManuFacItems = await this.extApi.UpdateManufacturer([{id: this.allSavedIManufatureItems[i].id, name: this.allSavedIManufatureItems[i].name, phoneNo: this.allSavedIManufatureItems[i].phoneNo, email: this.allSavedIManufatureItems[i].email, address: this.allSavedIManufatureItems[i].address, status: 1}])
      console.log(removeManuFacItems)

      await this.loadAllIManufatureItems()
      this.isLoaderAvailableForManuFac = false;

    } catch (e:any) {
      console.log(e)

      this.isLoaderAvailableForManuFac = false;
    }

  }

  bindManuFacDataToUI(data: any, i: any){

    
    let allBottomClzElements = this.actionBtnContainerManufac.nativeElement.querySelectorAll('.bottom')

    allBottomClzElements.forEach((el:any, idx: any) => {
      
      el.classList.remove('remove')
      el.classList.remove('update')

      if(parseInt(el.id) === i){
        el.classList.remove('remove')
        el.classList.add('update')
        el.innerHTML = "UPDATE"

        this.allSavedIManufatureItems[idx]['btnTxt'] = 'update'

      }else{
        el.innerHTML = 'REMOVE';
        el.classList.add('remove');
        this.allSavedIManufatureItems[idx]['btnTxt'] = 'remove'
      }
    })

    this.manufatureItems.setValue({
      name:       data.name,
      pNumber:    data.phoneNo,
      email:      data.email,
      address:    data.address,
    })


  }

  async updateManuFacItem(i: any){

    this.isLoaderAvailableForManuFac = true;

    try {
      
      let updateManuFacRes = await this.extApi.UpdateManufacturer([{id: this.allSavedIManufatureItems[i].id, name: this.manufatureItems.value.name, phoneNo: this.manufatureItems.value.pNumber, email: this.manufatureItems.value.email, address: this.manufatureItems.value.address, status: 0}])
      console.log(updateManuFacRes)

      await this.loadAllIManufatureItems();
      this.manufatureItems.reset();
      this.isLoaderAvailableForManuFac = false;

    } catch (e:any) {
      console.log(e)
      this.isLoaderAvailableForManuFac = false;
      
    }

  }
  
  handleLeftBar() {

    this.flag = !this.flag;
    
    this.communicationService.sendData({ flag: !this.flag });
  }

  //stages
  async addStagDesc(){

    this.isLoaderAvailableForStage = true;

    if(this.stage.value.stagDesc === ''){
      this.isLoaderAvailableForStage = false;
      alert("Stage is empty")
      return
    }

    if(this.allSavedStages.find((el: any) => el.stagDesc === this.stage.value.stagDesc)){

      this.isLoaderAvailableForStage = false;
      alert("Stage is already added")
      return
    }

    let reqFields = [
      {
        "id": "string",
        "stagDesc": this.stage.value.stagDesc,
        "status": 0
      }
    ]

    try {

      let addStageRes = await this.extApi.AddStage(reqFields);
      console.log(addStageRes)

      await this.loaAllStages()
      
      this.stage.reset();
      this.isLoaderAvailableForStage = false;

    } catch (e: any) {
      
      console.log(e)
      this.isLoaderAvailableForStage = false;
    }

  }

  async loaAllStages(){

    try {
      
      let stages = await this.extApi.Stages();
      this.allSavedStages = stages.data.filter((el: any) => el.status === 0);

    } catch (e: any) {
      
      console.log(e)
    }
  }

  async removeStage(i: any){

    this.isLoaderAvailableForStage = true;

    try {
      
      let removeStage = await this.extApi.UpdateStage({id: this.allSavedStages[i].id, stagDesc: this.allSavedStages[i].stagDesc, status: 1})
      console.log(removeStage)

      await this.loaAllStages()
      this.isLoaderAvailableForStage = false;

    } catch (e:any) {
      console.log(e)
      this.isLoaderAvailableForStage = false;
      
    }

  }

  async updateStage(i: any){

    this.isLoaderAvailableForStage = true;

    try {
      
      let updateStageRes = await this.extApi.UpdateStage({id: this.allSavedStages[i].id, stagDesc: this.stage.value.stagDesc, status: 0})
      console.log(updateStageRes)

      await this.loaAllStages();
      this.stage.reset();

      this.isLoaderAvailableForStage = false;

    } catch (e:any) {
      console.log(e)
      this.isLoaderAvailableForStage = false;
      
    }

  }

  bindStageDataToUI(data: any, i: any){

    
    
    let allBottomClzElements = this.actionBtnContainerForStage.nativeElement.querySelectorAll('.bottom')

    allBottomClzElements.forEach((el:any, idx: any) => {
      
      el.classList.remove('remove')
      el.classList.remove('update')

      if(parseInt(el.id) === i){
        el.classList.remove('remove')
        el.classList.add('update')
        el.innerHTML = "UPDATE"

        this.allSavedStages[idx]['btnTxt'] = 'update'

      }else{
        el.innerHTML = 'REMOVE';
        el.classList.add('remove');
        this.allSavedStages[idx]['btnTxt'] = 'remove'
      }

    });

    this.stage.setValue({
      stagDesc: data.stagDesc,
    })


  }

    //profile
    async addProfile(){

      this.isLoaderAvailableForprofile = true;
  
      if(this.profile.value.stagDesc === ''){
        this.isLoaderAvailableForprofile = false;
        alert("profile is empty")
        return
      }
  
      if(this.allSavedprofiles.find((el: any) => el.modeDesc === this.profile.value.modeDesc)){
  
        this.isLoaderAvailableForprofile = false;
        alert("profile is already added")
        return
      }
  
      let reqFields = [
        {
          "id": "string",
          "modeDesc": this.profile.value.modeDesc,
          "status": 0
        }
      ]
  
      try {
  
        let addprofileRes = await this.extApi.AddUserMode(reqFields);
        console.log(addprofileRes)
  
        await this.loaAllprofiles()
        
        this.profile.reset();
        this.isLoaderAvailableForprofile = false;
  
      } catch (e: any) {
        
        console.log(e)
        this.isLoaderAvailableForprofile = false;
      }
  
    }
  
    async loaAllprofiles(){
  debugger
      try {
        
        let profiles = await this.extApi.GetUserMode();
        this.allSavedprofiles = profiles.data.filter((el: any) => el.status === 0);
  
      } catch (e: any) {
        
        console.log(e)
      }
    }
  
    async removeprofile(i: any){
  
      this.isLoaderAvailableForprofile = true;
  
      try {
        
        let removeprofile = await this.extApi.UpdateUserMode([{id: this.allSavedprofiles[i].id, modeDesc: this.allSavedprofiles[i].modeDesc, status: 1}])
        console.log(removeprofile)
  
        await this.loaAllprofiles()
        this.isLoaderAvailableForprofile = false;
  
      } catch (e:any) {
        console.log(e)
        this.isLoaderAvailableForprofile = false;
        
      }
  
    }
  
    async updateprofile(i: any){
  
      this.isLoaderAvailableForprofile = true;
  
      try {
        
        let updateprofileRes = await this.extApi.UpdateUserMode({id: this.allSavedprofiles[i].id, modeDesc: this.profile.value.modeDesc, status: 0})
        console.log(updateprofileRes)
  
        await this.loaAllprofiles();
        this.profile.reset();
  
        this.isLoaderAvailableForprofile = false;
  
      } catch (e:any) {
        console.log(e)
        this.isLoaderAvailableForprofile = false;
        
      }
  
    }
  
    bindprofileDataToUI(data: any, i: any){
  
      
      
      let allBottomClzElements = this.actionBtnContainerForprofile.nativeElement.querySelectorAll('.bottom')
  
      allBottomClzElements.forEach((el:any, idx: any) => {
        
        el.classList.remove('remove')
        el.classList.remove('update')
  
        if(parseInt(el.id) === i){
          el.classList.remove('remove')
          el.classList.add('update')
          el.innerHTML = "UPDATE"
  
          this.allSavedprofiles[idx]['btnTxt'] = 'update'
  
        }else{
          el.innerHTML = 'REMOVE';
          el.classList.add('remove');
          this.allSavedprofiles[idx]['btnTxt'] = 'remove'
        }
  
      });
  
      this.profile.setValue({
        modeDesc: data.modeDesc,
      })
  
  
    }

      //warrenty
      async addwarrenty(){

        this.isLoaderAvailableForwarrenty = true;
    
        if(this.warrenty.value.actionDesc === ''){
          this.isLoaderAvailableForwarrenty = false;
          alert("warrenty is empty")
          return
        }
    
        if(this.allSavedwarrentys.find((el: any) => el.actionDesc === this.warrenty.value.actionDesc)){
    
          this.isLoaderAvailableForwarrenty = false;
          alert("warrenty is already added")
          return
        }
    
        let reqFields = [
          {
            "id": "string",
            "actionDesc": this.warrenty.value.actionDesc,
            "status": 0
          }
        ]
    
        try {
    
          let addwarrentyRes = await this.extApi.AddWarrentyItemAction(reqFields);
          console.log(addwarrentyRes)
    
          await this.loaAllwarrentys()
          
          this.warrenty.reset();
          this.isLoaderAvailableForwarrenty = false;
    
        } catch (e: any) {
          
          console.log(e)
          this.isLoaderAvailableForwarrenty = false;
        }
    
      }
    
      async loaAllwarrentys(){
    debugger
        try {
          
          let warrentys = await this.extApi.GetWarrentyItemAction();
          this.allSavedwarrentys = warrentys.data.filter((el: any) => el.status === 0);
    
        } catch (e: any) {
          
          console.log(e)
        }
      }
    
      async removewarrenty(i: any){
    
        this.isLoaderAvailableForwarrenty = true;
    
        try {
          
          let removewarrenty = await this.extApi.UpdateWarrentyItemAction([{id: this.allSavedwarrentys[i].id, actionDesc: this.allSavedwarrentys[i].actionDesc, status: 1}])
          console.log(removewarrenty)
    
          await this.loaAllwarrentys()
          this.isLoaderAvailableForwarrenty = false;
    
        } catch (e:any) {
          console.log(e)
          this.isLoaderAvailableForwarrenty = false;
          
        }
    
      }
    
      async updatewarrenty(i: any){
    
        this.isLoaderAvailableForwarrenty = true;
    
        try {
          
          let updatewarrentyRes = await this.extApi.UpdateWarrentyItemAction({id: this.allSavedwarrentys[i].id, actionDesc: this.warrenty.value.actionDesc, status: 0})
          console.log(updatewarrentyRes)
    
          await this.loaAllwarrentys();
          this.warrenty.reset();
    
          this.isLoaderAvailableForwarrenty = false;
    
        } catch (e:any) {
          console.log(e)
          this.isLoaderAvailableForwarrenty = false;
          
        }
    
      }
    
      bindwarrentyDataToUI(data: any, i: any){
    
        
        
        let allBottomClzElements = this.actionBtnContainerForwarrenty.nativeElement.querySelectorAll('.bottom')
    
        allBottomClzElements.forEach((el:any, idx: any) => {
          
          el.classList.remove('remove')
          el.classList.remove('update')
    
          if(parseInt(el.id) === i){
            el.classList.remove('remove')
            el.classList.add('update')
            el.innerHTML = "UPDATE"
    
            this.allSavedwarrentys[idx]['btnTxt'] = 'update'
    
          }else{
            el.innerHTML = 'REMOVE';
            el.classList.add('remove');
            this.allSavedwarrentys[idx]['btnTxt'] = 'remove'
          }
    
        });
    
        this.warrenty.setValue({
          actionDesc: data.actionDesc,
        })
    
    
      }
  
  //common
  async removeUpdateOpt(txt:any, i: any, sec: any){
    
    switch (sec) {

      case 'company':
        
        if(txt === 'remove' || !txt){
        
          await this.removeCompany(i)
        }
        else{
          await this.updateCompany(i)
        }

        break;
    
      case 'brand':

        if(txt === 'remove' || !txt){
          
          await this.removebrand(i)
        }
        else{
          await this.updateBrand(i)
        }

        break;

      case 'designation':

        if(txt === 'remove' || !txt){
          
          await this.removefeedback(i)
        }
        else{
          await this.updateDesignation(i)
        }

        break;

      case 'docType':

        if(txt === 'remove' || !txt){
          
          await this.removeDocType(i)
        }
        else{
          await this.updateDocType(i)
        }

        break;

      case 'feedBackStatus':

        if(txt === 'remove' || !txt){
          
          await this.removefeedbackStatus(i)
        }
        else{
          await this.updateFeedbackStatus(i)
        }

        break;

      case 'feedBackType':

        if(txt === 'remove' || !txt){
          
          await this.removefeedbackType(i)
        }
        else{
          await this.updateFeedbackType(i)
        }

        break;

       case 'itemType':

        if(txt === 'remove' || !txt){
          
          await this.removeItemType(i)
        }
        else{
          await this.updateItemType(i)
        }

        break;

      case 'item':

        if(txt === 'remove' || !txt){
          
          await this.removeItem(i)
        }
        else{
          await this.updateItem(i)
        }

        break;

      case 'manuFacture':

        if(txt === 'remove' || !txt){
          
          await this.removeManuFacItem(i)
        }
        else{
          await this.updateManuFacItem(i)
        }

        break;

      case 'stage':

        if(txt === 'remove' || !txt){
          
          await this.removeStage(i)
        }
        else{
          await this.updateStage(i)
        }

        break;

      case 'profile':

        if(txt === 'remove' || !txt){
          
          await this.removeprofile(i)
        }
        else{
          await this.updateprofile(i)
        }

        break;

      case 'warrenty':

        if(txt === 'remove' || !txt){
          
          await this.removewarrenty(i)
        }
        else{
          await this.updatewarrenty(i)
        }

       break;
    }
  }

  clearAll(){
    this.isLoading = false;
  
    // brands
    this.step = signal(0);
    this.brand.reset();
    this.allBrandNames = []

    //company
    this.companyItems.reset();
    this.companyLogo = "";
    this.allCompanyData = [];

    this.removeUpdateTextForBrand = 'REMOVE';
    this.removeUpdateTextForComp = 'REMOVE';
    this.removeUpdateTextForDesig = 'REMOVE';
    this.removeUpdateTextForDocType = 'REMOVE';
    this.removeUpdateTextForFeedBackStatus = 'REMOVE';
    this.removeUpdateTextForFeedBackType = 'REMOVE';
    this.removeUpdateTextForItemType = 'REMOVE';
    this.removeUpdateTextForStage = 'REMOVE';
    this.removeUpdateTextForItems = 'REMOVE';
    this.removeUpdateTextForManuFac = 'REMOVE';
    this.removeUpdateTextForProfile = 'REMOVE'
    this.removeUpdateTextForwarrenty = 'REMOVE'

    this.isLoaderAvailableForBrand = false;
    this.isLoaderAvailableForCompany = false;
    this.isLoaderAvailableForDesignation = false;
    this.isLoaderAvailableForDocType = false;
    this.isLoaderAvailableForFeedbackStatus = false;
    this.isLoaderAvailableForFeedbackType = false;
    this.isLoaderAvailableForItemType = false;
    this.isLoaderAvailableForItems = false;
    this.isLoaderAvailableForManuFac = false;
    this.isLoaderAvailableForStage = false;

    this.selectedCompanyItemIdx = '';

    //Designation
    this.designation.reset();
    this.alldesoignations = [];

    //Doc type
    this.docType.reset();
    this.allSavedDocsTypes;

    //feedBackStatus
    this.feedbackStatusForm.reset();
    this.allfeedbackStatus = [];

    //feedback types
    this.feedbackTypeForm.reset();
    this.allfeedbackTypes = [];

    //item types
    this.itemTypeForm.reset();
    this.allSavedItemTypes = [];

    //Items
    this.items.reset();
    this.itemTypes = [];
    this.allItems = [];
    this.manuFac = [];
    
    //Manufacture
    this.manufatureItems.reset();
    this.allSavedIManufatureItems;

    //stages
    this.stage.reset();
    this.allSavedStages = [];
    this.disableDocTypeRemoveIcon = false;

    //profile
    this.profile.reset();
    this.allSavedprofiles = [];

    
    //warrenty
    this.warrenty.reset();
    this.allSavedwarrentys = [];
  }
}
