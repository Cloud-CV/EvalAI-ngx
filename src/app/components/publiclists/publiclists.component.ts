import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'app-publiclists',
  templateUrl: './publiclists.component.html',
  styleUrls: ['./publiclists.component.scss']
})
export class PubliclistsComponent implements OnInit {
  localRouter: any;
  constructor(private router: Router, private route: ActivatedRoute, @Inject(DOCUMENT) private document: Document,
              private globalService: GlobalService) { }

  ngOnInit() {
    this.localRouter = this.router;
    this.scrollNav();
    this.globalService.scrollToTop();
  }
  scrollNav() {
    if (this.router.url === '/challenges/all') {
      this.document.getElementById('all-challenges-nav').scrollIntoView();
    } else if (this.router.url === '/challenges/me') {
      this.document.getElementById('all-challenges-nav').scrollIntoView();
    } else if (this.router.url === '/teams/participants') {
      this.document.getElementById('host-teams-nav').scrollIntoView();
    } else if (this.router.url === '/teams/hosts') {
      this.document.getElementById('host-teams-nav').scrollIntoView();
    }
  }
}
