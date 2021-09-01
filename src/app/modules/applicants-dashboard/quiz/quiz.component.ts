import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertserviceService } from 'app/_services/alertservice.service';
import { QuestionDTO, QuizDTO, QuizServiceProxy } from 'app/_services/service-proxies';

@Component({
  selector: 'ngx-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {

  pagetitle: string = 'Test';
  allQuizes: QuizDTO [] = [];
  quizId: number = 0;
  updateQuiz: boolean = false;
  quizStart: boolean = false;
  myQuiz;
  newQuizModel;
  allQuestions: QuestionDTO [] = [];
  questionModel;
  questionOptionModel;
  myOptionType: number = 0;
  loading: boolean = false;
  quizCounter: number = 0;
  questionNo: number = 0;
  nextQuestion: boolean = false;
  questionData: QuestionDTO [] = []
  totalQuestions: number = 2;
  constructor( private alertMe: AlertserviceService, private router: Router, private quiz: QuizServiceProxy,) { }

  ngOnInit(): void {
    this.fetchAllQuizes();
  }

  startTest(){
    this.quizStart = true;
  }

  gotoNextQuestion() {
    this.questionNo = (this.questionNo/this.totalQuestions) * 100;
    this.nextQuestion = !this.nextQuestion;
  }

  goback() {
    this.nextQuestion = false;
    // this.navCtrl.back();
  }

  async fetchAllQuizes(){
    const data = await this.quiz.getAllQuizzes().toPromise();
    if(!data.hasError){
      this.allQuizes = data.result;
    }
  }

  // cancelUpdate(){

  // }

  fetchSingleQuiz(id){
  this.updateQuiz = true;
   this.quiz.getQuizById(id).subscribe( data => {
    if(!data.hasError){
      this.myQuiz = data.result;
      this.allQuestions = data.result.questions;
    }
   });
  }

}
