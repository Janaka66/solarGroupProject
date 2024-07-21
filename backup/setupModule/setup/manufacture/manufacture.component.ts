import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ExtApiService } from 'src/app/ext-api.service';

@Component({
  selector: 'app-manufacture',
  templateUrl: './manufacture.component.html',
  styleUrls: ['./manufacture.component.scss']
})
export class ManufactureComponent {

  manufatureItems: any;
  allSavedIManufatureItems = [] as any;

  constructor( private formBuilder: FormBuilder, private extApi: ExtApiService){
    this.manufatureItems = this.formBuilder.group({
      name:       ['', Validators.required],
      pNumber:    ['', Validators.required],
      email:      ['', Validators.required],
      address:    ['', Validators.required],
    });
  }

  ngOnInit(): void {
      this.loadAllIManufatureItems();
  }

  async addManufature(){

    if(this.manufatureItems.value.name === ''){
      alert("Item is empty")
      return
    }

    if(this.allSavedIManufatureItems.find((el: any) => el.name === this.manufatureItems.value.name)){

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

      this.allSavedIManufatureItems.push({
        "id"      : "string",
        "name"    : this.manufatureItems.value.name,
        "phoneNo" : this.manufatureItems.value.pNumber,
        "email"   : this.manufatureItems.value.email,
        "address" : this.manufatureItems.value.address,
        "status"  : 0
      });
      
      this.manufatureItems.reset();

    } catch (e: any) {
      
      console.log(e)

    }

  }

  async loadAllIManufatureItems(){

    try {
      
      let manufacItems = await this.extApi.Manufacturer();
      this.allSavedIManufatureItems = manufacItems.data;


    } catch (e: any) {
      
      console.log(e)
    }
  }

  async removeManuFacItem(i: any){

    try {
      
      let removeManuFacItems = await this.extApi.UpdateManufacturer([{id: this.allSavedIManufatureItems[i].id, name: this.allSavedIManufatureItems[i].name, phoneNo: this.allSavedIManufatureItems[i].phoneNo, email: this.allSavedIManufatureItems[i].email, address: this.allSavedIManufatureItems[i].address, status: 1}])
      console.log(removeManuFacItems)

      this.allSavedIManufatureItems.splice(i, 1);


    } catch (e:any) {
      console.log(e)

      
    }

  }
}