import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { GlobalService } from '../../services/global.service';
import { EndpointsService } from '../../services/endpoints.service';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: any;
  pcomp: any;
  constructor(private apiService: ApiService,
              private authService: AuthService,
              private globalService: GlobalService,
              private router: Router,
              private route: ActivatedRoute,
              private endpointsService: EndpointsService) { }

  ngOnInit() {
  	if (!this.authService.isLoggedIn()) {
  	  this.globalService.storeData(this.globalService.redirectStorageKey, this.router.url);
      this.router.navigate(['/auth/login']);
  	}
  	this.authService.change.subscribe((details)=> {
      this.user = details;
      this.processUserDetails();

  	});
  }

  processUserDetails() {
  	let countLeft = 0;
  	let count = 0;
  	for (var i in this.user) {
	    if (this.user[i] === "" || this.user[i] === undefined || this.user[i] === null) {
	        this.user[i] = "-";
	        countLeft = countLeft + 1;
	  	}
  	    count = count + 1;
  	}
  	let temp = ((countLeft / count) * 100).toString();
  	this.pcomp = (100 - parseInt(temp)).toString() + '%';
  }

  updateUserDetails() {
    const SELF = this;
    const apiCall = (params) => {
      const BODY = JSON.stringify(params);
      console.log(params);
      SELF.apiService.putUrl(SELF.endpointsService.userDetailsURL(),
                             BODY).subscribe(
        data => {
          // Success Message in data.message
          SELF.globalService.showToast('success', 'User details updated successfully', 5);
          SELF.authService.fetchUserDetails();
        },
        err => {
          SELF.globalService.handleApiError(err, true);
        },
        () => console.log('USER-UPDATE-FINISHED')
      );
    };
  	const PARAMS = {
      title: 'Update Submission Details',
      content: '',
      confirm: 'Submit',
      deny: 'Cancel',
      form: [
        {
          isRequired: true,
          label: 'first_name',
          placeholder: 'First Name',
          type: 'text',
          value: this.user['first_name']
        },
        {
          isRequired: true,
          label: 'last_name',
          placeholder: 'Last Name',
          type: 'text',
          value: this.user['last_name']
        },
        {
          isRequired: true,
          label: 'affiliation',
          placeholder: 'Affiliated To',
          type: 'text',
          value: this.user['affiliation']
        }
      ],
      confirmCallback: apiCall
    };
    SELF.globalService.showModal(PARAMS);

  }
}
