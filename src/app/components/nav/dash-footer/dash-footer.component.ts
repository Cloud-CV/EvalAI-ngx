import {Component, Inject, OnInit} from '@angular/core';
import {DOCUMENT} from '@angular/common';

@Component({
  selector: 'app-dash-footer',
  templateUrl: './dash-footer.component.html',
  styleUrls: ['./dash-footer.component.scss']
})
export class DashFooterComponent implements OnInit {

  year: any;

  constructor(@Inject(DOCUMENT) private document: Document) { }

  ngOnInit() {
    this.year = new Date().getFullYear();
    const js = this.document.createElement('script');
    // js.src = (/^http:/.test(this.document.location) ? 'http' : 'https') + '://buttons.github.io/buttons.js';
    console.log('logi: ' + this.document.location);
    js.src = 'https://buttons.github.io/buttons.js';
    this.document.getElementsByTagName('head')[0].appendChild(js);
  }

}
