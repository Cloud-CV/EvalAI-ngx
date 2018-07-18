import { Component, OnInit, Input } from '@angular/core';
import { GlobalService } from '../../../../services/global.service';
import { ApiService } from '../../../../services/api.service';
import { AuthService } from '../../../../services/auth.service';
import { ChallengeService } from '../../../../services/challenge.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-challengecard',
  templateUrl: './challengecard.component.html',
  styleUrls: ['./challengecard.component.scss']
})
export class ChallengecardComponent implements OnInit {
  @Input() challenge: object;
  startDate: any = '';
  endDate: any = '';
  isUpcoming = false;
  isOngoing = false;
  isPast = false;
  timeRemaining = '';
  isLoggedIn = false;
  tags = ['Aritificial Intelligence', 'Machine Learning'];
  stars = { 'count': 0, 'is_starred': false};
  constructor(private globalService: GlobalService,
              private apiService: ApiService,
              private authService: AuthService,
              private challengeService: ChallengeService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.preProcess();
    if (this.authService.isLoggedIn()) {
      this.isLoggedIn = true;
    }
  }

  preProcess() {
    const TEMP = {};
    const PRESENT = new Date();
    const START_DATE = new Date(Date.parse(this.challenge['start_date']));
    const END_DATE = new Date(Date.parse(this.challenge['end_date']));
    this.checkType(START_DATE, END_DATE, PRESENT);
    this.startDate = this.globalService.formatDate12Hour(START_DATE);
    this.endDate = this.globalService.formatDate12Hour(END_DATE);
    this.fetchStars();

  }

  checkType(start, end, now) {
    if (now > end) {
        this.isPast = true;
        this.timeRemaining = 'This challenge has ended.';
    } else if (now > start && now < end) {
      this.isOngoing = true;
      this.timeRemaining = this.globalService.getDateDifferenceString(now, end) + ' for the challenge to end.';
    } else if (now < start) {
      this.isUpcoming = true;
      this.timeRemaining = this.globalService.getDateDifferenceString(now, start) + ' for the challenge to begin.';
    }
  }

  fetchStars() {
    this.challengeService.fetchStars(this.challenge['id'], (data) => {
      this.stars = data;
    });
  }

  starToggle() {
    if (this.isLoggedIn) {
      this.challengeService.starToggle(this.challenge['id'], (data, self) => {
        self.stars = data;
      }, this);
    }
  }

  challengeClicked() {
    this.router.navigate(['/challenge', this.challenge['id']]);
  }
  participateInChallenge() {
    this.router.navigate(['/challenge', this.challenge['id'], 'participate']);
  }
}
