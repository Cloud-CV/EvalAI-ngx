import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-challenge',
  templateUrl: './challenge.component.html',
  styleUrls: ['./challenge.component.scss']
})
export class ChallengeComponent implements OnInit {
  localRouter: any;
  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  	this.localRouter = this.router;
  }

}
