import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { GlobalService } from '../global.service';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class ChallengeService {
  private defaultChallenge: any = { 'creator': {}};
  private defaultStars: any = { 'count': 0, 'is_starred': false};
  private challengeSource = new BehaviorSubject(this.defaultChallenge);
  currentChallenge = this.challengeSource.asObservable();
  private starSource = new BehaviorSubject(this.defaultStars);
  currentStars = this.starSource.asObservable();
  
  constructor(private apiService: ApiService, private globalService: GlobalService) { }

  changeCurrentChallenge(challenge: object) {
    this.challengeSource.next(challenge);
  }
  changeCurrentStars(stars: object) {
    this.starSource.next(stars);
  }

  fetchChallenge(id) {
    const API_PATH = 'challenges/challenge/' + id + '/';
    const SELF = this;
    this.apiService.getUrl(API_PATH).subscribe(
      data => {
      	console.log(data);
        if (data['id'] === parseInt(id, 10)) {
        	SELF.changeCurrentChallenge(data);
        	SELF.fetchStars(id);
        }
      },
      err => {
        SELF.globalService.handleApiError(err);
      },
      () => {
        console.log('Challenge', id, 'fetched!');
    });
  }

  fetchStars(id, callback = null) {
    const API_PATH = 'challenges/' + id + '/';
    const SELF = this;
    this.apiService.getUrl(API_PATH).subscribe(
      data => {
      	if (callback) {
          callback(data);
      	} else {
          SELF.changeCurrentStars(data);
      	}
      },
      err => {
        SELF.globalService.handleApiError(err, false);
      },
      () => {}
    );
  }


}
