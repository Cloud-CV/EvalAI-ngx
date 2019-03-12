import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { GlobalService } from '../../../services/global.service';
import { AuthService } from '../../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ChallengeService } from '../../../services/challenge.service';
import { EndpointsService } from '../../../services/endpoints.service';

/**
 * Component Class
 */
@Component({
  selector: 'app-challengelist',
  templateUrl: './challengelist.component.html',
  styleUrls: ['./challengelist.component.scss']
})
export class ChallengelistComponent implements OnInit {

  /**
   * Filter toggle flag
   */
  isUpcomingChecked = true;

  /**
   * Filter toggle flag
   */
  isOngoingChecked = true;

  /**
   * Filter toggle flag
   */
  isPastChecked = false;

  /**
   * Upcoming challenges list
   */
  upcomingChallenges = [];

  /**
   * Ongoing challenges list
   */
  ongoingChallenges = [];

  /**
   * Past challeges list
   */
  pastChallenges = [];

  /**
   * API common path
   */
  apiPathCommon = 'challenges/challenge/';

  /**
   * API path mapping
   */
  apiPathMapping = {
    isUpcomingChecked: this.apiPathCommon + 'future',
    isOngoingChecked: this.apiPathCommon + 'present',
    isPastChecked: this.apiPathCommon + 'past'
  };

  /**
   * List of filtered challenges
   */
  filteredChallenges = [];

  /**
   * List of filtered-further challenges
   */
  filteredChallengesView = [];

  /**
   * Team list
   */
  allTeams = [];

  /**
   * Display more frames of teams
   */
  seeMore = 1;

  /**
   * Frame size
   */
  windowSize = 10;

  /**
   * Auth service public instance
   */
  authServicePublic: AuthService;

  /**
   * Router public instance
   */
  routerPublic: Router;

  /**
   * Is user Logged in
   */
  isLoggedIn: any = false;

  /*
  * What request, the user is making? 'All' challenges or 'His' challenges
  * */
  public challengeRequest: String = '';

  /**
   * Constructor.
   * @param route  ActivatedRoute Injection.
   * @param router  Router Injection.
   * @param globalService  GlobalService Injection.
   * @param authService  AuthService Injection.
   * @param apiService  ApiService Injection.
   * @param challengeService ChallengeService Injection
   * @param endpointsService EndpointsService Injection
   */
  constructor(private apiService: ApiService,
              private authService: AuthService,
              private globalService: GlobalService,
              private router: Router,
              private route: ActivatedRoute,
              private challengeService: ChallengeService,
              private endpointsService: EndpointsService) {
  }

