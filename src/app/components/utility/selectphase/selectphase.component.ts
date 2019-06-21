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
   * Currently selected phase
   */
  selectedPhase: any = null;
  /**
   * Selected phase split callback
   */
  @Input() phaseSplitSelected: any;

    /**
   * Phase selection type (radio button or select box)
   */
  @Input() phaseSelectionType: string;

  /**
   * Phase selection list type (phase or phase split)
   */
  @Input () phaseSelectionListType: string;

  /**
   * Selected phase name
   */
  phaseName = '';

  /**
   * Selected split name
   */
  splitName = '';

  /**
   * Selected phase split
   */
  selectedPhaseSplit = '';

  /**
   * Selected phase visibility
   */
  phaseVisibility = false;

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

  /**
   * Select a particular phase split.
   * @param phase  phase split to be selected.
   */
  selectPhaseSplit(phaseSplit, phaseSelectionType, phaseSelectionListType) {
    this.phaseSelectionType = phaseSelectionType;
    this.phaseSelectionListType = phaseSelectionListType;
    this.selectedPhaseSplit = phaseSplit;
    this.phaseName = phaseSplit.challenge_phase_name;
    this.splitName = phaseSplit.dataset_split_name;
    this.phaseVisibility = phaseSplit.showPrivate;
    this.phaseSplitSelected(phaseSplit);
  }

  /**
   * Get 12Hour formatted date function.
   */
  getFormattedDate(date) {
    return this.globalService.formatDate12Hour(new Date(Date.parse(date)));
  }

}
