import { Component, OnInit } from '@angular/core';
import {GlobalService} from '../global.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private globalService: GlobalService) {}
  title = 'EvalAI|Home';
  tagline = 'Evaluating state of the art in AI';
  description = 'EvalAI is an open-source web platform for organizing and participating in AI challenges';

  ngOnInit() {}
}
