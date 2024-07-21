import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ExtApiService } from 'src/app/ext-api.service';
import { sharedData } from 'src/app/sharedData';

@Component({
  selector: 'app-item-types',
  templateUrl: './item-types.component.html',
  styleUrls: ['./item-types.component.scss']
})
export class ItemTypesComponent {

  itemType: any;
  allSavedItemTypes = [] as any;

  constructor( private formBuilder: FormBuilder, private extApi: ExtApiService, private sharedData : sharedData){
    this.itemType = this.formBuilder.group({
      name:    ['', Validators.required],
    });
  }

  ngOnInit(): void {
      this.loadAllItemTypes();
  }

  async addItemType(){

    if(this.itemType.value.name === ''){
      alert("Item Type is empty")
      return
    }

    if(this.allSavedItemTypes.find((el: any) => el.name === this.itemType.value.name)){

      alert("Item Type is already added")
      return
    }

    let reqFields = [
      {
        "id": "string",
        "name": this.itemType.value.name,
        "status": 0
      }
    ]

    try {

      let addItemTypeRes = await this.extApi.AddItemType(reqFields);
      console.log(addItemTypeRes)

      this.allSavedItemTypes.push({
        "id": "string",
        "name": this.itemType.value.name,
        "status": 0
      });
      
      this.sharedData.allSavedItemTypes = this.allSavedItemTypes.data;

      this.itemType.reset();

    } catch (e: any) {
      
      console.log(e)

    }

  }

  async loadAllItemTypes(){
    
    try {
      
      let itemTypes = await this.extApi.ItemTypes();
      this.allSavedItemTypes = itemTypes.data;

      this.sharedData.allSavedItemTypes = this.allSavedItemTypes.data;

    } catch (e: any) {
      
      console.log(e)
    }
  }

  async removeItemType(i: any){

    try {
      
      let removeItemType = await this.extApi.UpdateItemType([{id: this.allSavedItemTypes[i].id, name: this.allSavedItemTypes[i].name, status: 1}])
      console.log(removeItemType)

      this.allSavedItemTypes.splice(i, 1);

      this.sharedData.allSavedItemTypes = this.allSavedItemTypes.data;

    } catch (e:any) {
      console.log(e)

      
    }

  }
}
