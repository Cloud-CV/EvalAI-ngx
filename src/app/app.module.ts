// Import Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

// Import serivces
import { AuthService } from './services/auth.service';
import { GlobalService } from './global.service';

// Import Components
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderStaticComponent } from './partials/nav/header-static/header-static.component';
import { AboutComponent } from './about/about.component';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderStaticComponent,
    AboutComponent,
    AuthComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    RouterModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    AuthService,
    GlobalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
