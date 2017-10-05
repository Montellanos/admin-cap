import { AngularFireDatabase } from 'angularfire2/database';
import { User } from './../../../series/class/user';
import { UsersService } from './../../../series/services/users.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  update_user_form: FormGroup;
  loading_page = false;
  loading = false;
  error_message: string;
  available_roles: Array<string>;
  submitted = false;
  updateUser :User;

  constructor(private formBuild: FormBuilder, private userService: UsersService, private route: ActivatedRoute, private db : AngularFireDatabase) {
    let key : string;
    route.params.forEach(param=>{
      key = param['$key']
    });
    this.db.object('users/'+ key).subscribe(res=>{
      this.updateUser = res;
      this.loading_page = true;
    });
  }

  ngOnInit() {

    this.update_user_form = this.formBuild.group({
      name: ['', [
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
      cellphone: ['', [
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

}
