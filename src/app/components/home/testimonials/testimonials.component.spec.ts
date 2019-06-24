import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestimonialsComponent } from './testimonials.component';
import { RouterTestingModule } from '@angular/router/testing';
import {By} from '@angular/platform-browser';
import {Router, Routes} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';

const routes: Routes = [
  {
    path: '',
    component: TestimonialsComponent,
  }
];



describe('TestimonialsComponent', () => {
  let component: TestimonialsComponent;
  let fixture: ComponentFixture<TestimonialsComponent>;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestimonialsComponent ],
      imports: [ RouterTestingModule.withRoutes(routes), HttpClientModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    router = TestBed.get(Router);
    fixture = TestBed.createComponent(TestimonialsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should click left arrow', () => {
    router.navigate(['/']).then(() => {

      fixture.detectChanges();
      const ele = fixture.debugElement.query(By.css('.testimonial-arrow-left'));
      ele.nativeElement.click();
      fixture.detectChanges();
      expect(component.selected).toBeLessThanOrEqual(2);

    });

  });

  it('should click right arrow', () => {
    router.navigate(['/']).then(() => {

      fixture.detectChanges();
      const ele = fixture.debugElement.query(By.css('.testimonial-arrow-right'));
      ele.nativeElement.click();
      fixture.detectChanges();
      expect(component.selected).toBeLessThanOrEqual(1);

    });

  });


});
