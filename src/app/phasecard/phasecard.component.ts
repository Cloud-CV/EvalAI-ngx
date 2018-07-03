import { Component, OnInit, Input, Inject } from '@angular/core';
import { GlobalService } from '../global.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-phasecard',
  templateUrl: './phasecard.component.html',
  styleUrls: ['./phasecard.component.scss']
})
export class PhasecardComponent implements OnInit {
  @Input() phase: object;
  startDate: any;
  endDate: any;
  descriptionElement: any;
  constructor(private globalService: GlobalService, @Inject(DOCUMENT) private document: Document) { }

  ngOnInit() {
  	this.descriptionElement = this.document.getElementById('phase-description');
  	this.updateViewElements();
  }

  updateViewElements() {
  	const START_DATE = new Date(Date.parse(this.phase['start_date']));
    const END_DATE = new Date(Date.parse(this.phase['end_date']));
    this.startDate = this.globalService.formatDate12Hour(START_DATE);
    this.endDate = this.globalService.formatDate12Hour(END_DATE);
    // this.descriptionElement.innerHTML = this.phase['description'];
  }

}
