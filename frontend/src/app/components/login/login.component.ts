import { Component, OnInit } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'

@Component({
   selector: 'login',
   templateUrl: './login.component.html',
   styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
   loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
   })

   constructor(private formBuilder: FormBuilder) {}

   ngOnInit() {}

   submit() {
      if (this.loginForm.invalid) {
         return
      }

      // TODO: connect to backend
   }
}
