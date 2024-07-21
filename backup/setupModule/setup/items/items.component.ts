import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ExtApiService } from 'src/app/ext-api.service';
import { sharedData } from 'src/app/sharedData';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit, AfterViewInit{

  items: any;
  itemTypes = [] as any;
  allItems = [] as any;
  manuFac = [] as any;
  allBrandNames = [] as any;

  constructor( private formBuilder: FormBuilder, private extApi: ExtApiService, public sharedData: sharedData){

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
  }

  async ngOnInit(): Promise<void> {
    
    await this.loadAllItems();
    let types = await this.extApi.ItemTypes();
    let manufacItems = await this.extApi.Manufacturer();
    let brandsTypes = await this.extApi.GetBrand();

    if(types.data.length !== 0)
      this.itemTypes  = types.data

    if(manufacItems.data.length !== 0)
      this.manuFac  = manufacItems.data

      if(brandsTypes.data.length !== 0)
      this.allBrandNames = brandsTypes;
  }

  ngAfterViewInit(): void {
    
  }

  async addItem(){

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
        "manFcId": "string",
        "itemTypeId": this.items.value.itemType,
        "status": 0
      }
    ]

    try {

      let addItemRes = await this.extApi.AddItems(reqFields);
      console.log(addItemRes);

      this.allItems.push(
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
          "manFcId": "string",
          "itemTypeId": this.items.value.itemType,
          "status": 0
        }
      )
      
      this.items.reset();
      
    } catch (e: any) {
      
      console.log(e)

    }

  }

  async loadAllItems(){
    
    try {
      
      let loadedAllItems = await this.extApi.Items();
      this.allItems = loadedAllItems.data;

    } catch (e: any) {
      
      console.log(e)
    }
  }

  async removeItem(i: any){

    try {
      
      let removeItems = await this.extApi.UpdateItem(
        [{
          "id": "string",
          "itemName": this.items.value.itemName,
          "description": this.items.value.description,
          "model": this.items.value.model,
          "powerRating": this.items.value.powerRating,
          "efficiency": this.items.value.efficiency,
          "unitPrice": this.items.value.unitPrice,
          "warrantyPeriod": this.items.value.warrantyPeriod,
          "stockQuantity": this.items.value.stockQuantity,
          "manFcId":  this.items.value.ManuFactures,
          "itemTypeId": this.items.value.itemType,
          "status": 1
        }]
      )

      console.log(removeItems)

      this.allItems.splice(i, 1);

    } catch (e:any) {
      console.log(e)

      
    }

  }
}
