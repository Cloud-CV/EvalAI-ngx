import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ChallengeService } from '../services/challenge.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-challengeparticipate',
  templateUrl: './challengeparticipate.component.html',
  styleUrls: ['./challengeparticipate.component.scss']
})
export class ChallengeparticipateComponent implements OnInit {
  isLoggedIn = false;
  challenge: any;
  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute,
              private challengeService: ChallengeService) { }

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.isLoggedIn = true;
    }
    this.challengeService.currentChallenge.subscribe(challenge => this.challenge = challenge);
  }

}
