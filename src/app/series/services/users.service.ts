
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { User } from './../class/user';
import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import * as _ from 'lodash';

import * as firebase from 'firebase';

@Injectable()
export class UsersService {

  private roles = ['admin', 'editor'];
  private userRoles: Array<string>;
  private storageRef = firebase.storage().ref();


  constructor(private auth: AuthService, private db: AngularFireDatabase, private authReg: AngularFireAuth) {

    auth.user.map(user => {
      this.userRoles = _.keys(_.get(user, 'roles'));
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


  addUser(newUser: User): Observable<any> {
    return Observable.fromPromise(
      this.authReg.auth.createUserWithEmailAndPassword(newUser.email, newUser.phoneNumber).then(user => {
        return this.db.object('users/' + user.uid).update(newUser).then(user => {
          return true;
        }).catch(error => {
          return error.message;
        })
      }).catch(error => {
        return error.message;
      })
    );
  }

  updateUser(key: string, updateUser: User): Observable<any> {
    const aux = updateUser.roles;
    updateUser.roles = {};
    updateUser.roles[aux] = true;
    return Observable.fromPromise(
      this.db.object('users/' + key).update(updateUser).then(res => {
        return true;
      }).catch(error => {
        return error.message;
      })
    );
  }

  toDownUser(key: string, newState: boolean): Observable<any> {
    const data = {
      date: {
        updated_at: (new Date()).getTime()
      },
      state: newState
    }
    return Observable.fromPromise(
      this.db.object('users/' + key).update(data).then(res => {
        return true;
      }).catch(error => {
        return error.message;
      })
    );
  }


  deleteUser(key: string): Observable<any> {
    return Observable.fromPromise(
      this.db.object('users/' + key).remove().then(res => {
        return true;
      }).catch(error => {
        return error.message;
      })
    );
  }


  updateUserPhoto(key: string, photo: any): Observable<any> {
      const iRef = this.storageRef.child('img/users/' + key + (photo[0].name.substring(photo[0].name.lastIndexOf('.'))));
      return Observable.fromPromise(
      iRef.put(photo[0]).then((snapshot) => {
          return this.db.object('users/' + key).update({ 'photoURL': snapshot.downloadURL }).then(res=>{
            return true;
          }).catch(error=>{
            return error.message;
          })
      }));
  }





}