  /**
   * Component on intialized.
   */
  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.isLoggedIn = true;
    }
    if (this.router.url === '/challenges/all') {
      this.fetchChallenges();
      this.challengeRequest = 'all';
    } else if (this.router.url === '/challenges/me' && this.authService.isLoggedIn()) {
      this.fetchHostChallengesAll();
      this.fetchMyTeams();
      this.challengeRequest = 'me';
    }
    this.authServicePublic = this.authService;
    this.routerPublic = this.router;
  }

  /**
   * Fetch challenges's host teams and corresponding challenges hosted by them
   * @param callback  Callback Function.
   */

  fetchHostChallengesAll(callback = null) {
    const hostChallengeList = [];
    let API_PATH = this.endpointsService.allHostTeamsURL();
    const SELF = this;
    this.apiService.getUrl(API_PATH).subscribe(
      data => {
        const hostTeams = data['results'];
        for (let i = 0; i < hostTeams.length; i++) {
          API_PATH = this.endpointsService.challengeByHostURL(hostTeams[i]['id']);
          this.apiService.getUrl(API_PATH).subscribe(
            result => {
              for (let j = 0; j < result['results'].length; j++) {
                hostChallengeList.push(result['results'][j]);
              }
              this.filteredChallenges = hostChallengeList;
              this.updateChallengesView(true);
            },
            err => {
              SELF.globalService.handleApiError(err);
            },
            () => {
              console.log('Challenges of all Hosts fetched!');
            }
          );
        }
      },
      err => {
        SELF.globalService.handleApiError(err);
      },
      () => {
        console.log('Challenge\'s Host teams fetched!');
      }
    );
  }


  /**
   * Fetch teams function.
   */
  fetchMyTeams() {
    // this.fetchTeams('participants/participant_team');
    this.fetchTeams('hosts/challenge_host_team');
  }

  /**
   * Toggle upcoming/past/ongoing filters.
   * @param filter  selected filter
   */
  toggleFilter(filter) {
    this[filter] = !this[filter];
    if (this[filter]) {
      this.fetchChallenges(filter);
    } else {
      this.upcomingChallenges = filter === 'isUpcomingChecked' ? [] : this.upcomingChallenges;
      this.ongoingChallenges = filter === 'isOngoingChecked' ? [] : this.ongoingChallenges;
      this.pastChallenges = filter === 'isPastChecked' ? [] : this.pastChallenges;
      this.filteredChallenges = this.upcomingChallenges.concat(this.ongoingChallenges, this.pastChallenges);
      this.updateChallengesView(true);
    }
  }

  /**
   * Show more results.
   */
  seeMoreClicked() {
    this.seeMore = this.seeMore + 1;
    this.updateChallengesView(false);
  }

  /**
   * Update challenges view (called after fetching challenges from API).
   * @param reset  reset flag for hiding/showing more results
   */
  updateChallengesView(reset) {
    if (reset) {
      this.seeMore = 1;
    }
    this.filterChallengesByTeams();
    this.filteredChallengesView = this.filteredChallenges.slice(0, (this.seeMore * this.windowSize));
  }

  /**
   * Filtering challenges by teams
   */
  filterChallengesByTeams() {
    if (this.router.url === '/challenges/me' && this.authService.isLoggedIn()) {
      this.filteredChallenges = this.filteredChallenges.filter((v, i, a) => this.allTeams.indexOf(v['creator']['id']) > -1);
    }
  }

  /**
   * Fetch teams function.
   * @param path  teams fetch URL
   */
  fetchTeams(path) {
    const SELF = this;
    SELF.filteredChallenges = [];
    this.apiService.getUrl(path).subscribe(
      data => {
        if (data['results']) {
          const TEAMS = data['results'].map((item) => item['id']);
          SELF.allTeams = SELF.allTeams.concat(TEAMS);
          SELF.allTeams = SELF.allTeams.filter((v, i, a) => a.indexOf(v) === i);
          // SELF.fetchChallenges(); For all hosts' challenges, we are now calling fetchHostChallengesAll().
        }
      },
      err => {
        SELF.globalService.handleApiError(err, false);
      },
      () => {
        console.log('Teams fetched', path);
      }
    );
  }

  /**
   * Fetch Challenges function.
   * @param filter  selected filter
   * @param callback  callback function
   */
  fetchChallenges(filter = null, callback = null) {
    if (!filter) {
      const ALL_PATHS = Object.values(this.apiPathMapping);
      const ALL_KEYS = Object.keys(this.apiPathMapping);
      for (let i = 0; i < ALL_PATHS.length; i++) {
        if (this[ALL_KEYS[i]]) {
          this.fetchChallengesFromApi(ALL_PATHS[i], callback);
        }
      }
    } else {
      this.fetchChallengesFromApi(this.apiPathMapping[filter], callback);
    }
  }

  /**
   * Fetch challenges from backend.
   * @param path  Challenge fetch URL
   * @param callback  Callback Function.
   */
  fetchChallengesFromApi(path, callback = null) {
    const SELF = this;
    SELF.apiService.getUrl(path).subscribe(
      data => {
        if (path.endsWith('future')) {
          SELF.upcomingChallenges = data['results'];
        } else if (path.endsWith('present')) {
          SELF.ongoingChallenges = data['results'];
        } else if (path.endsWith('past')) {
          SELF.pastChallenges = data['results'];
        }
        SELF.filteredChallenges = SELF.upcomingChallenges.concat(SELF.ongoingChallenges, SELF.pastChallenges);
        this.updateChallengesView(true);
      },
      err => {
        SELF.globalService.handleApiError(err);
      },
      () => console.log(path.slice(SELF.apiPathCommon.length) + ' challenges fetched!')
    );
  }

}
