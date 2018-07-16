import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomemainComponent } from './homemain.component';

describe('HomemainComponent', () => {
  let component: HomemainComponent;
  let fixture: ComponentFixture<HomemainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomemainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomemainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
