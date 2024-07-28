import { StepperOrientation } from '@angular/cdk/stepper';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, OnInit, Output, QueryList, ViewChild, ViewChildren, inject } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Observable, firstValueFrom, map } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { ExtApiService } from 'src/app/ext-api.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { SafePipe } from 'src/app/safe.pipe';
import { CustomerSearchComponent } from 'src/app/sharedComp/customer-search/customer-search.component';
import { CommonLoaderComponent } from 'src/app/sharedComp/common-loader/common-loader.component';
import { MatDialog } from '@angular/material/dialog';
import { NotificationDialogComponent, NotificationType } from 'src/app/sharedComp/notification-dialog/notification-dialog.component';


@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
  providers: [SafePipe]
})
export class CustomersComponent implements OnInit, AfterViewInit{

  @ViewChild('customerSearch') CustomerSearchComponent: CustomerSearchComponent | any;
  @ViewChild('loader') CommonLoaderComponent: CommonLoaderComponent | any;
  
  flag: boolean = false;
  step = 0;
  phoneNumbers = [] as any;
  emails = [] as any;
  customerNameDetails: any;
  customerPhoneNumbers: any;
  customerEmails: any;
  stepperOrientation: any;
  status : any = 'new';
  customerNameDetaisUpdateFields: any = {};
  custImage: any;
  uploadedImg: any;
  imgAvailable: boolean = false;
  UploadFileImgAvailable: boolean = false;
  custImgAvailable: boolean = false;
  bindingData: any;
  clonedPhoneNum: any = [];
  clonedEmails: any = [];
  uploadedFileIcon: any;
  documentDetails: any;
  fileAvailable: boolean = false;
  buttonText = 'Add customer'
  
  documents = [] as any
  
  phoneNumber = '';
  email = ''
  phoneNumUpdated: boolean = false;
  emailUpdated: boolean = false;
  addressUpdate: boolean = false;
  clonedCustAddersses = [] as any;
  updateDocBtnDisabled: boolean = false;

  addresses: { addLine1: string, addLine2: string, addLine3: string, isDefault: any, status: any, custId: any, id: any, readonly: boolean}[] = [
    
  ];

  isAddressEmpty: boolean = true;
  uploadedDoc: any;
  documentTypes = [] as any;

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  copyOfDocuments = {} as any;
  selectedCustomerAllDocCloned: any;
  setDefPhone: boolean = false;
  setDefEmail: boolean = false;
  setDefAddress: boolean = false;
  URIBlob: any;
  addressessData = [] as any;
  isLoaderAvailable: boolean = false;
  showLoader = false;

