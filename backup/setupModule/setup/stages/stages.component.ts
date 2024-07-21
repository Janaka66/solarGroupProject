import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ExtApiService } from 'src/app/ext-api.service';

@Component({
  selector: 'app-stages',
  templateUrl: './stages.component.html',
  styleUrls: ['./stages.component.scss']
})
export class StagesComponent {
  
  stage: any;
  allSavedStages = [] as any;
  disableDocTypeRemoveIcon: boolean = false;

  constructor( private formBuilder: FormBuilder, private extApi: ExtApiService){
    this.stage = this.formBuilder.group({
      stagDesc:    ['', Validators.required],
    });
  }

  ngOnInit(): void {
      this.loaAllStages();
  }

  async addStagDesc(){

    if(this.stage.value.stagDesc === ''){
      alert("Stage is empty")
      return
    }

    if(this.allSavedStages.find((el: any) => el.stagDesc === this.stage.value.stagDesc)){

      alert("Stage is already added")
      return
    }

    let reqFields = [
      {
        "id": "string",
        "stagDesc": this.stage.value.stagDesc,
        "status": 0
      }
    ]

    try {

      let addStageRes = await this.extApi.AddStage(reqFields);
      console.log(addStageRes)

      this.allSavedStages.push({
        "id": "string",
        "stagDesc": this.stage.value.stagDesc,
        "status": 0
      })
      
      this.stage.reset();

    } catch (e: any) {
      
      console.log(e)

    }

  }

  async loaAllStages(){

    try {
      
      let stages = await this.extApi.Stages();
      this.allSavedStages = stages;

    } catch (e: any) {
      
      console.log(e)
    }
  }

  async removeStage(i: any){

    try {
      
      let removeStage = await this.extApi.UpdateStage({id: this.allSavedStages[i].id, stagDesc: this.allSavedStages[i].stagDesc, status: 1})
      console.log(removeStage)

      this.allSavedStages.splice(i, 1);


    } catch (e:any) {
      console.log(e)

      
    }

  }
}
