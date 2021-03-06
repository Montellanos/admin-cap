import { User } from './../../../series/class/user';
import { UsersService } from './../../../series/services/users.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  add_user_form: FormGroup;
  loading = false;
  error_message: string;
  available_roles: Array<string>;
  submitted = false;

  constructor(private formBuild: FormBuilder, private userService: UsersService, private router: Router) {
    this.available_roles = userService.getRoles();
  }

  ngOnInit() {
    this.add_user_form = this.formBuild.group({
      displayName: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(60),
        Validators.pattern(/^[a-záéíóúñA-ZÁÉÍÓÚÑ\s]*$/)
      ]],
      email: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(60),
        Validators.pattern(/^[a-záéíóúñA-ZÁÉÍÓÚÑ0-9.!#$%&'*+/=?^_`{|}~-]+@[a-záéíóúñA-ZÁÉÍÓÚÑ0-9-]+(?:\.[a-záéíóúñA-ZÁÉÍÓÚÑ0-9-]+)*$/)]],
      phoneNumber: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(60),
        Validators.pattern(/([1-9][0-9]*)|0/)
      ]],
      roles: ['', [
        Validators.compose([Validators.required])
      ]]
    });
  }


  addUser(newUser: User, isValid: boolean): void{
    this.submitted = true;
    if(isValid){
      this.loading = true;
      const aux = newUser.roles;
      newUser.roles = {};
      newUser.roles[aux] = true;
      const us = new User(newUser);

      this.userService.addUser(us)
      .subscribe(res=>{
          this.loading= false;
          console.log(res);
          if(res !== true){
            this.error_message = res;
          }
      });
    }
  }

}
