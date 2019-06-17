import { Component, OnInit, Input, Output, OnChanges } from '@angular/core';
import { ChallengeService } from '../../../services/challenge.service';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalService } from '../../../services/global.service';

/**
 * Component Class
 */
@Component({
  selector: 'app-selectphase',
  templateUrl: './selectphase.component.html',
  styleUrls: ['./selectphase.component.scss']
})
export class SelectphaseComponent implements OnInit, OnChanges {

  /**
   * Phase list
   */
  @Input() phases: any;

  /**
   * Selected phase callback
   */
  @Input() phaseSelected: any;


  /**
   * Selected phase name
   */
  phaseName = '';

  /**
   * Selected phase visibility
   */
  phaseVisibility = false;

  /**
   * Phase selection type (radio button or select box)
   */
  @Input() phaseSelectionType: string;

  /**
   * Currently selected phase
   */
  selectedPhase: any = null;

  /**
   * Router public instance
   */
  publicRouter: any;

  /**
   * Constructor.
   * @param route  ActivatedRoute Injection.
   * @param router  GlobalService Injection.
   * @param globalService  GlobalService Injection.
   * @param challengeService  ChallengeService Injection.
   */
  constructor(private challengeService: ChallengeService,
              private router: Router,
              private route: ActivatedRoute,
              private globalService: GlobalService) { }

  /**
   * Component on intialized.
   */
  ngOnInit() {
    this.publicRouter = this.router;
    if (!this.phases) {
      this.phases = [];
    }
    if (!this.phaseSelected) {
      this.phaseSelected = () => {};
    }
    if (!this.selectedPhase && this.phases.length > 0 && this.publicRouter.url.endsWith('submit')) {
      this.selectPhase(this.phases[0]);
    }
  }

  /**
   * Component on changes detected in Input.
   * @param change  changes detected
   */
  ngOnChanges(change) {
  }

  /**
   * Select a particular phase.
   * @param phase  phase to be selected.
   */
  selectPhase(phase) {
    this.phaseName = phase.name;
    this.phaseVisibility = phase.showPrivate;
    this.phaseSelected(phase);
  }

  /**
   * Get 12Hour formatted date function.
   */
  getFormattedDate(date) {
    return this.globalService.formatDate12Hour(new Date(Date.parse(date)));
  }

}
