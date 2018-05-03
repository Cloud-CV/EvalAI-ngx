import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor() { }

  aboutWho = 'EvalAI is built by a team of open source enthusiasts working\
    at CloudCV. CloudCV aims to make AI research reproducible and easily\
    accessible. We want to reduce the barrier to entry for doing research\
    and make it easier for researchers, students and developers to develop\
    and use state-of-the-art algorithms as a service.';
  aboutWhat = 'With EvalAI, we want to standardize the process of evaluating\
    different methods on a dataset and make it simple to host a competition.\
    Comparing a new method with other existing approaches is an essential\
    component of research and this process has traditionally been affected\
    by difference in evaluation metric implementation, different splits of\
    the dataset or minor modifications in the algorithm. This makes it extremely\
    hard to reproduce numbers from published papers and reliably compare your\
    method with other existing approaches. By building EvalAI, we hope to make\
    this easier by standardizing the dataset splits, evaluation metrics and by\
    maintaining a public leaderboard of hosted challenges.';

  ngOnInit() {
  }

}
