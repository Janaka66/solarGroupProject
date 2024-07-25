import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { sharedData } from '../sharedData';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { SliderWindowComponent } from '../slider-window/slider-window.component';
import { AppService } from '../app.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-left-panel',
  templateUrl: './left-panel.component.html',
  styleUrls: ['./left-panel.component.scss'],
  animations: [
    trigger('expandCollapse', [
      state('collapsed', style({
        height: '0px',
        opacity: 0,
        overflow: 'hidden'
      })),
      state('expanded', style({
        height: '*',
        opacity: 1
      })),
      transition('collapsed <=> expanded', [
        animate('300ms ease-in-out')
      ])
    ])
  ]
})
export class LeftPanelComponent {

  @ViewChild("leftBarContainer", { read: ElementRef }) leftBarContainer: ElementRef | any;

  //send the module name to dashboard component to load
  @Output() leftPanelAction = new EventEmitter<any>();

  leftMenu:any = [];
  previousIdx: number = -1;
  currentIdx: number = -1;
  isExpanded = true;
  isShowing = false;
  flag: boolean = false;

  constructor( private sharedData : sharedData, private appService: AppService, private router: Router, private communicationService: AppService) {
    
  }

  
  ngOnInit(): void {

      this.sharedData.majorCompInfo.forEach(el => {
        
        this.leftMenu.push(el)
    })
  }

  ngAfterViewInit(){ 

    //send a module export name to show a module as default
    this.sendModuleName(this.leftMenu[0].comp, 1, '')
    
  }

  handleLeftBar() {    
    this.communicationService.sendData({ flag: true});
  }

  mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }

  mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }
  //
  sendModuleName(modeName : any, idx: number, event: any){

    if(idx === 0) return;

    if(event){
      
      event.stopPropagation();

      let allListItems = event.currentTarget.parentElement.querySelectorAll('li')
      let parentList = event.currentTarget.parentElement.parentNode.parentElement.querySelectorAll('li');

      allListItems?.forEach((el: any) => {
        
        el.classList.remove('selected')
      });

      parentList?.forEach((el: any) => {
        
        el.classList.remove('selected')
      });


    }

    //keep the selected left button as currunt index
    this.currentIdx = idx;

    //This avoid click the same button again and again
    if(this.previousIdx !== this.currentIdx){

      //send the module name to parent component to load
      this.leftPanelAction.emit(modeName)      

      //just make the current index as previous index then next click can compare those
      this.previousIdx = this.currentIdx;

    }
    
    if(event)
      event.currentTarget.classList.toggle('selected');

    this.communicationService.sendData({ flag: true });
  }

  logout(){
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    window.location.reload();
  }

  getSliderwindow(){
debugger
    this.appService.sendMsgToSetupSlider('slider')

  }
}
