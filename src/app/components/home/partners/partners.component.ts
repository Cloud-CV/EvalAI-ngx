import { Component, OnInit } from '@angular/core';

/**
 * Component Class
 */
@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.scss']
})
export class PartnersComponent implements OnInit {

  /**
   * Component constructor
   */
  images: Array<any> = [];

  constructor() {
    this.images = [
      { name: 'assets/images/partners/cmu.png' },
      { name: 'assets/images/partners/facebook.png' },
      { name: 'assets/images/partners/georgiatech.png' },
      { name: 'assets/images/partners/google.png' },
      { name: 'assets/images/partners/mapillary.png' },
      { name: 'assets/images/partners/stanford.png' },
      { name: 'assets/images/partners/virginiatech.png' },
      { name: 'assets/images/partners/cmu.png' },
      { name: 'assets/images/partners/facebook.png' },
      { name: 'assets/images/partners/georgiatech.png' },
      { name: 'assets/images/partners/google.png' },
      { name: 'assets/images/partners/mapillary.png' },
    ];
  }

  /**
   * Component on initialized
   */
  ngOnInit() {
  }

}
