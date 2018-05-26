import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  
  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  	console.log(this.route, this.router.url);
  }
  navigateTo(url) {
    this.router.navigate([ url ]);
  }

}
