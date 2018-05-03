import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import {GlobalService} from '../../../global.service';
import {AuthService} from '../../../services/auth.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-header-static',
  templateUrl: './header-static.component.html',
  styleUrls: ['./header-static.component.scss']
})
export class HeaderStaticComponent implements OnInit, OnDestroy {
  headerWhite = false;
  atHome = true;
  scrolledState = false;
  globalServiceSubscription: any;
  authServiceSubscription: any;
  authState: any;
  constructor(private globalService: GlobalService,
              private route: ActivatedRoute,
              private router: Router,
              private ref: ChangeDetectorRef,
              private authService: AuthService) {
                 this.authState = authService.authState;
              }
  updateElements() {
    this.headerWhite = false;
    this.atHome = true;
    if (this.router.url !== '' && this.router.url !== '/') {
      console.log(this.router.url);
      this.atHome = false;
      this.headerWhite = true;
    }

    this.globalServiceSubscription = this.globalService.change.subscribe(scrolledState => {
      this.headerWhite = scrolledState || !this.atHome;
      this.scrolledState = scrolledState;
    });
  }
  ngOnInit() {
    this.updateElements();

    this.authServiceSubscription = this.authService.change.subscribe((authState) => {
      this.authState = authState;
    });
  }
  sendMeHome() {
    this.atHome = true;
    this.headerWhite = false;
    this.ref.detectChanges();
    this.router.navigate(['']);
  }
  ngOnDestroy() {
    this.globalServiceSubscription.unsubscribe();
    this.authServiceSubscription.unsubscribe();
  }
  logInPlease() {
    this.authService.tryLogIn(null);
  }
  logOut() {
    this.authService.logOut();
  }

}
