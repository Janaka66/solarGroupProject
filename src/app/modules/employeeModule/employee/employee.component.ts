import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/cdk/stepper';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar } from '@angular/material/snack-bar';
import { Observable, map } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { ExtApiService } from 'src/app/ext-api.service';
import { CommonLoaderComponent } from 'src/app/sharedComp/common-loader/common-loader.component';
import { EmployeeSearchComponent } from 'src/app/sharedComp/employee-search/employee-search.component';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit, AfterViewInit {

  @ViewChild('employeeSearch') EmployeeSearchComponent: EmployeeSearchComponent | any;
  @ViewChild('loader') CommonLoaderComponent: CommonLoaderComponent | any;
  
  flag: boolean = false;
  step = 0;
  phoneNumbers = [] as any;
  emails = [] as any;
  employeeNameDetails: any;
  employeePhoneNumbers: any;
  employeeEmails: any;
  stepperOrientation: any;
  status : any = 'new';
  employeeNameDetaisUpdateFields: any = {};
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
  buttonText = 'Add employee'
  
  documents = [] as any
  
  phoneNumber = '';
  email = ''
  phoneNumUpdated: boolean = false;
  emailUpdated: boolean = false;
  addressUpdate: boolean = false;
  clonedCustAddersses = [] as any;
  updateDocBtnDisabled: boolean = false;

  designatioins = [] as any;

  addresses: { addLine1: string, addLine2: string, addLine3: string, isDefault: any, status: any, custId: any, id: any, readonly: boolean}[] = [
    
  ];

  isAddressEmpty: boolean = true;
  uploadedDoc: any;
  documentTypes = [] as any;

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  copyOfDocuments = {} as any;
  selectedemployeeAllDocCloned: any;
  setDefPhone: boolean = false;
  setDefEmail: boolean = false;
  setDefAddress: boolean = false;
  URIBlob: any;
  addressessData = [] as any;
  isLoaderAvailable: boolean = false;
  
  constructor(private communicationService: AppService, private extApi : ExtApiService, private formBuilder: FormBuilder, breakpointObserver: BreakpointObserver, private cdr: ChangeDetectorRef, private _snackBar: MatSnackBar){

    this.employeeNameDetails = this.formBuilder.group({
      firstName:    ['', Validators.required],
      middleName:   ['', Validators.required],
      lastName:     ['', Validators.required],
      surName:      ['', Validators.required],
      initials:     ['', Validators.required],
      department:   ['', Validators.required],
      designation : '',
      displayName : ['', Validators.required],
      phoneNumber : ['', Validators.required],
      email : ['', Validators.required],
      nic : ['', Validators.required],
      title : ['', Validators.required],
    });
    
    stepperOrientation: Observable<StepperOrientation>;

    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));
  
  }

  async ngAfterViewInit(): Promise<void> {

    let loadedDesignations;

    this.CommonLoaderComponent.show();

    await this.getAllemployees();

    try {
      loadedDesignations = await this.extApi.GetEmployeeDesignation();
      this.designatioins = loadedDesignations.data;
    } catch (error) {
      this.CommonLoaderComponent.hide();
    }
    
    this.CommonLoaderComponent.hide();
  }

  
  showLoader = false;
  
  handleLeftBar() {

    this.flag = !this.flag;
    
    this.communicationService.sendData({ flag: !this.flag });
  }

  async ngOnInit(): Promise<void> {

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
  
  async registeremployee(){

    this.isLoaderAvailable = true;

    if(!this.employeeNameDetails.value.firstName || !this.employeeNameDetails.value.middleName || !this.employeeNameDetails.value.lastName || !this.employeeNameDetails.value.surName || !this.employeeNameDetails.value.initials || !this.employeeNameDetails.value.designation){
      this.openSnackBar('Please fill employee details section')
      this.isLoaderAvailable = false;
      return
    }

    let addCustRes;
    let requestedFields = [];

    if(this.status === 'update'){

        this.employeeNameDetaisUpdateFields = {};

        this.employeeNameDetaisUpdateFields["fname"] = this.employeeNameDetails.value.firstName
        this.employeeNameDetaisUpdateFields["mname"] = this.employeeNameDetails.value.middleName
        this.employeeNameDetaisUpdateFields["lname"] = this.employeeNameDetails.value.lastName
        this.employeeNameDetaisUpdateFields["surName"] = this.employeeNameDetails.value.surName
        this.employeeNameDetaisUpdateFields["initials"] = this.employeeNameDetails.value.initials
        this.employeeNameDetaisUpdateFields["desgId"] = this.designatioins.find((el: any) => el.desgDesc === this.employeeNameDetails.value.designation).id
        this.employeeNameDetaisUpdateFields["id"] = this.bindingData.id;
        this.employeeNameDetaisUpdateFields["status"] = 0
        this.employeeNameDetaisUpdateFields["department"] = this.employeeNameDetails.value.department,
        this.employeeNameDetaisUpdateFields["dispName"]    = this.employeeNameDetails.value.displayName,
        this.employeeNameDetaisUpdateFields["phoneNumber"] = this.employeeNameDetails.value.phoneNumber,
        this.employeeNameDetaisUpdateFields["email"]       = this.employeeNameDetails.value.email,
        this.employeeNameDetaisUpdateFields["nic"]         = this.employeeNameDetails.value.nic,
        this.employeeNameDetaisUpdateFields["title"]       = this.employeeNameDetails.value.title
        requestedFields.push(this.employeeNameDetaisUpdateFields);

        try {
          
          addCustRes = await this.extApi.UpdateEmployee(requestedFields);

          if(addCustRes.type === 'Success')
            this.openSnackBar('Successfully updated the employee details');

        } catch (error) {
          this.isLoaderAvailable = false;
        }

        
    }else{

      this.employeeNameDetaisUpdateFields = [{

        "id"          : "string",
        "fname"       : this.employeeNameDetails.value.firstName,
        "mname"       : this.employeeNameDetails.value.middleName,
        "lname"       : this.employeeNameDetails.value.lastName,
        "surName"     : this.employeeNameDetails.value.surName,
        "initials"    : this.employeeNameDetails.value.initials,
        "desgId"      :  this.designatioins.find((el: any) => el.desgDesc === this.employeeNameDetails.value.designation).id,
        "department"  : this.employeeNameDetails.value.department,
        "dispName"    : this.employeeNameDetails.value.displayName,
        "phoneNumber" : this.employeeNameDetails.value.phoneNumber,
        "email"       : this.employeeNameDetails.value.email,
        "nic"         : this.employeeNameDetails.value.nic,
        "title"       : this.employeeNameDetails.value.title
      }] 

      try {
        
        addCustRes = await this.extApi.AddEmployee(this.employeeNameDetaisUpdateFields)     

        if(addCustRes.type === 'Success')
          this.openSnackBar('New employee has been registered')

      } catch (error) {
        this.isLoaderAvailable = false;
      }

    }   

    this.getAllemployees();
    this.newemployee();

    this.isLoaderAvailable = false;
  }

  async getAllemployees(){

    try {
      
      let result = await this.extApi.GetEmployee();
      this.EmployeeSearchComponent.showEmployees(result.data);

    } catch (e: any) {
      console.log(e.error)
      this.CommonLoaderComponent.hide();
    }
  }


  //get the data after select the employee......................
  async bindEmployeeData(empData :any){
    
    this.isLoaderAvailable = true;

    this.newemployee();

    this.status = 'update';
    this.buttonText = 'Upate employee';

    try {

      let empDesignation = await this.extApi.GetEmployeeDesignation(JSON.stringify(empData.desgId));

      if(empDesignation.data.length > 0){

        let filteredDesignations = empDesignation.data.filter((el: any) => el.status === 0);
        this.designatioins = filteredDesignations;

      }else{

        this.designatioins = [];

      }
      
      this.isLoaderAvailable = false;

    } catch (error) {
      console.log(error)
      this.isLoaderAvailable = false;
    }

    this.employeeNameDetails.setValue({
      firstName   :   empData.fname,
      middleName  :   empData.mname,
      lastName    :   empData.lname,
      surName     :   empData.surName,
      initials    :   empData.initials,
      department  :   empData.department,
      designation :   this.designatioins[0].desgDesc || '',
      displayName : empData.dispName,
      phoneNumber : empData.phoneNumber,
      email       : empData.email,
      nic         : empData.nic,
      title       : empData.title,
    });

    this.bindingData = empData;
  }

  newemployee(){

    this.buttonText = 'Add employee';

    this.employeeNameDetaisUpdateFields = {},
    this.phoneNumbers = [],
    this.emails = [],
    this.clonedCustAddersses = [],
    this.employeeNameDetails.reset();
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
    this.setDefPhone = false;
    this.setDefEmail = false;
    this.copyOfDocuments = [];
    this.URIBlob = '';
    this.documents = [];
    this.updateDocBtnDisabled = false;
  }

  
  openSnackBar(message: any) {
    this._snackBar.open(message, 'close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 100000
    });
  }

  async removeEmployee(employeeData: any){
    
    try {
      
      let reqFields = {
        "fname" : employeeData.fname,
        "mname": employeeData.mname,
        "lname": employeeData.lname,
        "surName": employeeData.surName,
        "initials": employeeData.initials,
        "desgId": employeeData.desgId,
        "id": employeeData.id,
        "status": 1,
        "department": employeeData.department,
        "dispName"    : employeeData.dispName,
        "phoneNumber" : employeeData.phoneNumber,
        "email"       : employeeData.email,
        "nic"         : employeeData.nic,
        "title"       : employeeData.title

      }

      let deleteRes = await this.extApi.UpdateEmployee([reqFields]);
      

      if(deleteRes.type === 'Success'){
        this.openSnackBar('Successfully Deleted the employee');

        this.newemployee();
        this.getAllemployees();
      }


    } catch (error) {
      console.log(error)
    }
  }
}
 