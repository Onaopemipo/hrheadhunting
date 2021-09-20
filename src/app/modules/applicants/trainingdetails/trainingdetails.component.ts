import { AlertserviceService } from './../../../_services/alertservice.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'app/_services/authentication.service';
import { ConsultantServiceProxy, TrainingApplicantDTO, TrainingDTO } from 'app/_services/service-proxies';

@Component({
  selector: 'ngx-trainingdetails',
  templateUrl: './trainingdetails.component.html',
  styleUrls: ['./trainingdetails.component.scss']
})
export class TrainingdetailsComponent implements OnInit {
  trainingId: number = 0;
  singleTraining: TrainingDTO = new TrainingDTO();
  btnProcessing: boolean = false;
  attendeeForm: boolean = false;
  attendeeModel: TrainingApplicantDTO = new TrainingApplicantDTO();
  myRole: string = '';

  constructor(private training: ConsultantServiceProxy, private alertMe: AlertserviceService, private route: Router, public authenService: AuthenticationService,private router: ActivatedRoute,) { }

  ngOnInit(): void {
    this.training.fetchTrainingById(this.attendeeModel.trainingId = Number(this.router.snapshot.paramMap.get("id"))).subscribe(data => {
      if(!data.hasError){
        this.singleTraining = data.value;
        console.log('Your single training is here:', this.singleTraining);
        // this.fetchSingleEmployer();
      }
    })

    this.authenService.userRole().then(data => {
      this.myRole = data;
  })
  }

  toggleApplication(){
    this.attendeeForm = true;
  }

  logOut(){
    this.authenService.clearusers();
    this.route.navigateByUrl('/auth/login');
  }

  trainingApplication(){
    this.btnProcessing = true;
    this.training.postTrainingApplication(this.attendeeModel).subscribe(data => {
      this.btnProcessing = false;
      if(!data.hasError){
        this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.SUCCESS, data.message, 'Ok').subscribe(res => {
          if(res){
            this.route.navigateByUrl('/applicants/training')
          }
        })
      }
    })
  }



}

