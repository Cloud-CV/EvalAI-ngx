import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { ApiService } from '../../../services/api.service';
import { GlobalService } from '../../../services/global.service';
import { ChallengeService } from '../../../services/challenge.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-challengeleaderboard',
  templateUrl: './challengeleaderboard.component.html',
  styleUrls: ['./challengeleaderboard.component.scss']
})
export class ChallengeleaderboardComponent implements OnInit {

  isLoggedIn = false;
  challenge: any;
  routerPublic: any;
  phases = [];
  phaseSplits = [];
  filteredPhaseSplits = [];
  leaderboard = [];
  selectedPhaseSplit: any = null;
  sortColumn = 'rank';
  reverseSort = false;
  columnIndexSort = 0;
  initialRanking = {};
  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute,
              private challengeService: ChallengeService, private globalService: GlobalService, private apiService: ApiService) { }

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.isLoggedIn = true;
    }
    this.routerPublic = this.router;
    this.challengeService.currentChallenge.subscribe(challenge => {
      this.challenge = challenge;
    });
    this.challengeService.currentPhases.subscribe(
      phases => {
        this.phases = phases;
        this.filterPhases();
    });
    this.challengeService.currentPhaseSplit.subscribe(
      phaseSplits => {
        this.phaseSplits = phaseSplits;
        this.filterPhases();
    });
  }

  sortFunction = function(key) {
    // check which column is selected
    // so that the values can be parsed properly
    if (this.sortColumn === 'date') {
      return Date.parse(key.submission__submitted_at);
    } else if (this.sortColumn === 'rank') {
      return this.initial_ranking[key.submission__participant_team__team_name];
    } else if (this.sortColumn === 'number') {
      return parseFloat(key.result[this.columnIndexSort]);
    } else if (this.sortColumn === 'string') {
      // sort teams alphabetically
      return key.submission__participant_team__team_name.value;
    }
    return 0;
  };

  filterPhases() {
    if (this.phases.length > 0 && this.phaseSplits.length > 0) {
      const TEMPSPLITS = [];
      for (let i = 0; i < this.phases.length; i++) {
        if (this.phases[i]['leaderboard_public']) {
          const TEMP = this.phases[i];
          TEMP['phase_split'] = null;
          for (let j = 0; j < this.phaseSplits.length; j++) {
            if (this.phaseSplits[j]['challenge_phase'] === TEMP['id'] && this.phaseSplits[j]['visibility'] === 3) {
              const TEMP_COPY = Object.assign({}, TEMP);
              TEMP_COPY['phase_split'] = this.phaseSplits[j];
              TEMPSPLITS.push(TEMP_COPY);
            }
          }
        }
      }
      this.filteredPhaseSplits = TEMPSPLITS;
    }
  }

  phaseSplitSelected() {
    const SELF = this;
    return (phaseSplit) => {
      SELF.selectedPhaseSplit = phaseSplit;
      if (SELF.selectedPhaseSplit['phase_split']) {
        SELF.fetchLeaderboard(SELF.selectedPhaseSplit['phase_split']['id']);
      }
    };
  }
  updateLeaderboardResults(leaderboardApi, self) {
    const leaderboard = leaderboardApi.slice();
    for (let i = 0; i < leaderboard.length; i++) {
      self.initial_ranking[leaderboard[i].submission__participant_team__team_name] = i + 1;
      const DATE_NOW = new Date();
      const SUBMISSION_TIME = new Date(Date.parse(leaderboard[i].submission__submitted_at));
      const DURATION = self.globalService.getDateDifferenceString(DATE_NOW, SUBMISSION_TIME);
      leaderboard[i]['submission__submitted_at'] = DURATION + ' ago';
    }
    self.leaderboard = leaderboard.slice();
  }

  fetchLeaderboard(phaseSplitId) {
    const API_PATH = 'jobs/challenge_phase_split/' + phaseSplitId + '/leaderboard/?page_size=1000';
    const SELF = this;
    this.apiService.getUrl(API_PATH).subscribe(
      data => {
        SELF.updateLeaderboardResults(data['results'], SELF);
      },
      err => {
        SELF.globalService.handleApiError(err);
      },
      () => {
        console.log('Fetched leaderboard for split:', phaseSplitId);
      }
    );
  }

}
