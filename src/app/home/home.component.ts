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
  	var a = document.getElementsByClassName('testimonial_body')[0];
  	var b = document.getElementsByClassName('testimonial_author')[0];
  	var c = document.getElementsByClassName('testimonial_quotes')[0];
  	if(direction=='left')
  	{
  		this.testimonialLeft();
  	}
  	else
  	{
  		this.testimonialRight();
  	}
  	flyOut(a,direction,this);
  	disappearAppear(b,this);
  	disappearAppear(c,this);
  }
  
  //Sample testimonial list

  testimonials = [{'text':"1-"+this.ipsum,'author':'Lorem'},{'text':"2-"+this.ipsum,'author':'Octopus'},{'text':"3-"+this.ipsum,'author':'Penguin'}];

  testimonialbody = this.testimonials[this.selected]['text'];
  testimonialauthor = this.testimonials[this.selected]['author'];


  
  

  //Testimonial animation BEGIN ----------------------------------

  function flyLeftRecursive(element,temp){
  	var x = temp-1;
  	if(x>-100){
  		setTimeout(function(){element.style.marginLeft = x+"%";flyLeftRecursive(element,x);},5);
  	}
  }
  function flyRightRecursive(element,temp){
  	var x = temp+1;
  	if(x<100){
  		setTimeout(function(){element.style.marginLeft = x+"%";flyRightRecursive(element,x);},5);
  	}
  }

  function flyOut(element,direction,scope) {
  	var temp = 15;
  	if(direction=='right')
  	{
  		flyLeftRecursive(element,temp);
  	}
  	else
  	{
  		flyRightRecursive(element,temp);
  	}
  	
  	setTimeout(function(){
  		scope.testimonialbody = scope.testimonials[scope.selected]['text'];
  		scope.testimonialauthor = scope.testimonials[scope.selected]['author'];
  		element.style.marginLeft = "15%";
  	},1000);
  }
  function disappearAppearRecursive(element,temp)
  {
  	var x = temp-0.01;
  	if(x>=0){
  		setTimeout(function(){element.style.opacity = x+"";disappearAppearRecursive(element,x);},5);
  	}

  }
  function disappearAppear(element,scope){
  	var temp = 1.0;
  	disappearAppearRecursive(element,temp);
  	setTimeout(function(){
  		element.style.opacity = "1";
  	},1000);
  	
  }

  //Testimonial animation END ----------------------------------
  

}
