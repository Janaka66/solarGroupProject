import { HttpBackend } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { ExtApiService } from '../ext-api.service';
import { AppService } from '../app.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( 

    public jwtHelper : JwtHelperService, 
    public handler : HttpBackend, 
    public extApi: ExtApiService,
    private router: Router,
    private appService: AppService
  ) { 

  }

  login(userName: any, password: any) {

    return new Promise(async (resolve, reject) => {


      let reqFields = {
        "userName": userName,
        "password": password
      }

      try {

        let token = await this.extApi.validateUserLogin(reqFields);

        if(token.data[0]){

          localStorage.setItem("token", token.data[0]);
          this.appService.currentUser = userName;
          resolve(true);

        }else{

          console.log("login failed. Token not recevied")
          reject(true)

        }

      } catch (error) {
        
        console.log("error during login: ", error)
        reject(false)
      }
      
    })

  }  

  public isAuthenticated(): boolean {
    
    let token = localStorage.getItem('token');
    
    return !this.jwtHelper.isTokenExpired(token);

  }

  logout() {

    localStorage.removeItem('token');

    this.router.navigate(['/login']);
    
  }
  
}

export async function tokenGetter(): Promise<any> {
  alert('getterExcuted')
  return localStorage.getItem('token');

}