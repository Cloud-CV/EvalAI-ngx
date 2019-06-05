import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../services/auth.service';

/**
 * Component Class
 */
@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {

  /**
   * Constructor.
   */
  constructor(public authService: AuthService) { }

  /**
   * Component on intialized
   */
  ngOnInit() {
  }

}
