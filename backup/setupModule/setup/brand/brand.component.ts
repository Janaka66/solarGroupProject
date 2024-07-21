import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AppService } from 'src/app/app.service';
import { ExtApiService } from 'src/app/ext-api.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss']
})
export class BrandComponent {


  brand: any;
  allBrandNames = [] as any;
  disablebrandRemoveIcon: boolean = false;
  flag: any;

  constructor( private formBuilder: FormBuilder, private extApi: ExtApiService, private communicationService: AppService){
    this.brand = this.formBuilder.group({
      brandName:    ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loaAllbrands();
  }

  async addInputType(){

    if(this.brand.value.brandName === ''){

      alert("brand is empty")
      return
    }

    if(this.allBrandNames.find((el: any) => el.brandName === this.brand.value.brandName)){

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

      this.allBrandNames.push(
        {
          "id": "string",
          "brandName": this.brand.value.brandName,
          "status": 0
        }
      )
      
      this.brand.reset();

    } catch (e: any) {
      
      console.log(e)

    }

  }

  async loaAllbrands(){

    try {
      
      let brandsTypes = await this.extApi.GetBrand();
      this.allBrandNames = brandsTypes;

    } catch (e: any) {
      
      console.log(e)
    }
  }

  async removebrand(i: any){

    try {
      
      let removebrandRes = await this.extApi.UpdateBrand({id: this.allBrandNames[i].id, brandName: this.allBrandNames[i].brandName, status: 1})
      console.log(removebrandRes)

      this.allBrandNames.splice(i, 1);


    } catch (e:any) {
      console.log(e)

      
    }

  }

  handleLeftBar() {

    this.flag = !this.flag;
    
    this.communicationService.sendData({ flag: !this.flag });
  }
}
