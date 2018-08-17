import { Component, OnInit, Input, Inject } from '@angular/core';
import { GlobalService } from '../../../../services/global.service';

@Component({
  selector: 'app-phasecard',
  templateUrl: './phasecard.component.html',
  styleUrls: ['./phasecard.component.scss']
})
export class PhasecardComponent implements OnInit {
  @Input() phase: object;
  startDate: any;
  endDate: any;

  /**
   * Constructor.
   * @param globalService  GlobalService Injection.
   */
  constructor(private globalService: GlobalService) { }

  /**
   * Component on initialized.
   */
  ngOnInit() {
    this.updateViewElements();
  }

  /**
   * View elements update (Called after onInit)
   */
  updateViewElements() {
    const START_DATE = new Date(Date.parse(this.phase['start_date']));
    const END_DATE = new Date(Date.parse(this.phase['end_date']));
    this.startDate = this.globalService.formatDate12Hour(START_DATE);
    this.endDate = this.globalService.formatDate12Hour(END_DATE);
  }

}
