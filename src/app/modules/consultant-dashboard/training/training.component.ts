import { AlertserviceService } from 'app/_services/alertservice.service';
import { Component, OnInit } from '@angular/core';
import { ManageTrainingDTO, IDTextViewModel, TrainingDTO, ConsultantServiceProxy, StatesServiceProxy, PaymentServiceProxy } from 'app/_services/service-proxies';
import { ColumnTypes, TableColumn } from 'app/components/tablecomponent/models';
import { AuthenticationService } from 'app/_services/authentication.service';
import { Router } from '@angular/router';

enum TP  {
  VIEW ='1',
  PROCESS = "2",
  DELETE = '3'
  }
@Component({
  selector: 'ngx-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit {

  postedTraining: TableColumn [] = [
    {name: 'title', title: 'Training Title'},
    {name: 'startDate', title: 'Training Date', type: ColumnTypes.Date},
    {name: 'location', title: 'Training Location'},
    {name: 'fee', title: 'Training Fee'},
    {name: 'endDate', title: 'Valid To', type: ColumnTypes.Date},
    // {name: 'isActive', title: 'Job Status', type: ColumnTypes.Status},
  ];
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

  loggedinUser;
  email:string = '';
  trainingAmount:number = 20000;


  constructor(private training: ConsultantServiceProxy, private alertMe: AlertserviceService, private route: Router,
    private state: StatesServiceProxy, private auth: AuthenticationService, private payment: PaymentServiceProxy) { }

  ngOnInit(): void {
    this.reference = `ref-${Math.ceil(Math.random() * 10e13)}`;
    this.fetchStates();
    this.getUser();
  }

  async getUser(){
    this.loggedinUser = await this.auth.getuser()
    this.email = this.loggedinUser[0].email
  }

  toggleTraining(){
    this.newTraining = true;
  }

  paymentCancel() {
    console.log('cancel')
  }

  paymentDone(event) {
    console.log('success', event)
    if(event.status === 'success'){
      this.verifyPayment();
      this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.SUCCESS, 'Success', 'Go to dashboard').subscribe(res => {
        if(res){
          this.route.navigateByUrl('consdash/training')
        }
      })

    }

  }

  verifyPayment() {
    this.payment.verifyTrainingPayment(this.reference,this.email.toString()).subscribe(data => {
      if (!data.hasError) {
        this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.SUCCESS, data.message, 'Go to Dashboard').subscribe(res => {
          if(res){
            this.route.navigateByUrl('/consdash/training')
          }
        });
      } else {
        this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.FAILED, "Payment Failed, Please try again", 'OK');
    }
  })
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
