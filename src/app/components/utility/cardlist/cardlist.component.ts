import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-cardlist',
  templateUrl: './cardlist.component.html',
  styleUrls: ['./cardlist.component.scss']
})
export class CardlistComponent implements OnInit {
  @Input() type: string;
  @Input() data: object;
  @Input() dataObservable: any;
  @Input() deleteTeam: any;
  @Input() editTeam: any;
  @Input() addMembersToTeam: any;
  @Input() selectTeam: any;

  dataList: any;
  arrayJavascript: any;

  /**
   * Constructor.
   */
  constructor() { }

  /**
   * Component on intialized.
   */
  ngOnInit() {
    this.arrayJavascript = Array;
    if (this.dataObservable) {
      this.dataObservable.subscribe((data) => {
        this.dataList = data;
      });
    }
  }

}
