import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Rx';
import { AngularFireDatabase } from 'angularfire2/database';
import { User } from './../class/user';
import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import * as _ from 'lodash';

@Injectable()
export class UsersService {

  private roles = ['admin', 'editor'];
  private userRoles: Array<string>;

  constructor(private auth: AuthService, private db: AngularFireDatabase) {

    auth.user.map(user => {
      this.userRoles = _.keys(_.get(user, 'roles'));
      console.log(this.userRoles);
      return this.roles;
    }).subscribe();

  }


  get canCreate(): boolean {
    const allowed = ['admin'];
    return this.matchingRole(allowed);
  }
  get canRead(): boolean {
    const allowed = ['admin', 'editor'];
    return this.matchingRole(allowed);
  }
  get canUpdate(): boolean {
    const allowed = ['admin'];
    return this.matchingRole(allowed);
  }
  get canDelete(): boolean {
    const allowed = ['admin'];
    return this.matchingRole(allowed);
  }




  private matchingRole(allowedRoles): boolean {
    return !_.isEmpty(_.intersection(allowedRoles, this.userRoles));
  }


  getRoles(): Array<string> {
    return this.roles;
  }


  private validateRoles(role: string): boolean {
    let control = false;
    this.roles.forEach(rol => {
      if (rol === role) {
        control = true;
      }
    });
    return control;
  }




}
