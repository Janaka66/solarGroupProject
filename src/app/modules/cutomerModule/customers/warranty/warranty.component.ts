import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';
import { AppService } from 'src/app/app.service';
import { ExtApiService } from 'src/app/ext-api.service';
import { CommonLoaderComponent } from 'src/app/sharedComp/common-loader/common-loader.component';
import { CustomerSearchComponent } from 'src/app/sharedComp/customer-search/customer-search.component';
import { EmployeeSearchComponent } from 'src/app/sharedComp/employee-search/employee-search.component';
import { NotificationDialogComponent, NotificationType } from 'src/app/sharedComp/notification-dialog/notification-dialog.component';

@Component({
  selector: 'app-warranty',
  templateUrl: './warranty.component.html',
  styleUrls: ['./warranty.component.scss']
})
export class WarrantyComponent implements OnInit , AfterViewInit {

  @ViewChild('loader') CommonLoaderComponent: CommonLoaderComponent | any;
  @ViewChild('customerSearch') CustomerSearchComponent: CustomerSearchComponent | any;
  
  flag: boolean = false;
  paymentForm: FormGroup;
  isBtnEnabaled: boolean = false;
  selectedCustID: any;
  allProductsForGetNames: any;
  allProducts: any;
  allProdReferance: any = [];
  allQuatationForDrop = [] as any;
  allCutsomerItems: any = [];
  allSavedwarrentys: any;
  selecetedWarrantyActionId: any

  // ==============
  productNameIdForADD = '';
  allProductsForAdd = [] as any;
  selectedCustRefNumForADD = '';
  allProdReferanceForAdd = [] as any;
  selectedcustItemForADD = '';
  allCutsomerItemsLoadForAdd = [] as any;
  selecetedWarrantyActionIdForAdd = '';
  allWarrentyActionsForAdd = [] as any;
  warentyItemsDisabled: boolean = true;
  fromCustPickerDate : any = '';
  returnedPickerDate : any = '';
  repairedPickerDate : any = '';
  fromCompPickerDate : any = '';
  addionalDescForAdd : any = '';
  remarkForAdd : any = '';
  allwarrentyItemsForUiLoad: any = [];
  disabledAll: boolean = false;
  primeID: any;
  isupdateAddBtnEnabled: boolean = true;

  manufactureAddress = ''
  manufactureEmail = ''
  ManufactureName = ''
  ManufactureCotact = ''


  constructor(private communicationService: AppService, private extApi : ExtApiService, private fb: FormBuilder, private cdr: ChangeDetectorRef, private dialog: MatDialog){
    
    this.paymentForm = this.fb.group({
      customerName: [{ value: '', disabled: true }, Validators.required],
      productName: ['', Validators.required],
      selectedCustRefNum: ['', Validators.required],
      selectedcustItem: ['', Validators.required]
    });
    
  }
  handleLeftBar() {

    this.flag = !this.flag;
    
    this.communicationService.sendData({ flag: !this.flag });
  }

  ngOnInit(): void {
    
  }
  async ngAfterViewInit(): Promise<void> {
   
    await this.getAllCustomers();
    await this.getProducts();
    await this.loaAllwarrentys();
  }

  async getAllCustomers(){

    try {
      
      let result = await this.extApi.getAllCustomers();
      this.CustomerSearchComponent.showCustomers(result.data[0]);

      this.CommonLoaderComponent.hide();

    } catch (e: any) {
      this.CommonLoaderComponent.hide();
      console.log(e.error)
    }
  }

  async bindEmployeeData(empData :any){
   
    
  }

  async bindCutomerData(event : any){

    
    this.allwarrentyItemsForUiLoad = []
    this.isupdateAddBtnEnabled = true;
    this.paymentForm.reset();

    this.CommonLoaderComponent.show();

    this.isBtnEnabaled = true;

    this.selectedCustID = event.id;

    await this.GetCustomerProdcutForTwoProdDrops();

    this.productNameIdForADD = '';
    this.selectedCustRefNumForADD = '';
    this.selectedcustItemForADD = '',
    this.selecetedWarrantyActionIdForAdd = '';
    this.fromCustPickerDate = '';
    this.returnedPickerDate = '';
    this.repairedPickerDate = '';
    this.fromCompPickerDate = '';
    this.addionalDescForAdd = '';
    this.remarkForAdd = '';

    this.CommonLoaderComponent.hide();

  }

