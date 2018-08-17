import { Component, OnInit, OnChanges, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { GlobalService } from '../../../../services/global.service';
import { ApiService } from '../../../../services/api.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-teamcard',
  templateUrl: './teamcard.component.html',
  styleUrls: ['./teamcard.component.scss']
})
export class TeamcardComponent implements OnInit, OnChanges {
  @Input() team: object;
  @Input() selected: any;
  @Input() update: any;
  @Output() deleteTeamCard = new EventEmitter<any>();
  @Output() selectTeamCard = new EventEmitter<any>();
  @Output() editTeamCard = new EventEmitter<any>();
  @Output() addMembersTeamCard = new EventEmitter<any>();

  teamText = '';
  teamView = {};
  isSelected = false;
  isHost = false;

  /**
   * Constructor.
   * @param route  ActivatedRoute Injection.
   * @param router  Router Injection.
   * @param globalService  GlobalService Injection.
   * @param apiService  ApiService Injection.
   */
  constructor(private globalService: GlobalService,
              private apiService: ApiService,
              private router: Router,
              private route: ActivatedRoute) { }

  /**
   * Component on initialized.
   */
  ngOnInit() {
    this.updateView();
  }

  /**
   * Component on change detected.
   * @param changes  changes detected in the inputs.
   */
  ngOnChanges(changes: SimpleChanges) {
    this.updateView();
  }

  /**
   * Select a team toggle.
   */
  selectToggle() {
    if ((this.isHost && !this.isSelected) || !this.isHost) {
      this.isSelected = !this.isSelected;
      this.team['isSelected'] = this.isSelected;
      if (this.isSelected) {
      this.selectTeam();
      }
    }
  }

  /**
   * Fires team edit event.
   */
  editTeam(e) {
    e.stopPropagation();
    this.editTeamCard.emit(this.team['id']);
  }

  /**
   * Fires add members to team event.
   */
  addMembersToTeam(e) {
    e.stopPropagation();
    this.addMembersTeamCard.emit(this.team['id']);
  }

  /**
   * Fires delete team event.
   */
  deleteTeam(e) {
    e.stopPropagation();
    this.deleteTeamCard.emit(this.team['id']);
  }

  /**
   * Fires slect team event.
   */
  selectTeam() {
    this.selectTeamCard.emit(this.team);
  }

  /**
   * UI view update, called after onInit.
   */
  updateView() {
    this.teamView['team_name'] = this.team['team_name'];
    this.teamView['created_by'] = this.team['created_by'];
    this.teamView['team_url'] = this.team['team_url'];
    if (this.team['isHost']) {
      this.isHost = true;
    }
    if (this.team['isSelected']) {
      this.isSelected = true;
    } else {
      this.isSelected = false;
    }
    if (this.selected) {
      this.isSelected = true;
    } else {
      this.isSelected = false;
    }
    const temp = this.team['members'];
    let memberString = '';
    for (let i = 0; i < temp.length; i++) {
      memberString = memberString + ', ' + temp[i]['member_name'];
    }
    if (memberString !== '') {
      memberString = memberString.slice(2, memberString.length);
    }
    this.teamView['members'] = memberString;
  }

}
