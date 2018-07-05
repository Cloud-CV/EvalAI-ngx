import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { ApiService } from '../services/api.service';
import { GlobalService } from '../global.service';
import { AuthService } from '../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-teamlist',
  templateUrl: './teamlist.component.html',
  styleUrls: ['./teamlist.component.scss']
})
export class TeamlistComponent implements OnInit {
  authServicePublic: any;
  routerPublic: any;
  allTeams = [];
  filteredTeams = [];
  seeMore = 1;
  windowSize = 2;
  teamSelectTitle = "";
  teamCreateTitle = "";
  teamCreateButton = "";
  fetchTeamsPath: any;
  createTeamsPath: any;
  teamForm = 'formteam';
  @ViewChildren('formteam')
  components: QueryList<TeamlistComponent>;
  constructor(private apiService: ApiService,
              private authService: AuthService,
              private globalService: GlobalService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    if (this.router.url === '/teams/hosts') {
      this.fetchTeamsPath = 'hosts/challenge_host_team';
      this.createTeamsPath = '';
      this.fetchMyTeams(this.fetchTeamsPath);
      this.teamCreateTitle = "Create a New Team";
      this.teamSelectTitle = "Select a Challenge Host Team";
      this.teamCreateButton = "Create Host Team";
    } else {
      this.fetchTeamsPath = 'participants/participant_team';
      this.createTeamsPath = this.fetchTeamsPath;
      this.fetchMyTeams(this.fetchTeamsPath);
      this.teamCreateTitle = "Create a New Participant Team";
      this.teamSelectTitle = "My Existing Participant Teams";
      this.teamCreateButton = "Create Participant Team";
    }
    this.authServicePublic = this.authService;
    this.routerPublic = this.router;
  }

  seeMoreClicked() {
    this.seeMore = this.seeMore + 1;
    this.updateTeamsView(false);
  }

  updateTeamsView(reset) {
    if (reset) {
      this.seeMore = 1;
    }
    this.filteredTeams = this.allTeams.slice(0, (this.seeMore * this.windowSize));
  }

  fetchMyTeams(path) {
  	if (this.authService.isLoggedIn()) {
      this.fetchTeams(path);
  	}
  }

  fetchTeams(path) {
    const SELF = this;
    this.apiService.getUrl(path).subscribe(
      data => {
        if (data['results']) {
          SELF.allTeams = data['results'];
          SELF.updateTeamsView(true);
        }
      },
      err => {
        SELF.globalService.handleApiError(err, false);
      },
      () => {
        console.log('Teams fetched', path);
      }
    );
  }
  
  createTeam(formname) {
  	this.globalService.formValidate(this.components, this.createTeamSubmit, this);
  }
  createTeamSubmit(self) {
  	const API_PATH = self.createTeamsPath;
  	let url = self.globalService.formValueForLabel(self.components, 'team_url');
    let TEAM_BODY: any = {
      team_name: self.globalService.formValueForLabel(self.components, 'team_name') 
    };
    if (url) {
      TEAM_BODY['team_url'] = url;
  	}
    TEAM_BODY = JSON.stringify(TEAM_BODY);
    self.apiService.postUrl(API_PATH, TEAM_BODY).subscribe(
      data => {
        // Success Message in data.message
        self.globalService.showToast('success', 'Team created successfully!', 5);
        self.fetchMyTeams(self.fetchTeamsPath);
      },
      err => {
        self.globalService.handleFormError(self.components, err);
      },
      () => console.log('CREATE-TEAM-FINISHED')
    );
  }


}
