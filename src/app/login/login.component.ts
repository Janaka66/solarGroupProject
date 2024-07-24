import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  checkoutForm: any;
  
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router){
    this.checkoutForm = this.formBuilder.group({
      'username': '',
      'password': ''
    });
  }

  async navigate(userData : any) {  
    
    this.authService.login(userData.username, userData.password).then(async () =>{     
      
      this.router.navigate([''])

    } 
    );
  }
}
