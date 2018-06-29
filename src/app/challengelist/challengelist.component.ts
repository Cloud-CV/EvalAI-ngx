import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { GlobalService } from '../global.service';

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
  pathCommon = 'challenges/challenge/';
  pathMapping = {
    isUpcomingChecked: this.pathCommon + 'future',
    isOngoingChecked: this.pathCommon + 'present',
    isPastChecked: this.pathCommon + 'past'
  };

  constructor(private apiService: ApiService,
  	          private globalService: GlobalService) { }

  ngOnInit() {
  	this.fetchChallenges();
  }

  toggleFilter(filter) {
  	this[filter] = !this[filter];
  	if (this[filter]) {
      this.fetchChallenges(filter);
  	}
  }

  fetchChallenges(filter = null) {
  	if (!filter) {
  	  const ALL_PATHS = Object.values(this.pathMapping);
  	  for (let i = 0; i< ALL_PATHS.length; i++) {
  	  	this.fetchChallengesFromApi(ALL_PATHS[i]);
  	  }
  	} else {
  		this.fetchChallengesFromApi(this.pathMapping[filter]);
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
      },
      err => {
        SELF.globalService.handleApiError(err);
      },
      () => console.log(path.slice(SELF.pathCommon.length) + ' challenges fetched!')
    );
  }

}
