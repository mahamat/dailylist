import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  signupForm: FormGroup;
  error:string;
  success:string;

  constructor(
    private fb: FormBuilder,
    private authService:AuthServiceProvider) {
    this.createForm();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  createForm() {
    this.signupForm = this.fb.group({
      'email': ['aww@deneme.com', Validators.email],
      'password': ['123456', Validators.required]
    });
  }

  onSignup(form: any) {
    if (form.valid) {
      this.authService.signUp(form.value.email, form.value.password)
      .then(response => console.log(response))
      .catch(err => this.error = err);
    }
  }
}
