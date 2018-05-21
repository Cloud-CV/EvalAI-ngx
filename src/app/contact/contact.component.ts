import { Component, OnInit, Inject } from '@angular/core';
import { ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { InputComponent } from '../input/input.component';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit, AfterViewInit {

  @ViewChildren('formgroup') 
  components:QueryList<InputComponent>;
  componentlist:any;

  constructor(@Inject(DOCUMENT) private document: Document) { }

  ngOnInit() {
  	this.loadJS('https://maps.googleapis.com/maps/api/js?key=AIzaSyDlXSVBOW9fl96oY4oyTo055jUVd9Y-6dA', this.callBack, this.document.body,this);
  }
  ngAfterViewInit(){
    // print array of CustomComponent objects
    // this.componentlist = this.components.toArray();
  }

  loadJS(url, implementationCode, location, env){
    let scriptTag = this.document.createElement('script');
    scriptTag.src = url;

    scriptTag.onload = () => {
    	implementationCode(env);
    };
    // scriptTag.onreadystatechange = implementationCode;

    location.appendChild(scriptTag);
  }
  formSubmit() {
    let requiredFieldMissing = false;
    this.components.map((item) => {
      if (item.isRequired && !item.isDirty) {
        item.isDirty = true;
      }
      if (!item.isValid) {
        requiredFieldMissing = true;
      }
    });
    if (!requiredFieldMissing) {
       alert("HOLA");
    }
    
    
  }

  initMap() {
  	let uluru = {lat: 33.779478, lng: -84.434887};
    let ulurumarker = {lat: 33.780398, lng: -84.395513};
    let map = new google.maps.Map(document.getElementById('contact-map'), {
          zoom: 13,
          center: uluru
    });
    let marker = new google.maps.Marker({
      position: ulurumarker,
      map: map
    });
  }
  callBack(self) {
		self.initMap();
  }

}
