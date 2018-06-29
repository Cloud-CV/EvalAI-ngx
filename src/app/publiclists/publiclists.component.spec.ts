import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PubliclistsComponent } from './publiclists.component';

describe('PubliclistsComponent', () => {
  let component: PubliclistsComponent;
  let fixture: ComponentFixture<PubliclistsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PubliclistsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PubliclistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
