import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ChallengeService } from '../services/challenge.service';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-selectphase',
  templateUrl: './selectphase.component.html',
  styleUrls: ['./selectphase.component.scss']
})
export class SelectphaseComponent implements OnInit, OnChanges {
  @Input() phases: any;
  @Input() phaseSelected: any;
  selectedPhase: any = null;
  publicRouter: any;
  constructor(private challengeService: ChallengeService,
              private router: Router,
              private route: ActivatedRoute,
              private globalService: GlobalService) { }

  ngOnInit() {
    this.publicRouter = this.router;
    if (!this.phases) {
      this.phases = [];
    }
    if (!this.phaseSelected) {
      this.phaseSelected = () => {};
    }
    if (this.phases.length > 0) {
      this.selectPhase(this.phases[0]);
    }
  }
  ngOnChanges(change) {

  }

  selectPhase(phase) {
    this.selectedPhase = phase;
    for (let i = 0; i < this.phases.length; i++) {
      if (phase['phase_split'] && this.phases[i]['phase_split']) {
        if (phase['id'] === this.phases[i]['id'] && phase['phase_split']['id'] === this.phases[i]['phase_split']['id']) {
          this.phases[i]['is_selected'] = true;
        } else {
          this.phases[i]['is_selected'] = false;
        }

      } else {
        if (phase['id'] === this.phases[i]['id']) {
          this.phases[i]['is_selected'] = true;
        } else {
          this.phases[i]['is_selected'] = false;
        }
      }
    }
    this.phaseSelected(phase);
  }

  getFormattedDate(date) {
    return this.globalService.formatDate12Hour(new Date(Date.parse(date)));
  }

}
