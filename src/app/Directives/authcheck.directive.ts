import { Directive, OnInit, Input, ViewContainerRef, TemplateRef } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Directive({
  selector: '[appAuthcheck]'
})
export class AuthcheckDirective implements OnInit {

  constructor(
    private authService: AuthService,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) { }

  isAuthCondition: boolean;

  @Input() set appAuthcheck(isAuthCondition: boolean) {
    this.isAuthCondition = isAuthCondition;
  }

  ngOnInit() {
    const authVal = this.authService.isAuth;
    if (authVal && this.isAuthCondition || !authVal && !this.isAuthCondition) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
