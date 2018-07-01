import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-cardlist',
  templateUrl: './cardlist.component.html',
  styleUrls: ['./cardlist.component.scss']
})
export class CardlistComponent implements OnInit {
  @Input() type: string;
  @Input() data: object;

  constructor() { }

  ngOnInit() {
  }
}
