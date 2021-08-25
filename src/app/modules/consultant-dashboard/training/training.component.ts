import { AlertserviceService } from 'app/_services/alertservice.service';
import { Component, OnInit } from '@angular/core';
import { ManageTrainingDTO, IDTextViewModel, TrainingDTO, ConsultantServiceProxy, StatesServiceProxy } from 'app/_services/service-proxies';

@Component({
  selector: 'ngx-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit {

  emptyHeader:string = "Nothing here";
  emptyDescription: string = "You don't have any training yet";
  trainingModel: ManageTrainingDTO = new ManageTrainingDTO();
  btnProcessing: boolean = false;
  newTraining: boolean = false;
  loading: boolean = false;
  stateData: IDTextViewModel [] = [];
  trainingCounter: number = 0;
  trainingData: TrainingDTO [] = [];
  reference: string = '';

  trainingFilter = {
    searchText: '',
    dateFrom: undefined,
    dateTo: undefined,
    pageSize: 10,
    pageNo: 1
  }

  constructor(private training: ConsultantServiceProxy, private alertMe: AlertserviceService, private state: StatesServiceProxy) { }

  ngOnInit(): void {
    this.reference = `ref-${Math.ceil(Math.random() * 10e13)}`;
    this.fetchStates();
  }

  toggleTraining(){
    this.newTraining = true;
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
    newTraining.referenceNumber = this.reference;
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

fetchTraining(){
  this.loading = true;
    this.training.fetchActiveTrainings(this.trainingFilter.searchText, this.trainingFilter.dateFrom,
      this.trainingFilter.dateTo, this.trainingFilter.pageSize, this.trainingFilter.pageNo).subscribe(data => {
        this.loading = false;
        if(!data.hasError)
        {
          this.trainingData = data.value;
          console.log(this.trainingData)
        } })
  }

  async fetchStates(){
    const data = await this.state.fetchStates().toPromise();
    this.stateData = data.value;
    console.log('All states',this.stateData)
  }

}
