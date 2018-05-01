import { Component, OnInit } from '@angular/core';
import {GlobalService} from '../../../global.service';

@Component({
  selector: 'app-header-static',
  templateUrl: './header-static.component.html',
  styleUrls: ['./header-static.component.scss']
})
export class HeaderStaticComponent implements OnInit {
  scrolledState = false;
  constructor(private globalService: GlobalService) { }

  ngOnInit() {
    this.globalService.change.subscribe(scrolledState => {
      this.scrolledState = scrolledState;
    });
  }

}
