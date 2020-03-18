import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-submission-visuals',
  templateUrl: './submission-visuals.component.html',
  styleUrls: ['./submission-visuals.component.scss']
})
export class SubmissionVisualsComponent implements OnInit {

  chartConf = {};

  constructor() { }

  ngOnInit() {
    this.chartConf['dataset'] = [20, 20, 30, 30, 90];
    this.chartConf['labels'] = ['Successful', 'Cancelled', 'Submitted', 'Running', 'Failed'];
    this.chartConf['options'] = {
      'responsive': true,
      'legend': {
        display: true,
        labels: {
          boxWidth: 20
        }
      }
    };
    this.chartConf['type'] = 'doughnut';
  }
}
