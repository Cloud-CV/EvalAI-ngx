import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleHeaderComponent } from './simple-header.component';
import {GlobalService} from '../../../services/global.service';
import {AuthService} from '../../../services/auth.service';
import {ApiService} from '../../../services/api.service';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientModule} from '@angular/common/http';
import {EndpointsService} from '../../../services/endpoints.service';

describe('SimpleHeaderComponent', () => {
  let component: SimpleHeaderComponent;
  let fixture: ComponentFixture<SimpleHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleHeaderComponent ],
      providers: [GlobalService, AuthService, ApiService, EndpointsService],
      imports: [RouterTestingModule, HttpClientModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
