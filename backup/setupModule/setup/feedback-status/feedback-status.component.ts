import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ExtApiService } from 'src/app/ext-api.service';

@Component({
  selector: 'app-feedback-status',
  templateUrl: './feedback-status.component.html',
  styleUrls: ['./feedback-status.component.scss']
})
export class FeedbackStatusComponent {

  feedback: any;
  allfeedbackNames = [] as any;
  disablefeedbackRemoveIcon: boolean = false;

  constructor( private formBuilder: FormBuilder, private extApi: ExtApiService){
    this.feedback = this.formBuilder.group({
      cfStatusDesc:    ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loaAllfeedbacks();
  }

  async addInputType(){

    if(this.feedback.value.cfStatusDesc === ''){

      alert("feedback is empty")
      return
    }

    if(this.allfeedbackNames.find((el: any) => el.cfStatusDesc === this.feedback.value.cfStatusDesc)){

      alert("feedback is already added")
      return
    }

    let reqFields = [
      {
        "cfStatusId": "string",
        "cfStatusDesc": this.feedback.value.cfStatusDesc,
        "status": 0
      }
    ]

    try {

      let adTypeRes = await this.extApi.AddFeedbackStatus(reqFields);
      console.log(adTypeRes)

      this.allfeedbackNames.push(
        {
          "cfStatusId": "string",
          "cfStatusDesc": this.feedback.value.cfStatusDesc,
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
      
      let feedbacksTypes = await this.extApi.GetFeedbackStatus();
      this.allfeedbackNames = feedbacksTypes.data.filter((el: any) => el.status === 0);

    } catch (e: any) {
      
      console.log(e)
    }
  }

  async removefeedback(i: any){
    try {
      
      let removefeedbackRes = await this.extApi.UpdateFeedbackStatus([{cfStatusId: this.allfeedbackNames[i].cfStatusId, cfStatusDesc: this.allfeedbackNames[i].cfStatusDesc, status: 1}])
      console.log(removefeedbackRes)

      this.allfeedbackNames.splice(i, 1);


    } catch (e:any) {
      console.log(e)

      
    }

  }
}