import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-applicantquiz',
  templateUrl: './applicantquiz.component.html',
  styleUrls: ['./applicantquiz.component.scss']
})
export class ApplicantquizComponent implements OnInit {
  nextQuestion: boolean = false;
  // allQuizes: QuizDTO = new QuizDTO();
  questionData: [] = []

  constructor(private navCtrl: Location, ) { }

  ngOnInit(): void {
    // this.fetchQuiz();
  }

  gotoNextQuestion() {
    this.nextQuestion = !this.nextQuestion;
  }

  goback() {
    this.navCtrl.back();
  }

  // async fetchQuiz(){
  //   const data = await this.quiz.getQuiz(1).toPromise();
  //   if(!data.hasError){
  //     this.allQuizes = data.result;
  //     this.questionData = data.result.questions;
  //   }
  // }
}
