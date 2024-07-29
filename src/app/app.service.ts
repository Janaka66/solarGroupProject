import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private dataSubject = new Subject<any>();
  private dataSlider = new Subject<any>();

  data$ = this.dataSubject.asObservable();
  sliderInform$ = this.dataSlider.asObservable();
  currentUser: any;
  selectedForInq = [] as any;

  constructor() { }
  
  sendData(data: any) {
    this.dataSubject.next(data);
  }

  enableInvices(data: any) {
    this.dataSubject.next(data);
  }

  sendMsgToSetupSlider(data: any) {
    this.dataSubject.next(data);
  }
}
