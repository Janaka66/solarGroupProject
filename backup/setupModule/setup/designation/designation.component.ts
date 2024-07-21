import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ExtApiService } from 'src/app/ext-api.service';

@Component({
  selector: 'app-designation',
  templateUrl: './designation.component.html',
  styleUrls: ['./designation.component.scss']
})
export class DesignationComponent {

  
  designation: any;
  alldesoignations = [] as any;
  disablefeedbackRemoveIcon: boolean = false;

  constructor( private formBuilder: FormBuilder, private extApi: ExtApiService){
    this.designation = this.formBuilder.group({
      desgDesc:    ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loaAllfeedbacks();
  }

  async addInputType(){

    if(this.designation.value.desgDesc === ''){

      alert("designation is empty")
      return
    }

    if(this.alldesoignations.find((el: any) => el.desgDesc === this.designation.value.desgDesc)){

      alert("designation is already added")
      return
    }

    let reqFields = [
      {
        "id": "string",
        "desgDesc": this.designation.value.desgDesc,
        "status": 0
      }
    ]

    try {

      let adTypeRes = await this.extApi.AddEmployeeDesignation(reqFields);
      console.log(adTypeRes)

      this.alldesoignations.push(
        {
          "id": "string",
          "desgDesc": this.designation.value.desgDesc,
          "status": 0
        }
      )
      
      this.designation.reset();

    } catch (e: any) {
      
      console.log(e)

    }

  }

  async loaAllfeedbacks(){

    try {
      
      let feedbacksTypes = await this.extApi.GetEmployeeDesignation();
      this.alldesoignations = feedbacksTypes.data.filter((el: any) => el.status === 0);

    } catch (e: any) {
      
      console.log(e)
    }
  }

  async removefeedback(i: any){
    
    try {
      
      let removefeedbackRes = await this.extApi.UpdateEmployeeDesignation([{id: this.alldesoignations[i].id, desgDesc: this.alldesoignations[i].desgDesc, status: 1}])
      console.log(removefeedbackRes)

      this.alldesoignations.splice(i, 1);


    } catch (e:any) {
      console.log(e)

      
    }

  }
}
