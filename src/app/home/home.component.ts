import { Component, ComponentFactoryResolver, OnDestroy, ViewChild, ViewContainerRef } from '@angular/core';
import { AppService } from '../app.service';
import { Subscription } from 'rxjs';
import { SliderWindowComponent } from '../slider-window/slider-window.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnDestroy{

  @ViewChild('viewContainer', {read : ViewContainerRef}) viewConatiner :ViewContainerRef | any;
  @ViewChild('sliderWindow') SliderWindowComponent: SliderWindowComponent | any;
  
  isToggled: boolean = true;

  private subscription: Subscription;

  constructor(
    private componentFactoryResolver : ComponentFactoryResolver, private communicationService: AppService
  ){

    this.subscription = this.communicationService.data$.subscribe((data: any) => {

      if(typeof data.flag === 'boolean'){
        this.isToggled = data.flag;
      }
  

      // if(data === 'slider'){
      //   this.SliderWindowComponent.sliderEnableDisable({width: 55, height: 685});

      // }
        

    });

  }

  viewModule(module: any){

    this.viewConatiner.clear(); //Clear the previous loaded module
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(module);
    const componentRef = componentFactory.create(this.viewConatiner.parentInjector);
    this.viewConatiner.insert(componentRef.hostView)
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
