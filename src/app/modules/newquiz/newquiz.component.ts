import { Router } from '@angular/router';
import { AlertserviceService } from 'app/_services/alertservice.service';
// import { IDTextViewModel } from 'app/_services/service-proxies';
// import { RecruitmentQuizServiceProxy, ManageQuizDTO, QuestionDTO, QuestionOptionDTO } from './../../../../_services/service-proxies';
import { Component, OnInit } from '@angular/core';
import { IDTextViewModel, ManageQuizDTO, QuestionDTO, QuestionOptionDTO, QuizServiceProxy } from 'app/_services/service-proxies';

@Component({
  selector: 'ngx-newquiz',
  templateUrl: './newquiz.component.html',
  styleUrls: ['./newquiz.component.scss']
})
export class NewquizComponent implements OnInit {

  optionTypes = [
    {id: 0, label: 'Multiple Choice'},
    {id: 1, label: 'True/False'},
    {id: 2, label: 'Long Text'},
    {id: 3, label: 'Description'},
  ];
  multiChoice: QuestionOptionDTO [] = [];
  booleanChoice = [
    { id: 0, label: 'A', value: 'True'},
    { id: 1, label: 'B', value: 'False'},
];

  questions: QuestionDTO[] = [];
  myOptionType: number = 0;

  pagetitle: string = 'Add Quiz';
  newQuizModel: ManageQuizDTO = new ManageQuizDTO();;
  allQuizTypes: IDTextViewModel [] = [];
  allQuestionTypes: IDTextViewModel [] = [];
  allQuestions: QuestionDTO [] = [];
  questionModel: QuestionDTO = new QuestionDTO();
  questionOptionModel: QuestionOptionDTO = new QuestionOptionDTO();
  newOption = '';
  loading: boolean = false;
  buttonStatus: boolean = false;

  constructor(private alertMe: AlertserviceService, private router: Router, private quiz: QuizServiceProxy) { }

  defaultQuestion() {
    return new QuestionDTO();
  }

  ngOnInit(): void {
    this.fetchQuestionTypes();
    this.fetchQuizTypes();
    this.allQuestions = [
      this.defaultQuestion()
    ]
  }

  onChange(event) {
    this.myOptionType = event;
  }

  cancelUpdate() {}
  toggleNewQuiz() {}

  addNewQuestion(){
    this.questionModel.questionOptions = this.multiChoice;
    this.allQuestions.push(this.questionModel);
    this.questionModel = new QuestionDTO();
    console.log('Here is your question',this.allQuestions)
    this.multiChoice = [];
  }

  addOption(newOption: string){
    var DuplicateChk = this.multiChoice.find(x=>x.value == newOption);
    if(DuplicateChk){
      this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.FAILED, 'Option exist already', 'Dismiss')
    }else{
      let option = new QuestionOptionDTO();
      option.value = newOption;
      this.multiChoice.push(option);
      option = new QuestionOptionDTO();
    }
  }

  addNewQuiz() {
    this.loading = true;
    this.newQuizModel.questions = JSON.stringify(this.allQuestions);
    // this.newQuizModel.typeId = 1;
    this.quiz.addUpdateQuiz(this.newQuizModel).subscribe(data => {
    this.loading = false;
      if(!data.hasError){
        this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.SUCCESS, 'Quiz Added!', 'Dismiss').subscribe(res => {
          if(res){
            this.router.navigateByUrl('recruitment/quiz')
          }
        });
      }
    }, (error) => {

      if (error.status == 400) {
        this.alertMe.openCatchErrorModal(this.alertMe.ALERT_TYPES.FAILED, error.title, "OK", error.errors);
      }
    });
  }

  async fetchQuizTypes(){
    const data = await this.quiz.fetchQuizTypes().toPromise();
    if(!data.hasError){
      this.allQuizTypes = data.result;
    }
  }

  removeOption(moption){
   this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.CONFIRM, '', 'Yes').subscribe(res => {
     if(res){
      for( var i = 0; i < this.multiChoice.length; i++){
        if (this.multiChoice[i] === moption) {
          this.multiChoice.splice(i, 1);
            i--;
        }
    }
     }
   })
  }

  async fetchQuestionTypes(){
    const data = await this.quiz.fetchQuestionTypes().toPromise();
    if(!data.hasError){
      this.allQuestionTypes = data.result;
    }
  }


}
