import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-publiclists',
  templateUrl: './publiclists.component.html',
  styleUrls: ['./publiclists.component.scss']
})
export class PubliclistsComponent implements OnInit {
  localRouter: any;
  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.localRouter = this.router;
  }

}
