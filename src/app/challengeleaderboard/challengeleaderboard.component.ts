import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-challengeleaderboard',
  templateUrl: './challengeleaderboard.component.html',
  styleUrls: ['./challengeleaderboard.component.scss']
})
export class ChallengeleaderboardComponent implements OnInit {

  constructor() { }
  phasesplit = [{phase:10, split:12}, {phase:'p', split: 'q'}];
  ngOnInit() {
  }

}
