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

  condition: boolean;

  @Input() set appAuthcheck(condition: boolean) {
    this.condition = condition;
  }

  ngOnInit() {
    const authVal = this.authService.isAuth;
    if (authVal && this.condition || !authVal && !this.condition) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
