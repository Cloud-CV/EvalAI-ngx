import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalComponent } from './modal.component';
import { InputComponent } from '../input/input.component';
import { GlobalService } from '../../../services/global.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ChallengeService } from '../../../services/challenge.service';
import { ApiService } from './api.service';
import { AuthService } from './auth.service';
import { EndpointsService } from './endpoints.service';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalComponent, InputComponent ],
      imports: [ HttpClientModule ],
      providers: [ GlobalService, ChallengeService, EndpointsService, AuthService, ApiService ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
