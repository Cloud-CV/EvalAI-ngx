import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-teamcard',
  templateUrl: './teamcard.component.html',
  styleUrls: ['./teamcard.component.scss']
})
export class TeamcardComponent implements OnInit {
  @Input() team: object;
  constructor() { }

  ngOnInit() {
  }

}
