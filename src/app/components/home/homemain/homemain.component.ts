import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ApiService } from '../../../services/api.service';
import { GlobalService } from '../../../services/global.service';

@Component({
  selector: 'app-homemain',
  templateUrl: './homemain.component.html',
  styleUrls: ['./homemain.component.scss']
})
export class HomemainComponent implements OnInit {
  isLoggedIn = false;

  constructor(private router: Router, private route: ActivatedRoute,
              private apiService: ApiService, private globalService: GlobalService,
              private authService: AuthService) { }

  ngOnInit() {
  	if (this.authService.isLoggedIn()) {
  		this.isLoggedIn = true;
  	}
  }
}
