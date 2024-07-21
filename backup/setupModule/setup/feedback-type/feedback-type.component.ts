import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ExtApiService } from 'src/app/ext-api.service';

@Component({
  selector: 'app-feedback-type',
  templateUrl: './feedback-type.component.html',
  styleUrls: ['./feedback-type.component.scss']
})
export class FeedbackTypeComponent {


  feedback: any;
  allfeedbackNames = [] as any;
  disablefeedbackRemoveIcon: boolean = false;

  constructor( private formBuilder: FormBuilder, private extApi: ExtApiService){
    this.feedback = this.formBuilder.group({
      typeDesc:    ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loaAllfeedbacks();
  }

  async addInputType(){

    if(this.feedback.value.typeDesc === ''){

      alert("feedback is empty")
      return
    }

    if(this.allfeedbackNames.find((el: any) => el.typeDesc === this.feedback.value.typeDesc)){

      alert("feedback is already added")
      return
    }

    let reqFields = [
      {
        "cfType": "string",
        "typeDesc": this.feedback.value.typeDesc,
        "status": 0
      }
    ]

    try {

      let adTypeRes = await this.extApi.AddFeedbackType(reqFields);
      console.log(adTypeRes)

      this.allfeedbackNames.push(
        {
          "cfType": "string",
          "typeDesc": this.feedback.value.typeDesc,
          "status": 0
        }
      )
      
      this.feedback.reset();

    } catch (e: any) {
      
      console.log(e)

    }

  }

  async loaAllfeedbacks(){

    try {
      
      let feedbacksTypes = await this.extApi.GetFeedbacktype();
      this.allfeedbackNames = feedbacksTypes.data.filter((el: any) => el.status === 0);

    } catch (e: any) {
      
      console.log(e)
    }
  }

  async removefeedback(i: any){

    try {
      
      let removefeedbackRes = await this.extApi.UpdateFeedbackType([{cfType: this.allfeedbackNames[i].cfType, typeDesc: this.allfeedbackNames[i].typeDesc, status: 1}])
      console.log(removefeedbackRes)

      this.allfeedbackNames.splice(i, 1);


    } catch (e:any) {
      console.log(e)

      
    }

  }
}