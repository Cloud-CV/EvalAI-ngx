import { Component, OnInit } from '@angular/core';
import {Globals} from '../globals';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [Globals]
})
export class HomeComponent implements OnInit {

  constructor(private globals: Globals) {}
  title = 'EvalAI|Home';
  tagline = 'Evaluating state of the art in AI';
  description = 'EvalAI is an open-source web platform for organizing and participating in AI challenges';

  ngOnInit() {}
}
