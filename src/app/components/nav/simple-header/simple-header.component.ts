import {ChangeDetectorRef, Component, ElementRef, HostListener, Inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {GlobalService} from '../../../services/global.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../../services/auth.service';
import {ApiService} from '../../../services/api.service';
import {DOCUMENT} from '@angular/common';

@Component({
  selector: 'app-simple-header',
  templateUrl: './simple-header.component.html',
  styleUrls: ['./simple-header.component.scss']
})
export class SimpleHeaderComponent implements OnInit, OnDestroy {

  user = {username: ''};

  /**
   * Header white flag
   */
  headerWhite = false;

  /**
   * Header is transparent on these URLs
   */
  transparentHeaderUrls = ['', '/'];

  /**
   * Is router at '/'
   */
  atHome = true;

  /**
   * Scroll position
   */
  scrolledState = false;

  /**
   * Is header menu expanded
   */
  isMenuExpanded = true;

  /**
   * Global Service subscription
   */
  globalServiceSubscription: any;

  /**
   * Authentication Service subscription
   */
  authServiceSubscription: any;

  /**
   * Current Authentication state
   */
  authState: any;

  /**
   * Inner width
   */
  public innerWidth: any;


  @ViewChild('navContainer') navContainer: ElementRef;

  /**
   * Constructor.
   * @param document  Window document Injection.
   * @param route  ActivatedRoute Injection.
   * @param router  Router Injection.
   * @param globalService  GlobalService Injection.
   * @param authService  AuthService Injection.
   * @param apiService  ApiService Injection.
   * @param ref  Angular Change Detector Injection.
   */
  constructor(private globalService: GlobalService,
              private route: ActivatedRoute,
              private router: Router,
              private ref: ChangeDetectorRef,
              public authService: AuthService,
              private apiService: ApiService,
              @Inject(DOCUMENT) private document: Document) {
    this.authState = authService.authState;
  }

  /**
   * Update View Elements (called after onInit).
   */
  updateElements() {
    this.globalServiceSubscription = this.globalService.currentScrolledState.subscribe(scrolledState => {
      this.headerWhite = scrolledState || !this.atHome;
      this.scrolledState = scrolledState;
    });
  }

  /**
   * Component on intialized.
   */
  ngOnInit() {
    this.authServiceSubscription = this.authService.change.subscribe((authState) => {
      this.authState = authState;
      console.log('simple header component auth state', this.authState);
      if (authState.isLoggedIn) {
        this.user = this.authState;
      }
    });

    this.updateElements();
    this.innerWidth = window.innerWidth;
    if (this.innerWidth > 810) {
      this.isMenuExpanded = true;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth > 810) {
      this.isMenuExpanded = true;
    }
  }

  /**
   * Component on destroyed.
   */
  ngOnDestroy() {
    if (this.globalServiceSubscription) {
      this.globalServiceSubscription.unsubscribe();
    }
    if (this.authServiceSubscription) {
      this.authServiceSubscription.unsubscribe();
    }
  }

  /**
   * Perform Log-out.
   */
  logOut() {
    this.authService.logOut();
  }

  /**
   * Flag for expanding navigation menu on the header.
   */
  menuExpander() {
    this.isMenuExpanded = !this.isMenuExpanded;
  }

}


