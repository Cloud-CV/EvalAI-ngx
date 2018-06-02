// Import Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Import serivces
import { AuthService } from './services/auth.service';
import { WindowService } from './services/window.service';
import { GlobalService } from './global.service';


// Import Components
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderStaticComponent } from './partials/nav/header-static/header-static.component';
import { ContactComponent } from './contact/contact.component';
import { InputComponent } from './input/input.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderStaticComponent,
    ContactComponent,
    InputComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    AuthService,
    WindowService,
    GlobalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
