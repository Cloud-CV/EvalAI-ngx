import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { GlobalService } from '../global.service';
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

  seeMore = 1;
  windowSize = 10;

  constructor(private apiService: ApiService,
              private globalService: GlobalService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.fetchChallenges();
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
    this.filteredChallengesView = this.filteredChallenges.slice(0, (this.seeMore * this.windowSize));
  }

  fetchChallenges(filter = null) {
    if (!filter) {
      const ALL_PATHS = Object.values(this.apiPathMapping);
      for (let i = 0; i < ALL_PATHS.length; i++) {
        this.fetchChallengesFromApi(ALL_PATHS[i]);
      }
    } else {
      this.fetchChallengesFromApi(this.apiPathMapping[filter]);
    }
  }

  fetchChallengesFromApi(path) {
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
