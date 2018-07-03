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
  isStarred = false;
  isParticipated = false;
  challenge: any;
  stars: any;

  constructor(private router: Router, private route: ActivatedRoute,
              private apiService: ApiService, private globalService: GlobalService, 
              private challengeService: ChallengeService) { }

  ngOnInit() {
  	this.localRouter = this.router;
  	this.route.params.subscribe(params => {
      if (params['id']) {
        // this.fetchChallenge(params['id']);
        this.challengeService.fetchChallenge(params['id']);
      }
    });
    this.challengeService.currentChallenge.subscribe(challenge => this.challenge = challenge);
    this.challengeService.currentStars.subscribe(stars => this.stars = stars);
  }
  fetchChallenge(id) {
    const API_PATH = 'challenges/challenge/' + id + '/';
    const SELF = this;
    this.apiService.getUrl(API_PATH).subscribe(
      data => {
      	console.log(data);
        if (data['id'] === parseInt(id, 10)) {
        	SELF.challenge = data;
        	SELF.fetchStars(id);
        	SELF.fetchParticipantTeams(id);
        }
      },
      err => {
        SELF.globalService.handleApiError(err);
      },
      () => {
        console.log('Challenge', id, 'fetched!');
    });
  }

  fetchParticipantTeams(id) {
  	const API_PATH = 'participants/participant_teams/challenges/' + id + '/user';
  	const SELF = this;
    this.apiService.getUrl(API_PATH).subscribe(
      data => {
      	let teams = [];
      	if (data['challenge_participant_team_list']) {
      		teams = data['challenge_participant_team_list'];
      	}
        for (let i = 0; i < teams['length']; i++) {
          if (teams[i]['challenge'] !== null && teams[i]['challenge']['id'] == id) {
            SELF.isParticipated = true;
            break;
          }
        }
      },
      err => {
        SELF.globalService.handleApiError(err);
      },
      () => {
        console.log('Challenge', id, 'fetched!');
    });
  }

  fetchStars(id) {
    const API_PATH = 'challenges/' + id + '/';
    const SELF = this;
    this.apiService.getUrl(API_PATH).subscribe(
      data => {
        SELF.stars = parseInt(data['count'], 10) || 0;
        SELF.isStarred = data['is_starred'];
      },
      err => {
        SELF.globalService.handleApiError(err, false);
      },
      () => {}
    );
  }

}
