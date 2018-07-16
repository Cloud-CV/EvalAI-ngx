import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ChallengeService } from '../../../services/challenge.service';

@Component({
  selector: 'app-challengeevaluation',
  templateUrl: './challengeevaluation.component.html',
  styleUrls: ['./challengeevaluation.component.scss']
})
export class ChallengeevaluationComponent implements OnInit {
  challenge: any;
  evaluationElement: any;
  tncElement: any;
  constructor(private challengeService: ChallengeService, @Inject(DOCUMENT) private document: Document) { }
  ngOnInit() {
    this.evaluationElement = this.document.getElementById('challenge-evaluation');
    this.tncElement = this.document.getElementById('challenge-tnc');
    this.challengeService.currentChallenge.subscribe(
    challenge => {
      this.challenge = challenge;
      this.updateView();
    });
  }
  updateView() {
    this.evaluationElement.innerHTML = this.challenge['evaluation_details'];
    this.tncElement.innerHTML = this.challenge['terms_and_conditions'];
  }

}
