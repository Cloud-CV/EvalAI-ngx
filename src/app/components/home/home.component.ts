import {Component, OnDestroy, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {EndpointsService} from '../../services/endpoints.service';
import {AuthService} from '../../services/auth.service';
import {GlobalService} from '../../services/global.service';
import {BehaviorSubject} from 'rxjs';

/**
 * Component Class
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  public user = {};
  public challengeList = [];
  constructor(private apiService: ApiService, private endpointService: EndpointsService, private authService: AuthService,
              private globalService: GlobalService) { }

  ngOnInit() {
    this.init();
    this.getChallenge();
  }

  init() {
    this.authService.fetchUserDetails();
    this.apiService.getUrl(this.endpointService.userDetailsURL()).subscribe(
      response => {
        const status = response.status;
        const details = response.data;
        if (status === 200) {
          this.user['name'] = details.username;
        }
      },
      err => { this.globalService.handleApiError(err); },
      () => {}
    );
  }

  getChallenge() {
    this.apiService.getUrl(this.endpointService.featuredChallengesURL()).subscribe(
      response => {
        this.challengeList = response.data;
      },
      err => { this.globalService.handleApiError(err); },
      () => {}
    );

  }

  hostChallenge() {}

  ngOnDestroy() {}
}
