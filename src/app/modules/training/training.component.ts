import { TableColumn, ColumnTypes, TableAction } from 'app/components/tablecomponent/models';
import { ConsultantServiceProxy, IDTextViewModel, ManageTrainingDTO, StatesServiceProxy, TrainingApplicantDTO, TrainingDTO, PaymentServiceProxy, MessageOut } from './../../_services/service-proxies';
import { Component, OnInit } from '@angular/core';
import { AlertserviceService } from 'app/_services/alertservice.service';
import { ActivatedRoute, Router } from '@angular/router';

enum TP  {
  VIEW ='1',
  DELETE = "2",
  }
@Component({
  selector: 'ngx-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit {

  postedJobsTable: TableColumn [] = [
    {name: 'consultantName', title: 'Consultant Name'},
    {name: 'descriptions', title: 'Description'},
    {name: 'location', title: 'Location'},
    {name: 'fee', title: 'Training Fee'},
    {name: 'startDate', title: 'Start Date', type: ColumnTypes.Date},
    {name: 'endDate', title: 'Valid To', type: ColumnTypes.Date},
  ];

tableActions: TableAction [] = [
  {name: TP.VIEW, label: 'View'},
{name: TP.DELETE, label: 'Delete'},
]
  emptyHeader:string = "Nothing here";
  emptyDescription: string = "You don't have any training yet";
  trainingModel: ManageTrainingDTO = new ManageTrainingDTO();
  btnProcessing: boolean = false;
  newTraining: boolean = false;
  loading: boolean = false;
  payNow: boolean = false;
  stateData: IDTextViewModel [] = [];
  trainingCounter: number = 0;
  trainingFee: number = 0;
  trainingData: TrainingDTO [] = [];
  reference: string = '';
  Consemail: string = 'philipmuyiwa@gmail.com'
  trainingResponse: MessageOut = new MessageOut();

  trainingFilter = {
    searchText: '',
    dateFrom: undefined,
    dateTo: undefined,
    pageSize: 10,
    pageNo: 1
  }

  trainingId: number = 0;
  singleTraining: TrainingDTO = new TrainingDTO();
  attendeeForm: boolean = false;
  paymentLoading: boolean = false;
  attendeeModel: TrainingApplicantDTO = new TrainingApplicantDTO();

  constructor(private training: ConsultantServiceProxy, private alertMe: AlertserviceService, private route: Router,
    private state: StatesServiceProxy, private router: ActivatedRoute, private payment: PaymentServiceProxy) { }

  ngOnInit(): void {
    this.reference = `ref-${Math.ceil(Math.random() * 10e13)}`;
    this.fetchStates();
    this.fetchTraining();
  }

  paymentInit() {
    this.paymentLoading = true;
    // this.registerEmployer();
   }
  paymentCancel() {
    console.log('cancel')
    this.paymentLoading = false;
  }
  paymentDone(event) {
    console.log('success', event)
    if(event.status === 'success'){
      // this.servicePayment = false;
      this.verifyPayment();
      this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.SUCCESS, 'Success', 'Go to dashboard').subscribe(res => {
        if(res){
          this.route.navigateByUrl('/modules/training')
        }
      })

    }

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
      this.trainingResponse = data.result;
      this.trainingFee = data.result.amount;
      console.log('Here is your response',data.result)
      this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.SUCCESS, data.message, 'Pay Now').subscribe(res => {
        if(res){
          this.payNow = true;
        }
      })
    }

    else {
      this.btnProcessing = false;
      this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.FAILED, 'Not successful', 'Ok')
    }
    })


  }

  verifyPayment(){
    this.payment.verifyTrainingPayment(this.reference, '1').subscribe(data => {
    if(!data.hasError){
      this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.SUCCESS, data.message, 'Ok')
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
          this.trainingCounter = data.totalCount;
          console.log('My training',this.trainingData)
        } })
  }


  fetchSingleTraining(){
    this.training.fetchTrainingById(this.attendeeModel.trainingId = Number(this.router.snapshot.paramMap.get("id"))).subscribe(data => {
      if(!data.hasError){
        this.singleTraining = data.value;
        console.log('Your single training is here:', this.singleTraining);
        // this.fetchSingleEmployer();
      }
    })
  }

  async fetchStates(){
    const data = await this.state.fetchStates().toPromise();
    this.stateData = data.value;
    console.log('All states',this.stateData)
  }

}
