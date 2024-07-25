import { AfterViewInit, ChangeDetectorRef, Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { AppService } from '../app.service';
import { Subscription } from 'rxjs';
import { SliderWindowComponent } from '../slider-window/slider-window.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit{

    @ViewChild('sliderWindow') SliderWindowComponent: SliderWindowComponent | any;
    
    flag: boolean = false;

    inquiries = [] as any;
    complains = [] as any;
    reminders = [] as any;

    pendingIncomeChartData: any;
    monthlyIncomChartData: any;
    pendingIncomeChartOptions: any;
    monthlyIncomChartOption: any;
    subscription: Subscription;
    showLoader = false;
    
  constructor(private communicationService: AppService, private cdr: ChangeDetectorRef){

    this.subscription = this.communicationService.data$.subscribe((data: any) => {
        
        if(data === 'slider')
            this.SliderWindowComponent.sliderEnableDisable({width: 55, height: 685});
 
    });
  }

    ngAfterViewInit(): void {
        this.cdr.detectChanges();
    }
  
  ngOnInit(){

    this.loadMonthlyIncomeChart();  
    this.loadPendingIncomeChart();
  }

  handleLeftBar() {
    
    this.communicationService.sendData({ flag: false });
  }

  loadMonthlyIncomeChart(){
    this.monthlyIncomChartData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sep','Oct','Nov','Dec'],
      datasets: [
          {
              type: 'line',
              label: 'Dataset 1',
              
              borderWidth: 2,
              fill: false,
              tension: 0.4,
              data: [50, 25, 12, 48, 56, 76, 42, 25, 12, 48, 56, 76, 42],
              borderColor: 'blue',
              backgroundColor: 'red'
          },
          {
              type: 'bar',
              label: 'Dataset 2',
              data: [21, 84, 24, 75, 37, 65, 34, 25, 12, 48, 56, 76, 42],
              borderColor: 'white',
              borderWidth: 2,
              backgroundColor: 'green'
          }
      ]
  };
  
  this.monthlyIncomChartOption = {
      maintainAspectRatio: true,
      plugins: {
          legend: {
              labels: {
                  color: 'black'
              }
          }
      },
      scales: {
          x: {
              ticks: {
                  color: 'black'
              },
              grid: {
                  color: 'gray'
              }
          },
          y: {
              ticks: {
                  color: 'black'
              },
              grid: {
                  color: 'gray'
              }
          }
      }
  };
  }

  loadPendingIncomeChart(){
    this.pendingIncomeChartData = {
      labels: ['A', 'B'],
      datasets: [
          {
              data: [540, 325],
              backgroundColor: ['blue', 'green'],
              hoverBackgroundColor: ['lightblue', 'lightgreen']
          }
      ]
  };

  this.pendingIncomeChartOptions = {
    maintainAspectRatio: true,
      plugins: {
          legend: {
              labels: {
                  color: 'black'
              }
          }
      }
  };
  }
}
