import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';
import { GlobalService } from '../../services/global.service';
import { ChallengeService } from '../../services/challenge.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-challenge-create',
  templateUrl: './challenge-create.component.html',
  styleUrls: ['./challenge-create.component.scss']
})
export class ChallengeCreateComponent implements OnInit {

  authServicePublic = null;
  isLoggedIn = false;
  routerPublic = null;
  submitForm = 'formcreate';
  hostTeam: any = null;
  @ViewChildren('formcreate')
  components: QueryList<ChallengeCreateComponent>;
  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute,
              private challengeService: ChallengeService, private globalService: GlobalService, private apiService: ApiService) { }

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.isLoggedIn = true;
    }
    this.authServicePublic = this.authService;
    this.routerPublic = this.router;
    this.challengeService.currentHostTeam.subscribe((hostTeam) => {
      this.hostTeam = hostTeam;
      if (!hostTeam) {
        setTimeout(() => {
          this.globalService.showToast('info', 'Please select a host team');
        }, 1000);
        this.router.navigate(['/teams/hosts']);
      }
    });
  }

  formValidate(formname) {
    this.globalService.formValidate(this.components, this.formSubmit, this);
  }

  formSubmit(self) {
    const FORM_DATA: FormData = new FormData();
    FORM_DATA.append('status', 'submitting');
    FORM_DATA.append('zip_configuration', self.globalService.formItemForLabel(self.components, 'zip_configuration').fileSelected);
    const SUCCESS_CALLBACK = () => {
      self.router.navigate(['/challenges/me']);
    };
    self.challengeService.challengeCreate(
      self.hostTeam['id'],
      FORM_DATA,
      SUCCESS_CALLBACK
    );
  }

}
