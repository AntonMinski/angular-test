import { Component, OnInit } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { AuthService } from '../../_services/auth.service';
import { TokenStorageService } from '../../_services/token.storage.service';
import { AppRoutingModule } from '../../app-routing.module';
import {Router} from "@angular/router"



@Component({
   selector: 'login',
   templateUrl: './login.component.html',
   styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
   loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
   })

   constructor(private formBuilder: FormBuilder, private authService: AuthService, private tokenStorage: TokenStorageService,
               private router: Router) {}

   ngOnInit() {}

   submit() {
      if (this.loginForm.invalid) {
         return
      }

      // TODO: connect to backend
     const val = this.loginForm.value;

     this.authService.login(val.email, val.password).subscribe(
         async (data) => {
           console.log('data', data);
           this.tokenStorage.saveToken(data.token);
           this.tokenStorage.saveUser(data.user);

           // this.isLoginFailed = false;
           // this.isLoggedIn = true;
           // this.roles = this.tokenStorage.getUser().roles;
           // this.reloadPage();
           await this.router.navigate(['/main']);
         },
         err => {
           console.log('authService', err);
           // this.errorMessage = err.error.message;
           // this.isLoginFailed = true;
         }
       );

   }
}
