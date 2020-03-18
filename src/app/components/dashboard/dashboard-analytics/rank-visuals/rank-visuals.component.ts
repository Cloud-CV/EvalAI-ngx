import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-rank-visuals',
  templateUrl: './rank-visuals.component.html',
  styleUrls: ['./rank-visuals.component.scss']
})
export class RankVisualsComponent implements OnInit {

  chartConf = {};

  constructor() { }

  ngOnInit() {
    this.chartConf['dataset'] = [ {data:[20, 20, 30, 30, 90], label: 'Participant', fill: 'start'} ];
    this.chartConf['labels'] = ['Sunday', 'Saturday', 'Monday', 'Tuesday', 'Friday'];
    this.chartConf['options'] = {
      'scaleShowVerticalLInes': false,
      'responsive': true,
      scales: {
        'xAxes': [
          {
            'scaleLabel': {
              'display': true,
              'labelString': 'Daily',
            },
            'gridLines': {'display': false, drawTicks: false, drawBorder: false},
            ticks: {padding: 20, fontSize: 10, lineHeight: 1}
          }
        ],
        'yAxes': [
          {
            'scaleLabel': {
              'display': true,
              'labelString': 'Rank',
            },
            'gridLines': {'display': true, drawTicks: false, drawBorder: false},
            ticks: {padding: 20, fontSize: 10, lineHeight: 1, reverse: true}
          }
        ]
      }
    };
    this.chartConf['legend'] = false;
    this.chartConf['colors'] = [
      {
        backgroundColor: '#ffd99a',
        borderColor: '#ffaf4b',
        pointBackgroundColor: '#fff',
        pointBorderColor: '#ffaf4b',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#ffaf4b'
      }
    ];
    this.chartConf['type'] = 'line';
  }

}
