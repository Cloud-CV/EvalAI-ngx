import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { GlobalService } from '../global.service';

import { ChallengeService } from '../services/challenge.service';

@Component({
  selector: 'app-challenge',
  templateUrl: './challenge.component.html',
  styleUrls: ['./challenge.component.scss']
})
export class ChallengeComponent implements OnInit {
  localRouter: any;
  // challenge: object = { 'creator': {}};
  // stars = 0;
  id: any;
  isStarred = false;
  isParticipated = false;
  challenge: any;
  stars: any;

  constructor(private router: Router, private route: ActivatedRoute,
              private apiService: ApiService, private globalService: GlobalService,
              private challengeService: ChallengeService) { }

  ngOnInit() {
    const SELF = this;
    this.localRouter = this.router;
    this.route.params.subscribe(params => {
      if (params['id']) {
        // this.fetchChallenge(params['id']);
        this.id = params['id'];
        this.challengeService.fetchChallenge(params['id']);
      }
    });
    this.challengeService.currentChallenge.subscribe(challenge => this.challenge = challenge);
    this.challengeService.currentStars.subscribe(stars => this.stars = stars);
    this.challengeService.currentParticipationStatus.subscribe(status => {
      this.isParticipated = status;
    });
  }

}
