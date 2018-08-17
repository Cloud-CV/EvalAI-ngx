import { Component, OnInit, Input } from '@angular/core';
import { GlobalService } from '../../../services/global.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-forcelogin',
  templateUrl: './forcelogin.component.html',
  styleUrls: ['./forcelogin.component.scss']
})
export class ForceloginComponent implements OnInit {
  @Input() path: string;

  constructor(private globalService: GlobalService, private router: Router) { }

  ngOnInit() {
  }
  redirectToLogin() {
    this.globalService.storeData('redirect', {path: this.path});
    this.router.navigate(['/auth/login']);
  }

}