  constructor(private communicationService: AppService, private extApi : ExtApiService, private formBuilder: FormBuilder, breakpointObserver: BreakpointObserver, private cdr: ChangeDetectorRef, private _snackBar: MatSnackBar, private safe: SafePipe, private dialog: MatDialog){

    this.customerNameDetails = this.formBuilder.group({
      firstName:    ['', Validators.required],
      middleName:   ['', Validators.required],
      lastName:     ['', Validators.required],
      surName:      ['', Validators.required],
      initials:     ['', Validators.required],
      nic:          ['', [Validators.required, this.nicValidator]],
      gender:       ['', Validators.required],
      title:        ['', Validators.required],
    });
  
    this.customerPhoneNumbers = this.formBuilder.group({
      phoneNumber: ['', Validators.required],
    });

    this.customerEmails = this.formBuilder.group({
      custEmail: ['', Validators.required],
    });

    this.documentDetails = this.formBuilder.group({
      docName:        ['', Validators.required],
      displayName:    ['', Validators.required],
      docType:        ['', Validators.required],
      remark:         ['', Validators.required]
    });

    stepperOrientation: Observable<StepperOrientation>;

    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));
  
  }

  async ngAfterViewInit(): Promise<void> {
   
    this.CommonLoaderComponent.show();

    await this.getAllCustomers();
    await this.getAllDocTypes();

    this.CommonLoaderComponent.hide();
  }
  
  handleLeftBar() {

    this.flag = !this.flag;
    
    this.communicationService.sendData({ flag: !this.flag });
  }

  ngOnInit(): void {

  }
  
  setStep(index: number) {
    this.step = index;
  }

  nicValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const tenDigitNicRegex = /^\d{9}[0-9vV]$/;
    const twelveDigitNicRegex = /^\d{12}$/;

    if (!tenDigitNicRegex.test(control.value) && !twelveDigitNicRegex.test(control.value)) {
      return { invalidNic: true };
    }
    return null;
  }
  
  async registerCustomer(section: any){

          this.CommonLoaderComponent.show();

    if((!this.customerNameDetails.value.firstName || !this.customerNameDetails.value.middleName || !this.customerNameDetails.value.lastName || !this.customerNameDetails.value.surName || !this.customerNameDetails.value.initials || !this.customerNameDetails.value.nic) && (this.phoneNumbers.length === 1 && this.emails.length === 1)){

      this.notifyMessage("Register Customer", "Please fill customer details section",NotificationType.warn)

            this.CommonLoaderComponent.hide();
      return
    }

    if((!this.customerNameDetails.value.firstName || !this.customerNameDetails.value.middleName || !this.customerNameDetails.value.lastName || !this.customerNameDetails.value.surName || !this.customerNameDetails.value.initials || !this.customerNameDetails.value.nic) && (this.phoneNumbers.length === 0 || this.emails.length === 0)){
      this.notifyMessage("Register Customer", "Please fill customer details section",NotificationType.warn)
            this.CommonLoaderComponent.hide();
      return
    }

    if(this.addresses.length > 0 && this.addresses.some((obj: any) => !obj.addLine1 || !obj.addLine2 || !obj.addLine3)){
      this.notifyMessage("Register Customer", "Please fill customer details section",NotificationType.warn)
            this.CommonLoaderComponent.hide();
      return
    }

    let addCustRes;
    let requestedFields = [];

    if(this.status === 'update'){

        this.customerNameDetaisUpdateFields = {};

        this.customerNameDetaisUpdateFields["fName"] = this.customerNameDetails.value.firstName
        this.customerNameDetaisUpdateFields["mName"] = this.customerNameDetails.value.middleName
        this.customerNameDetaisUpdateFields["lName"] = this.customerNameDetails.value.lastName
        this.customerNameDetaisUpdateFields["surName"] = this.customerNameDetails.value.surName
        this.customerNameDetaisUpdateFields["initials"] = this.customerNameDetails.value.initials
        this.customerNameDetaisUpdateFields["nic"] = this.customerNameDetails.value.nic
        this.customerNameDetaisUpdateFields["id"] = this.bindingData.id;
        this.customerNameDetaisUpdateFields["stageId"] = "000001"
        this.customerNameDetaisUpdateFields["proImageName"] = "",
        this.customerNameDetaisUpdateFields["gender"] = this.customerNameDetails.value.gender,
        this.customerNameDetaisUpdateFields["title"] = this.customerNameDetails.value.title,
        this.customerNameDetaisUpdateFields["dispName"] = this.customerNameDetails.value.title + ' ' + this.customerNameDetails.value.firstName + ' ' + this.customerNameDetails.value.lastName

        requestedFields.push(this.customerNameDetaisUpdateFields);

        addCustRes = await this.extApi.updateCustomer(requestedFields);

        if(addCustRes.type === 'Success')
          this.openSnackBar('Successfully updated the customer details')

        if(this.phoneNumUpdated){

          let newDataSet = this.clonedPhoneNum.filter((clNum: any) => clNum.status === 0);
          let deleteDataSet = this.clonedPhoneNum.filter((clNum: any) => clNum.status === 1);

          if(newDataSet.length > 0){

            newDataSet.forEach((el: any) => {

              el.custId =  this.bindingData.id
  
            })

            let addPhoneRes = await this.extApi.addNewCustomerPhone(newDataSet);

            if(addPhoneRes.type === 'Success')
              this.openSnackBar(newDataSet.length > 1 ? 'New phone numbers have been successfully added': 'New phone number has been successfully added')
          }

          if(deleteDataSet.length > 0){

            deleteDataSet.forEach((el: any) => {

              let foundObj = this.bindingData.custPhones.find((cstMl : any) => cstMl.phone === el.phone);
  
              el.custId = foundObj.custId;
              el.id = foundObj.id
  
  
            })

            debugger

            let updatePhoneRes = await this.extApi.updateCustPhones(deleteDataSet);

            if(updatePhoneRes.type === 'Success')
              this.openSnackBar(deleteDataSet.length > 1 ? 'The numbers have been successfully deleted' : 'The number has been successfully deleted')

          }

          if(this.setDefPhone){

            this.clonedPhoneNum.forEach((el: any) => {

              let foundObj = this.bindingData.custPhones.find((cstMl : any) => cstMl.phone === el.phone);
  
              el.custId = foundObj.custId;
              el.id = foundObj.id;
              el.status = '0'
  
  
            })
  
            let updatePhoneRes = await this.extApi.updateCustPhones(this.clonedPhoneNum);
  
            if(updatePhoneRes.type === 'Success')
              this.openSnackBar(this.clonedPhoneNum.length > 1 ? 'All phone numbers has been updated' : 'The number has been successfully updated')
  

          }

        }

        if(this.addressUpdate){

          let newDataSet = this.clonedCustAddersses.filter((clNum: any) => clNum.status === 0);
          let deleteDataSet = this.clonedCustAddersses.filter((clNum: any) => clNum.status === 1);
          let updateAddress;

          if(newDataSet.length > 0){

            newDataSet.forEach((el: any) => {

              el.custId =  this.bindingData.id
  
            })

            let addCustAddress = await this.extApi.AddNewCustomerAddress(newDataSet);

            if(addCustAddress.type === 'Success')
              this.openSnackBar(newDataSet.length > 1 ? 'The new Addresses have been recorded' : 'The new Address has been recorded')
          }

          if(deleteDataSet.length > 0){

            updateAddress = await this.extApi.updateCustAddresses(deleteDataSet);

            if(updateAddress.type === 'Success')
              this.openSnackBar(deleteDataSet.length > 1 ? 'The Addresses have been deleted' : 'The Address has been deleted')
          }
          
          if(this.setDefAddress && updateAddress?.type !== 'Success'){

            this.clonedCustAddersses.forEach((el: any) => {

              let foundObj = this.bindingData.custAddresses.find((cstMl : any) => cstMl.addLine1 === el.addLine1 && cstMl.addLine2 === el.addLine2);
  
              el.custId = foundObj.custId;
              el.id = foundObj.id;
              el.status = '0'
  
  
            })
  
            let updatePhoneRes = await this.extApi.updateCustAddresses(this.clonedCustAddersses);
  
            if(updatePhoneRes.type === 'Success')
              this.openSnackBar(this.clonedEmails.length > 1 ? 'All addressess have been updated' : 'The addressess has been successfully updated')
  

          }

        }

        if(this.emailUpdated){

          let newDataSet = this.clonedEmails.filter((clNum: any) => clNum.status === 0);
          let deleteDataSet = this.clonedEmails.filter((clNum: any) => clNum.status === 1);

          if(newDataSet.length > 0){

            newDataSet.forEach((el: any) => {

              el.custId =  this.bindingData.id
  
            })

            let addNewEmailRes = await this.extApi.addNewCustomerEmail(newDataSet);

            if(addNewEmailRes.type === 'Success')
              this.openSnackBar(newDataSet.length > 1 ? 'The Email have been added' : 'The Emails has been added')
          }

          if(deleteDataSet.length > 0){

            deleteDataSet.forEach((el: any) => {

              let foundObj = this.bindingData.custEmails.find((cstMl : any) => cstMl.email === el.email);
  
              el.custId = foundObj.custId;
              el.id = foundObj.id
  
  
            })

            let updatedEmailRes = await this.extApi.updateCustEmails(deleteDataSet);

            if(updatedEmailRes.type === 'Success')
              this.openSnackBar(newDataSet.length > 1 ? 'The Email have been deleted' : 'The Emails has been deleted' )

          }

          if(this.setDefEmail){

            this.clonedEmails.forEach((el: any) => {

              let foundObj = this.bindingData.custEmails.find((cstMl : any) => cstMl.email === el.email);
  
              el.custId = foundObj.custId;
              el.id = foundObj.id;
              el.status = '0'
  
  
            })
  
            let updatePhoneRes = await this.extApi.updateCustEmails(this.clonedEmails);
  
            if(updatePhoneRes.type === 'Success')
              this.openSnackBar(this.clonedEmails.length > 1 ? 'All emails have been updated' : 'The email has been successfully updated')
          
              
          }
  
        }
        
    }else{

      this.customerNameDetaisUpdateFields = {

        "id"          : "string",
        "stageId"     : "000001",
        "proImageName": "string",
        "fName"       : this.customerNameDetails.value.firstName,
        "mName"       : this.customerNameDetails.value.middleName,
        "lName"       : this.customerNameDetails.value.lastName,
        "surName"     : this.customerNameDetails.value.surName,
        "initials"    : this.customerNameDetails.value.initials,
        "nic"         : this.customerNameDetails.value.nic,
        "gender"      : this.customerNameDetails.value.gender,
        "title"       : this.customerNameDetails.value.title,
        "dispName"    : this.customerNameDetails.value.title + ' ' + this.customerNameDetails.value.firstName + ' ' + this.customerNameDetails.value.lastName
        
      }

      requestedFields =    
        {
          "customer": this.customerNameDetaisUpdateFields,
          ...(this.phoneNumbers.length !== 0 && {"customerPhones": this.phoneNumbers}),
          ...(this.emails.length !== 0 && {"customerEmail": this.emails}),
          ...(this.clonedCustAddersses.length !== 0 && {"customerAddresses": this.clonedCustAddersses})
        } as any;
      

      addCustRes = await this.extApi.registerCustomer(requestedFields)     

      if(addCustRes.type === 'Success')
        this.openSnackBar('New Customer has been registered')
    }   

    try {       


      if(this.imgAvailable){
        console.log(addCustRes)
        const formData = new FormData();

        formData.append('image', this.custImage, this.custImage.name);
        formData.append('CustId', addCustRes.data[0] || this.bindingData.id);
  
        try {

          let profileImageUploadRes = await this.extApi.UpdateCustomerProfileImg(formData);
          
          if(profileImageUploadRes.type === 'Success')
            this.openSnackBar('Profile picture has been added successfully')

        } catch (error) {
          this.openSnackBar('Something went wrong while uploading profile picture')
                this.CommonLoaderComponent.hide();
        }
      }

      if(this.UploadFileImgAvailable){

        if(!this.documentDetails.value.docName || !this.documentDetails.value.docName || !this.documentDetails.value.docType || !this.documentDetails.value.remark){
          this.openSnackBar('Please fill all the field related to document')
          return;
        }

        try {
          
          let uploadDocRes = await this.uploadUserDoc(addCustRes?.data[0] || this.bindingData.id);

          this.openSnackBar('Document has been added successfully')

        } catch (error) {
          
          console.log(error)
                this.CommonLoaderComponent.hide();
        }

      }

      this.getAllCustomers();
      this.newCustomer();
      
      this.UploadFileImgAvailable = false;
      this.imgAvailable = false;
      this.custImgAvailable = false;

            this.CommonLoaderComponent.hide();

    } catch (e: any) {
      console.log(e)
            this.CommonLoaderComponent.hide();
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

  async uploadImage(e : any){

    const file = e.target.files[0];
    this.custImage = e.target.files[0];

      if (file.length === 0)
        return;
  
  
      const reader = new FileReader();
      reader.readAsDataURL(file); 
      reader.onload = (_event) => { 
        const base64String = (reader.result as string).replace(/^data:image\/[a-z]+;base64,/, '');
        this.uploadedImg = base64String;

        e.target.value = null;
      } 

    this.imgAvailable = true;
    this.custImgAvailable = true;
  }

  async uploadFile(e : any){

    
    const file = e.target.files;
    this.uploadedDoc = file[0]

    if(!file[0].type.includes('pdf')){

      this.notifyMessage("Document Upload", "Uploaded file type is not supported please upload PDF format files" ,NotificationType.warn)
      return;
    }
     

    this.UploadFileImgAvailable = true;
    this.uploadedFileIcon = ""
  }

  //get the data after select the customer......................
  async bindCutomerData(custData :any){
    
          this.CommonLoaderComponent.show();

    this.newCustomer();

    this.status = 'update';
    this.buttonText = 'Upate Customer';

    let custEmailPhone = await this.extApi.getAllCustomers({custID: custData.id} as any);
    let custDoc = await this.extApi.GetCustomerDocs({custID: custData.id} as any);

    console.log(custDoc)

    if(custEmailPhone.data[0][0].custPhones && custEmailPhone.data[0][0].custPhones.length !== 0){

      let filterNotDeletdEmailData = custEmailPhone.data[0][0].custPhones.filter((el: any) => el.status !== 1);

      filterNotDeletdEmailData.forEach((el: any) => el.status = '');

      this.phoneNumbers = [...filterNotDeletdEmailData];
      this.clonedPhoneNum = [...filterNotDeletdEmailData];
    }

    if(custEmailPhone.data[0][0].custAddresses && custEmailPhone.data[0][0].custAddresses.length !== 0){

      let filteNotDeletedAddress = custEmailPhone.data[0][0].custAddresses.filter((el: any) => el.status !== 1);

      filteNotDeletedAddress.forEach((el: any) => el.status = '');

      this.clonedCustAddersses = [...filteNotDeletedAddress];
      this.addressessData = [...filteNotDeletedAddress];

      
      this.addresses = [];

      this.clonedCustAddersses.forEach((el: any) => {
      
        this.addresses.push({addLine1: el.addLine1, addLine2: el.addLine2, addLine3: el.addLine3, isDefault: el.isDefault, status: '' , custId: el.custId, id: el.id, readonly: true})
      });

    }

    if(custEmailPhone.data[0][0].custEmails &&  custEmailPhone.data[0][0].custEmails.length !== 0){

      let filterNotDeletedPhoneData = custEmailPhone.data[0][0].custEmails.filter((el: any) => el.status !== 1);

      filterNotDeletedPhoneData.forEach((el: any) => el.status = '');
      
      this.emails = [...filterNotDeletedPhoneData];
      this.clonedEmails = [...filterNotDeletedPhoneData];
    }

    if(custData.profileImage && custData.profileImage !== 'AA=='){
      this.custImage = custData.profileImage;

      this.uploadedImg = custData.profileImage

      this.custImgAvailable = true;

    }else{
      this.custImgAvailable = false;
    }

    if(custDoc.data && custDoc.data.length !== 0){

      let filterNotDeletedDocData = custDoc.data.filter((el: any) => el.status !== 1);

      this.documents = filterNotDeletedDocData.reduce((acc: any, obj:any) => {
        const { docTypeId, displayFileName } = obj;
        if (!acc[docTypeId]) {
          acc[docTypeId] = [displayFileName];
        } else {
          acc[docTypeId].push(displayFileName);
        }
        return acc;
      }, {});

      console.log(this.documentTypes)
      console.log(this.documents)
      console.log(filterNotDeletedDocData)
      this.copyOfDocuments = {...this.documents};
      this.selectedCustomerAllDocCloned = [...filterNotDeletedDocData];
    }
    
    this.customerNameDetails.setValue({
      firstName:    custData.fName,
      middleName:   custData.mName,
      lastName:     custData.lName,
      surName:      custData.surName,
      initials:     custData.initials,
      nic:          custData.nic,
      gender: custData.gender,
      title: custData.title,
    });

    this.bindingData = custData;
    this.bindingData['custPhones'] = this.clonedPhoneNum;
    this.bindingData['custEmails'] = this.clonedEmails;
    this.bindingData['custAddresses'] = this.clonedCustAddersses;
    this.bindingData['custDocuments'] = this.copyOfDocuments;

          this.CommonLoaderComponent.hide();
  }

  newCustomer(){

    this.buttonText = 'Add Customer';

    this.customerNameDetaisUpdateFields = {},
    this.phoneNumbers = [],
    this.emails = [],
    this.clonedCustAddersses = [],
    this.customerNameDetails.reset();
    this.clonedPhoneNum = [];
    this.clonedEmails = [];
    this.status = "new";
    this.UploadFileImgAvailable = false;
    this.addresses = [];
    this.addressUpdate = false;
    this.emailUpdated = false;
    this.phoneNumUpdated = false;
    this.imgAvailable = false;
    this.custImgAvailable = false;
    this.status = "new"
    this.documentDetails.reset();
    this.setDefPhone = false;
    this.setDefEmail = false;
    this.copyOfDocuments = [];
    this.URIBlob = '';
    this.documents = [];
    this.updateDocBtnDisabled = false;
  }

  addPhoneNumber() {
      
    if(this.phoneNumber === ""){
      this.notifyMessage("Add phone number", "Please enter your phone number" ,NotificationType.warn)
      return
    }

    const digitsOnly = this.phoneNumber.replace(/\D/g, '');
    if (digitsOnly.length !== 10 || /\D/.test(this.phoneNumber)) {
      this.notifyMessage("Add phone number", "Invalid phone number" ,NotificationType.warn)
      return
    }

    if(this.phoneNumbers.find((el: any) => el.phone === this.phoneNumber)){
      this.notifyMessage("Add phone number", "This is already added to the list" ,NotificationType.warn)
      return
    }

    if (this.phoneNumber) {

      this.phoneNumbers.push({id: 'string', phone: this.phoneNumber, isDefault: 0, status: 0, custId: 'string'});
      this.clonedPhoneNum.push({id: 'string', phone: this.phoneNumber, isDefault: 0, status: 0, custId: 'string'});

      this.phoneNumber = '';

      this.phoneNumUpdated = true;

    }

  }

  removePhoneNumber(index: number, phoneNum: any) {

    this.phoneNumUpdated = true;

    let findIdx = this.clonedPhoneNum.findIndex((el:any) => el.phone === phoneNum);

    if(this.phoneNumbers[index].status === 0){

      this.phoneNumbers.splice(index, 1);
      this.clonedPhoneNum.splice(findIdx, 1);

    }
    else{
      this.phoneNumbers.splice(index, 1);

      if(findIdx !== -1)
        this.clonedPhoneNum[findIdx].status = 1
    }


    if(this.clonedPhoneNum.length <= 0 && this.status === 'update'){
      this.phoneNumUpdated = false;
    }else if(this.phoneNumbers.length <= 0 && this.status === 'new'){
      this.phoneNumUpdated = false;
    }
  }
  
  addEmail() {
  
    if(this.email === ""){
      this.notifyMessage("Add phone email", "Please enter your phone email" ,NotificationType.warn)
      return
    }

    const email = this.email.toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+$/; // Basic email structure check
    const containsGmail = email.endsWith('@gmail.com');
    const symbolsRegex = /[!#$%^&*(),?":{}|<>]/; // Add any symbols you want to disallow

    if (!emailRegex.test(email) || !containsGmail || symbolsRegex.test(email)) {
      this.notifyMessage("Add phone email", "Invalid email address" ,NotificationType.warn)
      return
    }


    if(this.emails.find((el: any) => el.email === this.email)){
      this.notifyMessage("Add phone email", "This is already added to the list" ,NotificationType.warn)
      return
    }

    if (this.email) {
      this.emails.push({id: 'string', email: this.email, isDefault: 0, status: 0, custId: 'string'});
      this.clonedEmails.push({id: 'string', email: this.email, isDefault: 0, status: 0, custId: 'string'});
      this.email = '';

      this.emailUpdated = true;
    }
  }

  removeEmail(index: number, email: any) {
   
    this.emailUpdated = true;

    let findIdx = this.clonedEmails.findIndex((el:any) => el.email === email);

    if(this.emails[index].status === 0){

      this.emails.splice(index, 1);
      this.clonedEmails.splice(findIdx, 1);

    }
    else{
      this.emails.splice(index, 1);

      if(findIdx !== -1)
        this.clonedEmails[findIdx].status = 1
    }


    if(this.clonedEmails.length <= 0 && this.status === 'update'){
      this.emailUpdated = false;
    }else if(this.emails.length <= 0 && this.status === 'new'){
      this.emailUpdated = false;
    }

  }

  setDefault(type: any, index: number, event: any){

    console.log(this.clonedPhoneNum)

    switch (type) {

      case "phoneNum":
      
        this.phoneNumbers.forEach((phoneNumber: any, i: any) => {
            phoneNumber.isDefault = 0;
            let foundPhoneObjPhone = this.clonedPhoneNum.findIndex((cstMl: any) => cstMl.phone === phoneNumber.phone);
            if (foundPhoneObjPhone !== -1) {
                this.clonedPhoneNum[foundPhoneObjPhone].isDefault = 0;
            }
        });

          this.phoneNumbers[index].isDefault = 1;
          let foundPhoneObjPhone = this.clonedPhoneNum.findIndex((cstMl: any) => cstMl.phone === this.phoneNumbers[index].phone);
          if (foundPhoneObjPhone !== -1) {
              this.clonedPhoneNum[foundPhoneObjPhone].isDefault = 1;

          }
          
          this.phoneNumUpdated = true;
          this.setDefPhone = true;

        break;

      case "email":

          this.emails.forEach((email: any, i: any) => {
            email.isDefault = 0;
            let foundPhoneObjEmail = this.clonedEmails.findIndex((cstMl: any) => cstMl.email === email.email);
            if (foundPhoneObjEmail !== -1) {
                this.clonedEmails[foundPhoneObjEmail].isDefault = 0;
            }
          });

          this.emails[index].isDefault = 1;
          let foundPhoneObjEmail = this.clonedEmails.findIndex((cstMl: any) => cstMl.email === this.emails[index].email);
          if (foundPhoneObjEmail !== -1) {
              this.clonedEmails[foundPhoneObjEmail].isDefault = 1;

          }
          
        this.emailUpdated = true;
        this.setDefEmail = true;
        break;

      case "address":
            this.addresses.forEach((address, i) => {
              address.isDefault = 0;
              let foundAddressObj = this.clonedCustAddersses.findIndex((cstMl: any) => cstMl.addLine1 === address.addLine1 && cstMl.addLine2 === address.addLine2);
              if (foundAddressObj !== -1) {
                  this.clonedCustAddersses[foundAddressObj].isDefault = 0;
              }
          });
      
      
          this.addresses[index].isDefault = 1;
          let foundAddressObj = this.clonedCustAddersses.findIndex((cstMl: any) => cstMl.addLine1 === this.addresses[index].addLine1 && cstMl.addLine2 === this.addresses[index].addLine2);
          if (foundAddressObj !== -1) {
              this.clonedCustAddersses[foundAddressObj].isDefault = 1;
          }
          this.addressUpdate = true;
          this.setDefAddress = true;
        break;

      default:
        break;
    }
  }

  addAddressFields() {

    this.addresses.push({ addLine1: '', addLine2: '', addLine3: '' , isDefault: 0, status: '', custId: "string", id: 'string', readonly: false});
  
  }

  removeAddressFields(index: number, id: any) {
    
    this.addressUpdate = true;

    let findIdx = this.clonedCustAddersses.findIndex((el:any) => el.id === id);

    if(this.addresses[index].status === 0){

      this.addresses.splice(index, 1);
      this.clonedCustAddersses.splice(findIdx, 1);

    }
    else{

      this.addresses.splice(index, 1);

      if(findIdx !== -1)
        this.clonedCustAddersses[findIdx].status = 1
    }
  }

  onAddressChange(line1: any, line2: any, line3: any, index: any) {
    
    this.clonedCustAddersses[index] = {addLine1: line1, addLine2: line2, addLine3: line3, isDefault: 0, status: 0, custId: "string", id: 'string', readonly: false}
    this.addresses[index] = {addLine1: line1, addLine2: line2, addLine3: line3, isDefault: 0, status: 0, custId: "string", id: 'string', readonly: false};

    this.addressUpdate = true;
      
        Object.values(this.addresses).forEach((el:any) => {
          if( el.addLine1 !== '' || el.addLine2 !== '' || el.addLine3 !== '') 
            this.isAddressEmpty = false 
          else 
            this.isAddressEmpty = true
        })
  }

  async getAllDocTypes(){
   
    try {
      
      let result = await this.extApi.DocTypes();
      this.documentTypes = result.data

    } catch (e: any) {
      console.log(e.error)
    }
    
  }

  async uploadUserDoc(custID: any){

    let DocTypeId : any;

    try {


        this.documentTypes.forEach((el: any) => {
        
          if(el.name === this.documentDetails.value.docType){
            DocTypeId = el.id
          }
  
        });

        const formData = new FormData();

        formData.append('Doc', this.uploadedDoc, this.uploadedDoc.name);
        formData.append('Id', 'string');
        formData.append('DocTypeId', DocTypeId); 
        formData.append('DisplayFileName', this.documentDetails.value.displayName);
        formData.append('Remark', this.documentDetails.value.remark);
        formData.append('Status', 0 as any);
        formData.append('CustId', custID);
      

        let responce = await this.extApi.AddCustomerDocument(formData);
        console.log(responce)


    } catch (e:any) {
        console.log(e.error)
    }
  }

  openSnackBar(message: any) {
    this._snackBar.open(message, 'close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 100000
    });
  }

  removeImage(){
    this.uploadedImg = "";
    this.imgAvailable = false;
    this.custImgAvailable = false;
  }

  removeImageDoc(){

    this.uploadedDoc = ''

    this.UploadFileImgAvailable = false;
  }

  getKeys(doc: any){
    
    if (Array.isArray(doc)) {

      this.fileAvailable = true;

      return doc;

    } else if (typeof doc === 'object' && doc !== null) {

      this.fileAvailable = false;

      if(Object.keys(doc).length !== 0){
       
        console.log(this.documentTypes)

        // let A = this.documentTypes.filter((el:any, idx: any) => el.id === Object.keys(doc)[idx].toString())
        // console.log(A)

        // Get the array of IDs from the keys of the doc object
        let docKeys = Object.keys(doc);

        // Filter documentTypes based on these IDs
        let A = this.documentTypes.filter((el: any) => docKeys.includes(el.id));

        console.log(A);


        let B = A.map((el:any) => ({ id: el.id, name: el.name }))
        return B


      }
      else
        console.log(Object.keys(doc));
    }

    return 
  }


  newDocument(){

    this.documentDetails.reset();
    this.uploadedDoc = '';
    this.updateDocBtnDisabled = false;
    this.documents = [];

  }

  getFiles(docID: any){

    this.copyOfDocuments = this.documents[docID]
  }

  documentBack(){
    this.copyOfDocuments = this.documents
  }

  async deletePdf(doc: any){

          this.CommonLoaderComponent.show();

    let findDoc = this.selectedCustomerAllDocCloned.find((el: any) => el.docName === doc);

    let reqFields = [
      {
        "id": findDoc.id,
        "docTypeId": findDoc.docTypeId,
        "displayFileName": findDoc.displayFileName,
        "remark": findDoc.remark,
        "status": 1,
        "custId": findDoc.custId
      }
    ]

    try {

      let deleteDocRes = await this.extApi.UpdateCustomerDoc(reqFields);

      if(deleteDocRes.type === 'Success'){

        this.notifyMessage("Document Upload", "Successfully deleted the PDF" ,NotificationType.warn)

        this.documentDetails.reset();
        this.copyOfDocuments = [];
        this.documents = [];
        this.updateDocBtnDisabled = false;

        let custEmailPhone = await this.extApi.getAllCustomers({custID: this.bindingData.id} as any);

        if(custEmailPhone.data[0][0].custDocuments && custEmailPhone.data[0][0].custDocuments.length !== 0){

          let filterNotDeletedDocData = custEmailPhone.data[0][0].custDocuments.filter((el: any) => el.status !== 1);
    
          this.documents = filterNotDeletedDocData.reduce((acc: any, obj:any) => {
            const { docTypeId, displayFileName } = obj;
            if (!acc[docTypeId]) {
              acc[docTypeId] = [displayFileName];
            } else {
              acc[docTypeId].push(displayFileName);
            }
            return acc;
          }, {});
    
          this.copyOfDocuments = {...this.documents};
          this.selectedCustomerAllDocCloned = [...filterNotDeletedDocData];
        }

      }

            this.CommonLoaderComponent.hide();

    } catch (e: any) {
      console.log(e)
            this.CommonLoaderComponent.hide();
    }
    
  }

  async UpdateDocData(){

    this.CommonLoaderComponent.show();

    let findDoc = this.selectedCustomerAllDocCloned.find((el: any) => el.docName === this.documentDetails.value.docName);

    if(!findDoc){
      this.notifyMessage("Document Update", "Please select an document to update" ,NotificationType.warn)
      this.CommonLoaderComponent.hide();
    }else{

      let reqFields = [
        {
          "id": findDoc.id,
          "docTypeId": this.documentTypes.find((el: any) => el.name === this.documentDetails.value.docType).id,
          "displayFileName": findDoc.displayFileName,
          "remark": this.documentDetails.value.remark,
          "status": 0,
          "custId": findDoc.custId
        }
      ]
  
      try {
        
        let updateDocRes = await this.extApi.UpdateCustomerDoc(reqFields);
  
        if(updateDocRes.type === 'Success')
          this.notifyMessage("Document Update", "Successfully update the PDF" ,NotificationType.warn)
  
        this.documentDetails.reset();
        
        this.CommonLoaderComponent.hide();
        this.documents = [];
        this.copyOfDocuments = [];
  
      } catch (e: any) {
        console.log(e)
        this.CommonLoaderComponent.hide();
      }
    }

  }

  loadDataToInputs(doc: any){

    let findDoc = this.selectedCustomerAllDocCloned.find((el: any) => el.docName === doc);

    this.documentDetails.setValue({
      docName:        findDoc.docName,
      displayName:    findDoc.displayFileName,
      docType:        this.documentTypes.find((el:any) => el.id === findDoc.docTypeId).name,
      remark:         findDoc.remark

    });


    var pdfAsDataUri = findDoc.docBytes;
    let binData = base64ToArrayBuffer(pdfAsDataUri);
    let blob = new Blob([binData], { type: 'application/pdf' });
    this.URIBlob = this.safe.transform(window.URL.createObjectURL(blob));

    this.updateDocBtnDisabled = true;
  }

  clearDoc(){
    this.updateDocBtnDisabled = false;

    this.documentDetails.reset();
  }

  private notifyMessage(title: string, message: string, notificationType: NotificationType) {

    this.dialog.open(NotificationDialogComponent, {
      width: '300px',
      data: { title, message, notificationType}
    });
  }
}

function base64ToArrayBuffer(base64: any) {
  var binary_string = window.atob(base64);
  var len = binary_string.length;
  var bytes = new Uint8Array(len);
  for (var i = 0; i < len; i++) {
      bytes[i] = binary_string.charCodeAt(i);
  }
  return bytes.buffer;
}