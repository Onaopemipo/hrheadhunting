import { AccountServiceProxy, IDTextViewModel, ManageConsultantDTO, SectorsServiceProxy } from '../../_services/service-proxies';
import { Component, OnInit } from '@angular/core';
import { TableAction, TableActionEvent } from 'app/components/tablecomponent/models';

enum TP  {
  VIEW ='1',DELETE = '2'
  }
@Component({
  selector: 'ngx-consultants',
  templateUrl: './consultants.component.html',
  styleUrls: ['./consultants.component.scss']
})
export class ConsultantsComponent implements OnInit {

  // tableActionClicked(event: TableActionEvent){
  //   if(event.name==TP.VIEW){
  //     this.showConsultant = true;
  //     this.artisan.getArtisanById(event.data.id).subscribe(data => {
  //       if(!data.hasError){
  //         this.singleConsultant = data.value;
  //       }
  //     })
  //     }

      // else if(event.name==TP.DELETE){
      // this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.CONFIRM, '','Yes').subscribe(dataAction => {
      //   if(dataAction){
      //     this.artisan(event.data.id).subscribe(data => {
      //       if(!data.hasError){
      //         this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.SUCCESS, 'Successfully Deleted', 'Dismiss').subscribe(res => {
      //           this.fetchAllJobs();
      //           this.router.navigateByUrl('/');
      //         })
      //       }
      //     })
      //   }
      // }, (error) => {

      //   if (error.status == 400) {
      //     this.alertMe.openCatchErrorModal(this.alertMe.ALERT_TYPES.FAILED, error.title, "OK", error.errors);
      //   }
      // })
      //   }
  // }

  tableActions: TableAction [] = [
    {name: TP.VIEW, label: 'View'},
  // {name: TP.DELETE, label: 'Delete'},
  ]
  myPlanHeader:string = "Nothing here";
  myPlanDesc: string = "You don't have any consultant yet";
  // emptyButton: string = 'Add Consultant';
  consultantCounter:number = 0;
  consultantModal: boolean = false;
  trainingModal: boolean = false;
  show: boolean = false;
  sectorData: IDTextViewModel [] = [];
  btnProcessing: boolean = false;
  consultantModel:ManageConsultantDTO = new ManageConsultantDTO();
  constructor(private account: AccountServiceProxy, private sector: SectorsServiceProxy) { }

  ngOnInit(): void {
    this.fetchSectors();
  }

  toggleConsultant(){
    this.consultantModal = !this.consultantModal;
  }

  toggleTraining(){
    this.trainingModal = !this.trainingModal;
  }

  viewpassword() {
    this.show = !this.show;
  }

  registerConsultant(){
    let consultant = new ManageConsultantDTO();
    consultant.firstName = this.consultantModel.firstName;
    consultant.lastName = this.consultantModel.lastName;
    consultant.email = this.consultantModel.email;
    consultant.mobile = this.consultantModel.mobile;
    consultant.contactPerson = this.consultantModel.contactPerson;
    consultant.sectorId = Number(this.consultantModel.sectorId);
    consultant.subscriptionPlanId = 0;
    consultant.name = this.consultantModel.name;
    consultant.address = this.consultantModel.address;
    consultant.password = this.consultantModel.password;
    consultant.confirmPassword = this.consultantModel.confirmPassword;
    this.account.consultantSignUp(consultant).subscribe(data => {
      if(!data.hasError){
        console.log('Consultant Added!');
        alert('Consultant Added!')
      }
    })
  }

  async fetchSectors(){
    this.sector.fetchSectors().subscribe(data => {
      this.sectorData = data.value;
    });

  }
  postTraining(){

  }

}
