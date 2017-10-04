import { AngularFireDatabase } from 'angularfire2/database';
import { UsersService } from './../../series/services/users.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: any;
  loading = true;

  constructor(private usersService: UsersService, private db: AngularFireDatabase) { }

  ngOnInit() {



  }

}
