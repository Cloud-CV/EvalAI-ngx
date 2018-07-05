import { Component, OnInit, Input } from '@angular/core';
import { GlobalService } from '../global.service';
import { ApiService } from '../services/api.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-teamcard',
  templateUrl: './teamcard.component.html',
  styleUrls: ['./teamcard.component.scss']
})
export class TeamcardComponent implements OnInit {
  @Input() team: object;
  teamText = '';
  teamView = {};
  isSelected = false;
  constructor(private globalService: GlobalService,
              private apiService: ApiService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.updateView();
  }
  selectToggle() {
    this.isSelected = !this.isSelected;
  }

  updateView() {
    this.teamView['team_name'] = this.team['team_name'];
    this.teamView['created_by'] = this.team['created_by'];
    this.teamView['team_url'] = this.team['team_url'];

    let temp = this.team['members'];
    let memberString = '';
    for (let i = 0; i < temp.length; i++) {
      memberString = memberString + ', ' + temp[i]['member_name'];
    }
    memberString = memberString.slice(2, memberString.length);
    this.teamView['members'] = memberString;
  }

}
