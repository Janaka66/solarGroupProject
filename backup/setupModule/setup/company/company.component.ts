import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ExtApiService } from 'src/app/ext-api.service';
import { sharedData } from 'src/app/sharedData';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit, AfterViewInit{

  
  companyItems: any;
  companyLogo: any;
  allCompanyData: any = [];

  constructor( private formBuilder: FormBuilder, private extApi: ExtApiService, public sharedData: sharedData){

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
  }

  async ngOnInit(): Promise<void> {
    
    await this.loadAllItems();

  }

  ngAfterViewInit(): void {
    
  }

  async addCompany(){

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

      this.companyItems.push(
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
      )
      
      this.companyItems.reset();
      
    } catch (e: any) {
      
      console.log(e)

    }

  }

  async loadAllItems(){
    
    try {
      
      let companyData = await this.extApi.GetCompany();
      this.allCompanyData = companyData
     

    } catch (e: any) {
      
      console.log(e)
    }
  }

  async removeItem(i: any){

    try {
      
      let removeItems = await this.extApi.updateCopany(
        [{
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
          "status"  : 1
        }]
      )

      console.log(removeItems)

      this.companyItems.splice(i, 1);

    } catch (e:any) {
      console.log(e)

      
    }

  }

  uploadFile(event: any){

  }
}