  async getProducts(){

    try {

      let allProcts = await this.extApi.getAllProducts();
      this.allProductsForGetNames = allProcts.data.filter((el: any) => el.status !== 1);
      
      console.log('===============allProducts===========')
      console.log(this.allProductsForGetNames)
    } catch (error) {
      // this.notifyMessage("Get products", "Something went wrong while getting products",NotificationType.error)
    }
  }
  
  async GetCustomerProdcutForTwoProdDrops(){
debugger
    try {

      let allProcts = await this.extApi.GetCustomerProdcut({"custId":this.selectedCustID});
      let allProducts = allProcts.data.filter((el: any) => el.status !== 1);

      allProducts[0].forEach((el: any) => {
        
        this.allProductsForGetNames.forEach((elx: any) => {
          

          if(el.prodId === elx.id)
            el.productName = elx.productName
          
        });
      });
      
      this.allProducts = this.removeDuplicates(allProducts[0])
      this.allProductsForAdd = this.allProducts;

      console.log('===============allProducts===========')
      console.log(this.allProducts);

      this.cdr.detectChanges();

    } catch (error) {
      //this.notifyMessage("Get products", "Something went wrong while getting products",NotificationType.error)
    }
  }

  removeDuplicates(data: any[]): any[] {
    const uniqueIds = new Set();
    const uniqueData = [];

    for (const item of data) {
      if (!uniqueIds.has(item.prodId)) {
        uniqueIds.add(item.prodId);
        uniqueData.push(item);
      }
    }

    return uniqueData;
  }


  async onSubmit(): Promise<void> {

    this.CommonLoaderComponent.show();


      try {
        


      } catch (error) {
        console.log(error)
      }

      let reqFields = {
       
      }

      try {
        

        //this.notifyMessage("Add Paymnet", "Successfully added the payment",NotificationType.success)
    

       this.CommonLoaderComponent.hide();

        
      } catch (error) {
        //this.notifyMessage("Add Paymnet", "Something went wrong please try again",NotificationType.error)
        this.CommonLoaderComponent.hide();
      }
  }

  async prodChange(event: any){
    
    await this.GetCustomerProdcut();
  }

  async GetCustomerProdcut(){
    
        this.allProdReferance = []
    
        try {
    
          let getcustomerProd = await this.extApi.GetCustomerProdcut({"prodId": this.paymentForm.value.productName, "custId": this.selectedCustID});
    
          getcustomerProd.data[0].data = getcustomerProd.data[0].filter((el: any) => el.status === 0)
    
          getcustomerProd.data[0].forEach((el: any) => {
    
            this.allProdReferance.push({
              'refNu': el.refNu,
              'id': el.id
            })
    
          })
    
          console.log('allProdReferance')
          console.log(this.allProdReferance)
          
        } catch (error) {
          console.log(error)
        }
  }

  async refChange(event: any){
        
        await this.getQouatationByCust();
  }
    
  async getQouatationByCust(){
debugger
        let reqFields = {
          "custId": this.selectedCustID,
          "prodId": this.paymentForm.value.productName,
          "refNu": this.paymentForm.value.selectedCustRefNum,
        }
        
          let custItem = await this.extApi.GetCustomerProdcutItem(reqFields);

          custItem.data[0] = custItem.data[0].filter((el: any) => el.status === 0)

          console.log(custItem)

          custItem.data[0].forEach((el: any) => {
            
            el.itemName = el.item.itemName
          });
          
          this.allCutsomerItems = custItem.data[0]
    
        try {
    
          
        } catch (error) {
          console.log(error)
        }
  }

