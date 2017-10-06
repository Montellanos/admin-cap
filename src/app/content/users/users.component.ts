import { User } from './../../series/class/user';
import { AngularFireDatabase } from 'angularfire2/database';
import { UsersService } from './../../series/services/users.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: Array<User>;
  loading = true;
  error_message_todown: string;

  constructor(private usersService: UsersService, private db: AngularFireDatabase) { }

  ngOnInit() {
    this.db.list('users').subscribe(res => {
      this.users = res;
      this.loading = false;
    });
  }


  toDownUser(key:string): void{
    this.usersService.toDownUser(key, false).subscribe(res=>{
      if(res !== true){
        this.error_message_todown = res;
      }
    });
  }

  deleteUser(key:string): void{
    this.usersService.deleteUser(key).subscribe(res=>{
      if(res !== true){
        console.log(res);
      }
    });
  }

  toUpUser(key: string): void{
    this.usersService.toDownUser(key, true).subscribe(res=>{
      if(res !== true){
        this.error_message_todown = res;
      }
    });
  }


}
