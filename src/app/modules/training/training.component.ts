import { ConsultantServiceProxy, IDTextViewModel, ManageTrainingDTO, StatesServiceProxy } from './../../_services/service-proxies';
import { Component, OnInit } from '@angular/core';
import { AlertserviceService } from 'app/_services/alertservice.service';

@Component({
  selector: 'ngx-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit {

  trainingModel: ManageTrainingDTO = new ManageTrainingDTO();
  btnProcessing: boolean = false;
  stateData: IDTextViewModel [] = [];

  constructor(private training: ConsultantServiceProxy, private alertMe: AlertserviceService, private state: StatesServiceProxy) { }

  ngOnInit(): void {
    this.fetchStates();
  }

  postTraining(){
    this.btnProcessing = true;
    let newTraining:ManageTrainingDTO = new ManageTrainingDTO();
    newTraining.title = this.trainingModel.title;
    newTraining.fee = this.trainingModel.fee;
    newTraining.location = this.trainingModel.location;
    newTraining.stateId = Number(this.trainingModel.stateId);
    newTraining.startDate = this.trainingModel.startDate;
    newTraining.endDate = this.trainingModel.endDate;
    newTraining.duration = this.trainingModel.duration;
    newTraining.descriptions = this.trainingModel.descriptions;
    newTraining.durationLength = 1;

    this.training.postTraining(newTraining).subscribe(data => {
    this.btnProcessing = false;
    if(!data.hasError){
      this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.SUCCESS, data.message, 'Ok')
    }

    else {
      this.btnProcessing = false;
      this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.FAILED, 'Not successful', 'Ok')
    }
    })


  }

  async fetchStates(){
    const data = await this.state.fetchStates().toPromise();
    this.stateData = data.value;
    console.log('All states',this.stateData)
  }

}
