import { Injectable } from '@angular/core';

const BING_CREDENTIAL_DEV  = 'AleaH-DeUA5XgSC2wKD_fS4eNKvYAxNtuK3r8IDnNcq1LS9donxMD_9bA662-9mQ';   //trial2  (develop,nighthawkanalytics.com)   AleaH-DeUA5XgSC2wKD_fS4eNKvYAxNtuK3r8IDnNcq1LS9donxMD_9bA662-9mQ
const BING_CREDENTIAL_PROD = 'AlOjrAc97iuHbFAbxE-5du2NHoecmEIHJqNbbNDsHcDi1h57rGpNBYs2ptZQ5Qdl';
const GOOGLE_CREDENTIAL = "AIzaSyAZaC2piTHF_zJnvJ7TmC_1Z5n5Dc7-_kc";

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {

  localApi: boolean = false;

  constructor() { 
    
  }

  //------------------- Paths -----------------------
  private paths: any = {

    'api': {
      develop: 'http://www.solardb.somee.com',
      production: 'http://www.solardb.somee.com',
      local: this.localApi ? 'http://localhost:8081/api' : 'http://www.solardb.somee.com'
    },

  }
  
  public getEnvironment() {
    let url = window.location.href;

    if (url.indexOf('localhost') >= 0)
      return 'local';
    else
      if (url.indexOf('develop') >= 0)
        return 'develop'
      else
        return 'production';
  }

  public getBaseUrl(name: string) {

    let env = this.getEnvironment();
    return this.paths[name][env];
  }



}
