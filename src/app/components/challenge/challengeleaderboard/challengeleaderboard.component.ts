import { Component, OnInit, QueryList, ViewChildren, AfterViewInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { ApiService } from '../../../services/api.service';
import { GlobalService } from '../../../services/global.service';
import { ChallengeService } from '../../../services/challenge.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SelectphaseComponent } from '../../utility/selectphase/selectphase.component';

@Component({
  selector: 'app-challengeleaderboard',
  templateUrl: './challengeleaderboard.component.html',
  styleUrls: ['./challengeleaderboard.component.scss']
})
export class ChallengeleaderboardComponent implements OnInit, AfterViewInit {
  @ViewChildren('phasesplitselect')
  components: QueryList<SelectphaseComponent>;

  isLoggedIn = false;
  viewInit = false;
  challenge: any;
  routerPublic: any;
  phases = [];
  phaseSplits = [];
  filteredPhaseSplits = [];
  leaderboard = [];
  selectedPhaseSplitId: any = null;
  selectedPhaseSplit: any = null;
  sortColumn = 'rank';
  reverseSort = false;
  columnIndexSort = 0;
  initial_ranking = {};
  entryHighlighted: any = null;
  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute,
              private challengeService: ChallengeService, private globalService: GlobalService, private apiService: ApiService) { }

  ngAfterViewInit() {
    this.viewInit = true;
  }

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

  sortFunction(key) {
    console.log(this.sortColumn, this.columnIndexSort, this.reverseSort);
    if (this.sortColumn === 'date') {
      return Date.parse(key.submission__submitted_at);
    } else if (this.sortColumn === 'rank') {
      return this.initial_ranking[key.submission__participant_team__team_name];
    } else if (this.sortColumn === 'number') {
      return parseFloat(key.result[this.columnIndexSort]);
    } else if (this.sortColumn === 'string') {
      return key.submission__participant_team__team_name;
    }
    return 0;
  }

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
      setTimeout(() => {
        this.checkUrlParams();
      }, 100);
    }
  }

  checkUrlParams() {
    this.route.params.subscribe(params => {
      console.log(params);
      if (params['split']) {
        this.selectedPhaseSplitId = params['split'];
        this.selectPhaseSplitId(this.selectedPhaseSplitId, this);
      } else {
        if (this.filteredPhaseSplits.length > 0) {
          this.router.navigate([this.filteredPhaseSplits[0]['phase_split']['id']], {relativeTo: this.route});
        }
      }
    });
  }

  selectPhaseSplitId(id, self) {
    let i = 0;
    for (i = 0; i < self.filteredPhaseSplits.length; i++) {
      if (parseInt(id, 10) === self.filteredPhaseSplits[i]['phase_split']['id']) {
        self.selectedPhaseSplit = self.filteredPhaseSplits[i];
        const checkViewInit = () => {
          if (self.viewInit) {
            self.components.map((item) => {
              item.selectPhase(self.selectedPhaseSplit);
            });
          } else {
            setTimeout(() => {
              checkViewInit();
            }, 200);
          }
        };
        checkViewInit();
        break;
      }
    }
    if (i === self.filteredPhaseSplits.length) {
      self.selectedPhaseSplit = null;
    }
  }

  phaseSplitSelected() {
    const SELF = this;
    return (phaseSplit) => {
      if (SELF.router.url.endsWith('leaderboard')) {
        SELF.router.navigate(['../' + phaseSplit['phase_split']['id']], {relativeTo: this.route});
      } else if (SELF.router.url.indexOf(phaseSplit['phase_split']['id']) < 0 && SELF.router.url.split('/').length === 5) {
        SELF.router.navigate(['../' + phaseSplit['phase_split']['id']], {relativeTo: this.route});
      } else if (SELF.router.url.indexOf(phaseSplit['phase_split']['id']) < 0 && SELF.router.url.split('/').length === 6) {
        SELF.router.navigate(['../../' + phaseSplit['phase_split']['id']], {relativeTo: this.route});
      } else {
        SELF.selectedPhaseSplit = phaseSplit;
        if (SELF.selectedPhaseSplit['phase_split']) {
          SELF.fetchLeaderboard(SELF.selectedPhaseSplit['phase_split']['id']);
        }
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
      leaderboard[i]['submission__submitted_at_formatted'] = DURATION + ' ago';
    }
    self.leaderboard = leaderboard.slice();
    self.sortLeaderboard();
    console.log(self.leaderboard);

    self.route.params.subscribe(params => {
      if (params['entry']) {
        self.entryHighlighted = params['entry'];
        self.leaderboard.map((item) => {
          item['is_highlighted'] = false;
          if (self.entryHighlighted && item['submission__participant_team__team_name'] === self.entryHighlighted) {
            item['is_highlighted'] = true;
          }
        });
      } else {
        self.challengeService.currentParticipantTeams.subscribe((teams) => {
          teams.map((item) => {
            if (self.challenge && item['challenge'] && item['challenge']['id'] === self.challenge['id']) {
              self.router.navigate([item['participant_team']['team_name']], {relativeTo: this.route});
            }
          });
        });
      }
    });
  }

  sortLeaderboard() {
    this.leaderboard = this.leaderboard.sort((obj1, obj2) => {
      const RET1 = this.sortFunction(obj1);
      const RET2 = this.sortFunction(obj2);
      if (RET1 > RET2) {
        return 1;
      }
      if (RET2 > RET1) {
        return -1;
      }
      return 0;
    });
    if (this.reverseSort) {
      this.leaderboard = this.leaderboard.reverse();
    }
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
