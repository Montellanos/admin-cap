import { Router } from '@angular/router';
import { Login } from './../class/login';
import { User } from './../class/user';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';


import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Rx';


import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';


@Injectable()
export class AuthService {

  user: BehaviorSubject<User> = new BehaviorSubject(null);

  constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase, private router: Router) {
    this.afAuth.authState
      .switchMap(auth => {
        if (auth) {
          return this.db.object('users/' + auth.uid);
        } else {
          return Observable.of(null);
        }
      }).subscribe(user => {
        this.user.next(user);
      });

  }

  signOut() {
    this.afAuth.auth.signOut();
    this.router.navigate(['']);
  }

  signIn(userLogin: Login): Observable<any> {
    return Observable.fromPromise(
      this.afAuth.auth.signInWithEmailAndPassword(userLogin.email, userLogin.password)
        .then(user => {
          return true;
        }).catch(error => {
          return error.message;
        })
    );
  }

}
