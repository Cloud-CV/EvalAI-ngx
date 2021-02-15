import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPasswordComponent } from './reset-password.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { GlobalService } from '../../../services/global.service';
import { EndpointsService } from '../../../services/endpoints.service';
import { ApiService } from '../../../services/api.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { InputComponent } from '../../utility/input/input.component';
import { OwlDateTimeComponent, OwlDateTimeModule } from 'ng-pick-datetime';

describe('ResetPasswordComponent', () => {
  let component: ResetPasswordComponent;
  let fixture: ComponentFixture<ResetPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ResetPasswordComponent, InputComponent],
      providers: [AuthService, GlobalService, EndpointsService, ApiService],
      imports: [HttpClientModule, RouterTestingModule, FormsModule, OwlDateTimeModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
