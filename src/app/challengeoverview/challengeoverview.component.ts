import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ChallengeService } from '../services/challenge.service';

@Component({
  selector: 'app-challengeoverview',
  templateUrl: './challengeoverview.component.html',
  styleUrls: ['./challengeoverview.component.scss']
})
export class ChallengeoverviewComponent implements OnInit {
  challenge: any;
  overviewElement: any;
  constructor(private challengeService: ChallengeService, @Inject(DOCUMENT) private document: Document) { }
  ngOnInit() {
  	this.overviewElement = this.document.getElementById('challenge-overview');
  	this.challengeService.currentChallenge.subscribe(
    challenge => {
      this.challenge = challenge;
      this.updateView();
  	});
  }
  updateView() {
    this.overviewElement.innerHTML = this.challenge['description'];
  }

}