  async getAllWarrentyItems(){

    let reqFields = {
        "custID": this.selectedCustID,
        "prodID": this.paymentForm.value.productName || this.productNameIdForADD,
        "refNum": this.paymentForm.value.selectedCustRefNum || this.selectedCustRefNumForADD,
    }

    try {

      let allWarrentyItems = await this.extApi.GetWarrentyItem(reqFields);


      allWarrentyItems.data.forEach((el: any) => {
        
        el.itemName = el.item.itemName
        el.brandName = el.item.brand.brandName,
        el.dateReceivedFromComp =  moment(el.dateReceivedFromComp).format('YYYY-MM-DD')
        el.dateReceivedFromCust = moment(el.dateReceivedFromCust).format('YYYY-MM-DD')
        el.dateRepaired = moment(el.dateRepaired).format('YYYY-MM-DD')
        el.dateReturned = moment(el.dateReturned).format('YYYY-MM-DD')

      });

      console.log(allWarrentyItems)

      this.allwarrentyItemsForUiLoad = allWarrentyItems.data;

    } catch (error) {
      console.log(error)
    }
  }
  
  async addAllWarrentyItems(){

    let reqFields = [
              {
                "id": "string",
                "custId": this.selectedCustID,
                "prodId": this.paymentForm.value.productName,
                "itemId": this.paymentForm.value.selectedcustItem,
                "actionID": "string",
                "dateReceivedFromCust": "2024-07-31T17:39:41.804Z",
                "dateReturned": "2024-07-31T17:39:41.804Z",
                "dateRepaired": "2024-07-31T17:39:41.804Z",
                "dateReceivedFromComp": "2024-07-31T17:39:41.804Z",
                "additionalNotes": "string",
                "remarks": "string",
                "status": 0,
              }
            ]

    try {

      let allWarrentyItems = await this.extApi.AddWarrentyItem(reqFields);

      console.log(allWarrentyItems)
      
    } catch (error) {
      console.log(error)
    }
  }

  async loaAllwarrentys(){
    
        try {
          
          let warrentys = await this.extApi.GetWarrentyItemAction();
          this.allWarrentyActionsForAdd = warrentys.data.filter((el: any) => el.status === 0);
    
        } catch (e: any) {
          
          console.log(e)
        }
  }
    
  // =================
  async refChnageForAddFunc(event: any){

    this.warentyItemsDisabled = true;

    let reqFields = {
      "custId": this.selectedCustID,
      "prodId": this.productNameIdForADD,
      "refNu": this.selectedCustRefNumForADD,
    }
    
      let custItem = await this.extApi.GetCustomerProdcutItem(reqFields);

      custItem.data[0] = custItem.data[0].filter((el: any) => el.status === 0)

      console.log(custItem)

      custItem.data[0].forEach((el: any) => {
        
        el.itemName = el.item.itemName
      });
      
      this.allCutsomerItemsLoadForAdd = custItem.data[0]


    try {

      
    } catch (error) {
      console.log(error)
    }

  }

  async allProductsForAddFunc(event: any){

    this.warentyItemsDisabled = true;
    this.allProdReferanceForAdd = []

    try {

      let getcustomerProd = await this.extApi.GetCustomerProdcut({"prodId": this.productNameIdForADD, "custId": this.selectedCustID});

      getcustomerProd.data[0].data = getcustomerProd.data[0].filter((el: any) => el.status === 0)

      getcustomerProd.data[0].forEach((el: any) => {

        this.allProdReferanceForAdd.push({
          'refNu': el.refNu,
          'id': el.id
        })

      })

      console.log('allProdReferance')
      console.log(this.allProdReferanceForAdd)

    } catch (error) {
      console.log(error)
    }
    
  }
  
  customerItemsChangeFunc(event: any){

    this.warentyItemsDisabled = false;
  }
  
