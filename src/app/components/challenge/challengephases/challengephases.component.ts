import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ChallengeService } from '../../../services/challenge.service';

/**
 * Component Class
 */
@Component({
  selector: 'app-challengephases',
  templateUrl: './challengephases.component.html',
  styleUrls: ['./challengephases.component.scss']
})
export class ChallengephasesComponent implements OnInit {

  /**
   * Challenge object
   */
  challenge: any;

  /**
   * Challenge phases list
   */
  phases: any;

  /**
   * Challenge host status
   */
  isChallengeHost: boolean;

  /**
   * Constructor.
   * @param challengeService  ChallengeService Injection.
   * @param document
   */
  constructor(private challengeService: ChallengeService, @Inject(DOCUMENT) private document: Document) { }

  /**
   * Component on intialized
   */
  ngOnInit() {
    this.challengeService.currentChallenge.subscribe(
    challenge => {
      this.challenge = challenge;
    });
    this.challengeService.currentPhases.subscribe(
    phases => {
      this.phases = phases;
    });
    this.challengeService.isChallengeHost.subscribe(status => {
      this.isChallengeHost = status;
    });
  }
}
