import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForceloginComponent } from './forcelogin.component';

describe('ForceloginComponent', () => {
  let component: ForceloginComponent;
  let fixture: ComponentFixture<ForceloginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForceloginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForceloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
