import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CanActivate, CanLoad, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router,) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean | UrlTree {
    var routePath = '/auth/login';
    var isAuthenticated = this.authService.isLoggedIn()

    if(isAuthenticated) {
      return true
    }
    
    const tree: UrlTree = this.router.parseUrl(routePath);
    return tree;
  }
}