  async addWarrentyItems(){

    let reqFields = [
      {
        "id": "string",
        "custId": this.selectedCustID,
        "prodId": this.productNameIdForADD,
        "refNu": this.selectedCustRefNumForADD,
        "itemId": this.selectedcustItemForADD,
        "actionID": this.selecetedWarrantyActionIdForAdd,
        "dateReceivedFromCust": this.fromCustPickerDate,
        "dateReturned": this.returnedPickerDate,
        "dateRepaired": this.repairedPickerDate,
        "dateReceivedFromComp": this.fromCompPickerDate,
        "additionalNotes": this.addionalDescForAdd,
        "remarks": this.remarkForAdd,
        "status": 0,
      }
    ]

    try {

      let res = await this.extApi.AddWarrentyItem(reqFields)
      
      await this.getAllWarrentyItems();

      console.log(res)
      
    } catch (error) {
      console.log(error)
    }
  }

  clearAll(){

    this.productNameIdForADD = '';
    this.selectedCustRefNumForADD = '';
    this.selectedcustItemForADD = '',
    this.selecetedWarrantyActionIdForAdd = '';
    this.fromCustPickerDate = '';
    this.returnedPickerDate = '';
    this.repairedPickerDate = '';
    this.fromCompPickerDate = '';
    this.addionalDescForAdd = '';
    this.remarkForAdd = '';
    this.paymentForm.reset();
    this.disabledAll = false;
    this.warentyItemsDisabled = true;
    this.manufactureAddress = ''
    this.manufactureEmail = ''
    this.ManufactureName = ''
    this.ManufactureCotact = ''

  }


  editRow(rowData: any, event: Event): void {
    debugger
    event.stopPropagation();
 
    this.primeID = rowData.id;
    this.selectedCustRefNumForADD = rowData.refNu
    this.selectedcustItemForADD = rowData.itemId
    this.selecetedWarrantyActionIdForAdd = rowData.actionID
    this.fromCustPickerDate = rowData.dateReceivedFromCust;
    this.returnedPickerDate = rowData.dateReturned;
    this.repairedPickerDate = rowData.dateRepaired;
    this.fromCompPickerDate = rowData.dateReceivedFromComp;
    this.addionalDescForAdd = rowData.additionalNotes;
    this.remarkForAdd = rowData.remarks;

    this.disabledAll = true;
    this.warentyItemsDisabled = false;
    
    this.isupdateAddBtnEnabled = false

    
    

  }

  async upadteWarrantyItems(){

    debugger
    let reqFields = [
      {
        "id": this.primeID,
        "custId": this.selectedCustID,
        "prodId": this.productNameIdForADD || this.paymentForm.value.productName,
        "refNu": this.selectedCustRefNumForADD,
        "itemId": this.selectedcustItemForADD,
        "actionID": this.selecetedWarrantyActionIdForAdd,
        "dateReceivedFromCust": this.fromCustPickerDate,
        "dateReturned": this.returnedPickerDate,
        "dateRepaired": this.repairedPickerDate,
        "dateReceivedFromComp": this.fromCompPickerDate,
        "additionalNotes": this.addionalDescForAdd,
        "remarks": this.remarkForAdd,
        "status": 0,
      }
    ]


    try {
      
      let res = await this.extApi.UpdateWarrentyItem(reqFields)
      
      await this.getAllWarrentyItems();

      console.log(res)

      this.disabledAll = false;
      this.warentyItemsDisabled = true;




    this.fromCustPickerDate = '';
    this.returnedPickerDate = '';
    this.repairedPickerDate = '';
    this.fromCompPickerDate = '';
    this.addionalDescForAdd = '';
    this.remarkForAdd = '';

    } catch (error) {
      console.log(error)
    }
  }

  viewRow(rowData: any, event: Event): void {
 
    this.manufactureAddress = rowData.item.manufacturer.address
    this.manufactureEmail = rowData.item.manufacturer.email
    this.ManufactureName = rowData.item.manufacturer.name
    this.ManufactureCotact = rowData.item.manufacturer.phoneNo
  }

  private notifyMessage(title: string, message: string, notificationType: NotificationType) {

    this.dialog.open(NotificationDialogComponent, {
      width: '300px',
      data: { title, message, notificationType}
    });
  }
}
