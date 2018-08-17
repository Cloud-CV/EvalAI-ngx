import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ChallengeService } from '../../../services/challenge.service';

@Component({
  selector: 'app-challengeoverview',
  templateUrl: './challengeoverview.component.html',
  styleUrls: ['./challengeoverview.component.scss']
})
export class ChallengeoverviewComponent implements OnInit {
  challenge: any = null;
  overviewElement: any;

  /**
   * Constructor.
   * @param document  Window document Injection.
   * @param challengeService  ChallengeService Injection.
   */
  constructor(private challengeService: ChallengeService, @Inject(DOCUMENT) private document: Document) { }

  /**
   * Component on initialized.
   */
  ngOnInit() {
    this.challengeService.currentChallenge.subscribe(
    challenge => {
      this.challenge = challenge;
    });
  }
}
