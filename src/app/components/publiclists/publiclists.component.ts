import {Component, OnInit, Inject, OnDestroy} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { GlobalService } from '../../services/global.service';
import {AuthService} from '../../services/auth.service';

/**
 * Component Class
 */
@Component({
  selector: 'app-publiclists',
  templateUrl: './publiclists.component.html',
  styleUrls: ['./publiclists.component.scss']
})
export class PubliclistsComponent implements OnInit, OnDestroy {

  /**
   * Authentication Service subscription
   */
  authServiceSubscription: any;

  /**
   * Constructor.
   * @param document  Window document Injection.
   * @param route  ActivatedRoute Injection.
   * @param router  Router Injection.
   * @param authService
   * @param globalService  GlobalService Injection.
   */
  constructor(private router: Router, private route: ActivatedRoute, @Inject(DOCUMENT) private document: Document,
              public  authService: AuthService, private globalService: GlobalService) { }

  /**
   * Component on intialized.
   */
  ngOnInit() {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/auth/login']);
    }
    this.authServiceSubscription = this.authService.change.subscribe((authState) => {
      if (!authState.isLoggedIn) {
        console.log('dashboard component auth state', authState);
        this.router.navigate(['/auth/login']);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.authServiceSubscription) {
      this.authServiceSubscription.unsubscribe();
    }
  }
}
