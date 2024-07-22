import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AppService } from 'src/app/app.service';

import { ColDef } from 'ag-grid-community'; 
import { CustomerSearchComponent } from 'src/app/sharedComp/customer-search/customer-search.component';
import { ExtApiService } from 'src/app/ext-api.service';
import { FormViewerComponent } from 'src/app/form-viewer/form-viewer.component';
import * as moment from 'moment';

@Component({
  selector: 'app-customer-invoices',
  templateUrl: './customer-invoices.component.html',
  styleUrls: ['./customer-invoices.component.scss']
})
export class CustomerInvoicesComponent implements OnInit, AfterViewInit{

  @ViewChild('printArea') printArea: ElementRef | any;
  @ViewChild('customerSearch') CustomerSearchComponent: CustomerSearchComponent | any;
  @ViewChild('formViewer') formViewer: FormViewerComponent | any;
  
  flag: boolean = false;
  panelOpenState = false;
  
  products: [] | any;

  responsiveOptions: any[] | undefined;
  isLoaderAvailable: boolean = false;

  selectedCustID = "";

  rowData = [
    { make: "Tesla", model: "Model Y", price: 64950},
    { make: "Ford", model: "F-Series", price: 33850}

  ];
 
  colDefs: ColDef[] = [
    { field: "make" , width: 200},
    { field: "model" , width: 180},
    { field: "price" , width: 180},
  ];

    productService: any;
    allInvoices = [];

  constructor(private communicationService: AppService, private extApi : ExtApiService){

  }

    async ngAfterViewInit(): Promise<void> {
        await this.getAllCustomers()
    }
  
    ngOnInit(): void {

        this.communicationService.enableInvices({ flag: "invoice" });

        // this.getProductsSmall().then((allInvoices: any) => {
        //     this.allInvoices = allInvoices;
        // });

        this.responsiveOptions = [
            {
                breakpoint: '1400px',
                numVisible: 3,
                numScroll: 3
            },
            {
                breakpoint: '1220px',
                numVisible: 2,
                numScroll: 2
            },
            {
                breakpoint: '1100px',
                numVisible: 1,
                numScroll: 1
            }
        ];

    }

    showLoader = false;
    
    handleLeftBar() {

        this.flag = !this.flag;
        
        this.communicationService.sendData({ flag: !this.flag });
    }

    async getAllCustomers(){

        try {
          
          let result = await this.extApi.getAllCustomers();
          this.CustomerSearchComponent.showCustomers(result.data[0]);
    
        } catch (e: any) {
          console.log(e.error)
        }
    }

    async bindCutomerData(custData: any){

        this.selectedCustID = custData.id;

        try {
            
            let custAddress = await this.extApi.CustomerAddresses(custData.id);

            let defaultAddress = custAddress.data.find((el:any) => el.isDefault === 1)
            this.formViewer.setSelectedCustData({custName: custData.dispName, custAddress: defaultAddress.addLine1 + ' ' + defaultAddress.addLine2 + ' ' + defaultAddress.addLine3, custID: this.selectedCustID})

            await this.getAllInvoices();

        } catch (error) {
            
            alert("There is a problem when getting an address for this customer. Please check if this customer has default address")
        }

    }

    async getAllInvoices(){

        return new Promise(async (resolve, reject) => {

            try {
                
                let invoiceRes = await this.extApi.GetInvoice({"custID" : this.selectedCustID});

                invoiceRes.data.forEach((el: any) => {
                    
                    el.invcDate = moment(el.invcDate).format('YYYY/MM/DD');
                });

                this.allInvoices = invoiceRes.data;

                resolve(1)
        
            } catch (e: any) {
                
                alert("error")

                reject(0)
            }
        })
  
    }

    selectItem(event: any){
        this.formViewer.viewSelectedInvoice(event)
    }

    onPage(event: any){}

    loaderHandle(event: any){

        this.isLoaderAvailable = event;
    }
}
