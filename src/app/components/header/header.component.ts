import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public logo = require('./assets/evalai-logo-single.png');
  constructor() { }

  ngOnInit() {
  }

}
