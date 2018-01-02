import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loginForm: FormGroup;
  error: string;

  constructor(
    public navCtrl: NavController,
    private fb: FormBuilder,
    private authService: AuthServiceProvider) {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      'email': ['', Validators.email],
      'password': ['', Validators.required]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  signUp() {
    this.navCtrl.push('SignupPage');
  }

  loginAnonymously() {
    this.authService.loginAnonymously();
  }

  onLogin(form: any) {
    if (form.valid) {
      this.authService.login(form.value.email, form.value.password)
        .then(
        success => console.log(success)
        )
        .catch(err => this.error = err);
    }
  }
}