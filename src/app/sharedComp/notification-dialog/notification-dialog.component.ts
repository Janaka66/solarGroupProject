import { Component, OnInit, Inject, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { EmployeeSearchComponent } from '../employee-search/employee-search.component';
import { ExtApiService } from 'src/app/ext-api.service';
import { CommonLoaderComponent } from '../common-loader/common-loader.component';
import { FormViewerComponent } from 'src/app/form-viewer/form-viewer.component';
import { AppService } from 'src/app/app.service';

export enum NotificationDialogType { ntOk, ntOkCancel, ntYesNo,ntYesNoCancel, assignedEmp, ntNoteOK }
export enum NotificationDialogBtn { btNo, btYes, btOk, btCancel }
export enum NotificationType { error, warn, success, confirm }; //stop, warnnig, notice, question

export interface NotificationDialogData {
  getNote: any;
  quatID: any;
  selectedQuoat: any;
  showEmp: any;
  title: string;
  message?: string;
  html?: string;
  dialogType?: NotificationDialogType;
  initialFocusBtn?: NotificationDialogBtn;
  notificationType?: NotificationType;
  panelClass?: string;
  btnTxt?: {
    ok: string;
    cancel: string;
    no: string;
    yes: string;
  }
}

@Component({
  selector: 'app-notification-dialog',
  templateUrl: './notification-dialog.component.html',
  styleUrls: ['./notification-dialog.component.scss']
})

export class NotificationDialogComponent implements OnInit, AfterViewInit {

  @ViewChild('employeeSearch') EmployeeSearchComponent: EmployeeSearchComponent | any;
  @ViewChild('loader') CommonLoaderComponent: CommonLoaderComponent | any;
  @ViewChild('formViewer') formViewer: FormViewerComponent | any;
  
  dialogType = NotificationDialogType;
  buttons = NotificationDialogBtn;
  notificationType = NotificationType;
  notificationTitle;
  contentTitle;
  notificationIcon;
  showEmpView: any;
  selectedForInq = [] as any
  componant = 'inqComp';
  selectedQuoat: any;
  regAcceptNote = '';

  constructor(
    public dialogRef: MatDialogRef<NotificationDialogComponent>,
    private sanitizer:DomSanitizer,
    @Inject(MAT_DIALOG_DATA) public data: NotificationDialogData,
    private extApi: ExtApiService,
    private appService: AppService
  ) {

    if(this.data.showEmp){
      debugger
      this.showEmpView = this.data.showEmp
      this.selectedQuoat = this.data.quatID

      this.GetQuotationHasEmployeeToConfirm()
      
    }else if(this.data.getNote){

      this.data.dialogType = NotificationDialogType.ntNoteOK;

    }else if(!this.data.dialogType){

      this.data.dialogType = NotificationDialogType.ntOk;
    }

    if(this.data.html){
      
      this.data.html = <string>this.sanitizer.bypassSecurityTrustHtml(this.data.html);

      this.contentTitle = this.data.title;
      this.notificationTitle = NotificationTitle[this.data.notificationType as any];
      this.notificationIcon = `${NotificationType[this.data.notificationType as any]}.png`;
    }
  }

  ngOnInit(): void {
  }

  async ngAfterViewInit(): Promise<void> {
      
    await this.getAllemployees();
  }

  async getAllemployees(selectedIq = []){

    try {
      
      let result = await this.extApi.GetEmployee();


      this.EmployeeSearchComponent.showEmployees(result.data);

    } catch (e: any) {
      console.log(e.error)
    }
  }

  bindEmployeeData(event: any){

    let existData = this.selectedForInq.filter((el: any) => el.empID === event.selectedData.id);

    if(existData.length > 0 && !event.checked){

      this.selectedForInq = this.selectedForInq.filter((el: any) => el.empID !== existData[0].empID);

    }else{

      if(event.checked){

        event.selectedData['employeeProfile'] = {};

        event.selectedData['inqStatus'] = 'new'
        event.selectedData.employeeProfile.initials = event.selectedData.initials
        event.selectedData.employeeProfile.fname = event.selectedData.fname
        this.selectedForInq.push(event.selectedData)
        
      }else{
        event.selectedData['inqStatus'] = ''
      }

    }

    this.appService.selectedForInq = this.selectedForInq;
  }

  async sendSelectedEmpToAdd(){
    
    
  }

  async GetQuotationHasEmployeeToConfirm(){
debugger
    try {
      
      
      let res = await this.extApi.GetQuotationHasEmployeeToConfirm({quotID: this.selectedQuoat});

      console.log(res.data)
      this.selectedForInq = res.data

      await this.getAllemployeesForSelecetedQuot(this.selectedForInq);

    } catch (error) {
      alert(error)
    }
  }

  async getAllemployeesForSelecetedQuot(selectedIq = []){

    debugger;

    try {
      
      let result = await this.extApi.GetEmployee();

      if(selectedIq.length > 0){

        result.data.forEach((el: any) => {

          let getInqdataIdx = selectedIq.findIndex((elIq: any) => elIq.empID === el.id)

          if(getInqdataIdx !== -1){
            el['checked'] = true
          }
          else
            el['checked'] = false

        })
      }

      this
      this.EmployeeSearchComponent.showEmployees(result.data);

    } catch (e: any) {
      console.log(e.error)
    }
  }
  
}

enum NotificationTitle { 'Stop' = 0 ,'Warning' = 1 , 'Notice' = 2 , 'Question' = 3};