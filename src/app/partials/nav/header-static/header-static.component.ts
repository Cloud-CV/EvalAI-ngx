import { Component, OnInit } from '@angular/core';
import {Globals} from '../../../globals';

@Component({
  selector: 'app-header-static',
  templateUrl: './header-static.component.html',
  styleUrls: ['./header-static.component.scss']
})
export class HeaderStaticComponent implements OnInit {

  constructor(private globals: Globals) { }
  
  ngOnInit() {
  }

}
