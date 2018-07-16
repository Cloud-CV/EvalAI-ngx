import { Component, OnInit, Input } from '@angular/core';
import { GlobalService } from '../global.service';
import { ApiService } from '../services/api.service';
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
  tags = ['Aritificial Intelligence', 'Machine Learning'];
  stars = 0;
  constructor(private globalService: GlobalService,
              private apiService: ApiService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.preProcess();
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
    const API_PATH = 'challenges/' + this.challenge['id'] + '/';
    const SELF = this;
    this.apiService.getUrl(API_PATH).subscribe(
      data => {
        SELF.stars = parseInt(data['count'], 10) || 0;
      },
      err => {
        SELF.globalService.handleApiError(err, false);
      },
      () => {}
    );
  }

  challengeClicked() {
    this.router.navigate(['/challenge', this.challenge['id']]);
  }
  participateInChallenge() {
    this.router.navigate(['/challenge', this.challenge['id'], 'participate']);
  }
}
