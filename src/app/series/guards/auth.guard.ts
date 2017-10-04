import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authAf: AngularFireAuth, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean>  {
    return this.authAf.authState.map(user => {
      if (!user) {
        this.router.navigate(['/']);
        return false;
      } else {
        return true;
      }
    }).take(1);
  }
}
