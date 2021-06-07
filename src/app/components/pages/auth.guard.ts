import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Injectable } from '@angular/core';


import jwt_decode from 'jwt-decode';
export interface DToken {
    authorities: string[];
    exp: number;
    iat: number;
    sub: string;
  }
@Injectable()
export class AuthGuard implements CanActivate {


  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {

    const token = localStorage.getItem('token');
    const decoded: DToken = jwt_decode(token);
    if (token) {
   
      return true;
    } else {
      this.router.navigate(['/pages/my-account']);
    }
  }
}