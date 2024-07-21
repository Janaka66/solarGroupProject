import { ChangeDetectorRef, Component, OnInit, Renderer2  } from '@angular/core';

interface SpinnerOptions {
  spinnerWrap: { [key: string]: string };
  spinner: { [key: string]: string };
}

@Component({
  selector: 'app-common-loader',
  templateUrl: './common-loader.component.html',
  styleUrls: ['./common-loader.component.scss']
})
export class CommonLoaderComponent implements OnInit {

  public isLoading: boolean | any;
  public _options: SpinnerOptions = { spinnerWrap: {}, spinner: {} };
  
  constructor(private renderer: Renderer2,  private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this._options = {
      spinnerWrap: {
        'position': 'absolute',
        'z-index': '999',
        'background': '#0d0e0e6b',
        'top': '0',
        'left': '0',
        'bottom': '-2px',
        'right': '0',
        'pointer-events': 'none',
        'height': '100%'
      },
      spinner: {
        'position': 'absolute',
        'top': '50%',
        'left': '50%',
        'transform': 'translate(-50%, -50%)'
      }
    };
  }

  public show(){
    this.isLoading = true;
    this.cdr.detectChanges();
  }

  public hide(){
    this.isLoading = false;
    this.cdr.detectChanges();
  }

  public setOptions(options: Partial<SpinnerOptions>): void {
    if (options.spinnerWrap) {
      for (const key of Object.keys(options.spinnerWrap)) {
        this._options.spinnerWrap[key] = options.spinnerWrap[key]!;
      }
    }
  
    if (options.spinner) {
      for (const key of Object.keys(options.spinner)) {
        this._options.spinner[key] = options.spinner[key]!;
      }
    }
  }

  public disableCurrModule(){
    this.isLoading = true;
    this._options.spinnerWrap['dispaly'] = "block";
    this._options.spinner['display'] = "none";
    this.cdr.detectChanges();
  }

  public disableEntireScreen(){

    const recaptchaContainer = this.renderer.createElement('div');

    recaptchaContainer.style.display = "block";
    recaptchaContainer.style.position = "absolute";
    recaptchaContainer.style.background = "#0d0e0e6b";
    recaptchaContainer.style.top = "0";
    recaptchaContainer.style.left = "0";
    recaptchaContainer.style.right = "0";
    recaptchaContainer.style.bottom = "-2px";
    recaptchaContainer.style['z-index'] = "9999999";

    this.renderer.appendChild(document.body, recaptchaContainer);

  }


}
