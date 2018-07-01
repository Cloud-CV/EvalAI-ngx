import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { GlobalService } from '../global.service';
import { AuthService } from '../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-challengelist',
  templateUrl: './challengelist.component.html',
  styleUrls: ['./challengelist.component.scss']
})
export class ChallengelistComponent implements OnInit {
  isUpcomingChecked = true;
  isOngoingChecked = true;
  isPastChecked = false;
  upcomingChallenges = [];
  ongoingChallenges = [];
  pastChallenges = [];
  apiPathCommon = 'challenges/challenge/';
  apiPathMapping = {
    isUpcomingChecked: this.apiPathCommon + 'future',
    isOngoingChecked: this.apiPathCommon + 'present',
    isPastChecked: this.apiPathCommon + 'past'
  };
  filteredChallenges = [];
  filteredChallengesView = [];
  allTeams = [];
  seeMore = 1;
  windowSize = 10;

  constructor(private apiService: ApiService,
              private authService: AuthService,
              private globalService: GlobalService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    if (this.router.url === '/challenges/all') {
      this.fetchChallenges();
    } else if (this.router.url === '/challenges/me' && this.authService.isLoggedIn()) {
      this.fetchMyTeams();
      this.fetchChallenges();
    }
  }
  fetchMyTeams() {
    // this.fetchTeams('participants/participant_team');
    this.fetchTeams('hosts/challenge_host_team');
  }

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

  seeMoreClicked() {
    this.seeMore = this.seeMore + 1;
    this.updateChallengesView(false);
  }

  updateChallengesView(reset) {
    if (reset) {
      this.seeMore = 1;
    }
    this.filterChallengesByTeams();
    this.filteredChallengesView = this.filteredChallenges.slice(0, (this.seeMore * this.windowSize));
  }

  filterChallengesByTeams() {
    if (this.router.url === '/challenges/me' && this.authService.isLoggedIn()) {
      this.filteredChallenges = this.filteredChallenges.filter((v, i, a) => this.allTeams.indexOf(v['creator']['id']) > -1);
    }
  }


  fetchTeams(path) {
    const SELF = this;
    this.apiService.getUrl(path).subscribe(
      data => {
        if (data['results']) {
          const TEAMS = data['results'].map((item) => item['id']);
          SELF.allTeams = SELF.allTeams.concat(TEAMS);
          SELF.allTeams = SELF.allTeams.filter((v, i, a) => a.indexOf(v) === i);
          SELF.updateChallengesView(true);
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
