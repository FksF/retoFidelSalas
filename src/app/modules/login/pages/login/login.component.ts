import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Routes } from 'src/app/shared/enums/_routes';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public showPassword: boolean = false;
  myForm: FormGroup;

  constructor( 
    private sharedService: SharedService,
    private fb: FormBuilder,
  ) {
    this.myForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  public doLogin(): void {
    this.sharedService.redirect(Routes.users);
  }
}
