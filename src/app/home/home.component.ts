import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() {}

  title = 'EvalAI|Home';
  tagline = 'Evaluating state of the art in AI';
  description = 'EvalAI is an open-source web platform for organizing and participating in AI challenges';
  selected = 0;
  ipsum = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';

  ngOnInit() {}
  testimonialRight() {
  	this.selected = this.selected+1;
  	if(this.selected>=this.testimonials.length)
  	{
  		this.selected = 0;
  	}
  }
  testimonialLeft() {
  	this.selected = this.selected-1;
  	if(this.selected<0)
  	{
  		this.selected = this.testimonials.length-1;;
  	}
  }
  rightClick(direction='left') {
  	let a = document.getElementsByClassName('testimonial_body')[0];
  	let b = document.getElementsByClassName('testimonial_author')[0];
  	let c = document.getElementsByClassName('testimonial_quotes')[0];
  	if(direction=='left')
  	{
  		this.testimonialLeft();
  	}
  	else
  	{
  		this.testimonialRight();
  	}
  	this.flyOut(a,direction,this);
  	this.disappearAppear(b,this);
  	this.disappearAppear(c,this);
  }
  
  //Sample testimonial list

  testimonials = [{'text':"1-"+this.ipsum,'author':'Lorem'},{'text':"2-"+this.ipsum,'author':'Octopus'},{'text':"3-"+this.ipsum,'author':'Penguin'}];

  testimonialbody = this.testimonials[this.selected]['text'];
  testimonialauthor = this.testimonials[this.selected]['author'];


  
  

  //Testimonial animation BEGIN ----------------------------------

  flyLeftRecursive = (element,temp) => {
  	let x = temp-1;
  	if(x>-100){
      (function(scope){
    		setTimeout(function(){
          element.style.marginLeft = x+"%";
          scope.flyLeftRecursive(element,x);
        },5);
      })(this);
  	}
  }
  flyRightRecursive = (element,temp) => {
  	let x = temp+1;
  	if(x<100){
      (function(scope){
    		setTimeout(function(){
          element.style.marginLeft = x+"%";
          scope.flyRightRecursive(element,x);
        },5);
      })(this);
  	}
  }

  flyOut = (element,direction,scope) => {
  	let temp = 15;
  	if(direction=='right')
  	{
  		this.flyLeftRecursive(element,temp);
  	}
  	else
  	{
  		this.flyRightRecursive(element,temp);
  	}
  	
  	setTimeout(function(){
  		scope.testimonialbody = scope.testimonials[scope.selected]['text'];
  		scope.testimonialauthor = scope.testimonials[scope.selected]['author'];
  		element.style.marginLeft = "15%";
  	},1000);
  }
  disappearAppearRecursive = (element,temp) => {
  	let x = temp-0.01;
  	if(x>=0){
      (function(scope){
    		setTimeout(function(){
          element.style.opacity = x+"";
          scope.disappearAppearRecursive(element,x);
        },5);
      })(this);
  	}

  }
  disappearAppear = (element,scope) => {
  	let temp = 1.0;
  	this.disappearAppearRecursive(element,temp);
  	setTimeout(function(){
  		element.style.opacity = "1";
  	},1000);
  }

  //Testimonial animation END ----------------------------------
  

}
