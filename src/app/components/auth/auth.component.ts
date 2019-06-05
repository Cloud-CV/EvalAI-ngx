import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalService } from '../../services/global.service';
import {AuthService} from '../../services/auth.service';

/**
 * Component Class
 */
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, AfterViewInit {

  /**
   * router local instance
   */
  localRouter: any;

  @ViewChild('authContainer') authContainer: ElementRef;

  /**
   * Constructor.
   * @param router  Router Injection.
   * @param route  ActivatedRoute Injection.
   * @param globalService  GlobalService Injection.
   * @param authService
   */
  constructor(private router: Router, private route: ActivatedRoute, private globalService: GlobalService,
              private authService: AuthService) { }

  /**
   * Component on initialization.
   */
  ngOnInit() {
    this.localRouter = this.router;
    this.globalService.scrollToTop();
    this.authService.resetForm();
  }

  ngAfterViewInit(): void {}

  /**
   * Navigate to a certain URL.
   * @param url  URL to navigate to (not in paranthesis)
   */
  navigateTo(url) {
    this.router.navigate([ url ]);
  }
}
