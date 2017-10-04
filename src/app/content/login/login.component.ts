import { AuthService } from './../../series/services/auth.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Login } from './../../series/class/login';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  login_form: FormGroup;
  loading =  false;
  error_message: string;

  constructor(private formBuild: FormBuilder, private auth: AuthService, private afAuth: AngularFireAuth, private router: Router) {

  }

  ngOnInit() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.router.navigate(['/dashboard']);
      } else {
        this.auth.signOut();
      }
    });
    this.login_form = this.formBuild.group(
      {
        email: ['', [
          Validators.required,
          Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zñA-ZÑ0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
        ]],
        password: ['', [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(15)
        ]]
      }
    );
  }


  login(userLogin: Login, isValid: boolean): void {
    this.error_message = '';
    if (isValid) {
      this.loading = true;
      this.auth.signIn(userLogin)
        .subscribe(resolve => {
          if (resolve !== true) {
            this.error_message = 'Acceso negado, re-intente.';
          }
          this.loading = false;
        });
    }
  }




}
