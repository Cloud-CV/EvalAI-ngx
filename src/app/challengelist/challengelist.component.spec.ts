import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengelistComponent } from './challengelist.component';
import { CardlistComponent } from '../cardlist/cardlist.component';
import { ChallengecardComponent } from '../challengecard/challengecard.component';
import { TeamcardComponent } from '../teamcard/teamcard.component';
import { GlobalService } from '../global.service';
import { ApiService } from '../services/api.service';
import { HttpClientModule } from '@angular/common/http';

describe('ChallengelistComponent', () => {
  let component: ChallengelistComponent;
  let fixture: ComponentFixture<ChallengelistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ],
      declarations: [ ChallengelistComponent,
                      CardlistComponent,
                      ChallengecardComponent,
                      TeamcardComponent ],
      providers: [ GlobalService,
                   ApiService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChallengelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
