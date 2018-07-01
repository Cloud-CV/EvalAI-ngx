import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  localRouter: any;
  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.localRouter = this.router;
  }
  navigateTo(url) {
    this.router.navigate([ url ]);
  }

}
