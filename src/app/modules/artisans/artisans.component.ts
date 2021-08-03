import { TableColumn, ColumnTypes, TableActionEvent, TableAction } from 'app/components/tablecomponent/models';
import { AlertserviceService } from 'app/_services/alertservice.service';
// import { ArtisansModel } from './../../_models/artisans';
import { ArtisanDTO, ArtisanServiceProxy, IDTextViewModel, StatesServiceProxy, ManageArtisanDTO } from '../../_services/service-proxies';
import { Component, OnInit } from '@angular/core';

enum TP  {
  VIEW ='1',DELETE = '2'
  }
@Component({
  selector: 'ngx-artisans',
  templateUrl: './artisans.component.html',
  styleUrls: ['./artisans.component.scss']
})

export class ArtisansComponent implements OnInit {


  artisansTable: TableColumn [] = [
    {name: 'name', title: 'Full Name'},
    {name: 'specialty', title: 'Specialty'},
    // {name: 'email', title: 'Recruiter ID'},
    {name: 'mobile', title: 'Phone'},
    {name: 'location', title: 'Location'},
    {name: 'yearOfExperience', title: 'Experience(years)'},
    // {name: 'isActive', title: 'Job Status', type: ColumnTypes.Status},
  ];

  tableActionClicked(event: TableActionEvent){
    if(event.name==TP.VIEW){
      this.showArtisan = true;
      this.artisan.getArtisanById(event.data.id).subscribe(data => {
        if(!data.hasError){
          this.singleArtisan = data.value;
        }
      })
      }

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
  }

  tableActions: TableAction [] = [
    {name: TP.VIEW, label: 'View'},
  // {name: TP.DELETE, label: 'Delete'},
  ]

  showArtisan: boolean = false;
  loading: boolean = false;
  singleArtisan: ArtisanDTO = new ArtisanDTO();
  artisanModel:ManageArtisanDTO = new ManageArtisanDTO();
  myPlanHeader:string = "Nothing here";
  myPlanDesc: string = "You don't have any artisan yet";
  emptyButton: string = 'Add Artisan';
  artisanCounter:number = 0;
  stateData: IDTextViewModel [] = [];
  btnProcessing: boolean = false;
  artisanModal: boolean = false;
  // artisanModel: ArtisansModel = new ArtisansModel();
  artisanData: ArtisanDTO [] = [];

  artisanFilter = {
    id: null,
    searchText: '',
    dateFrom: undefined,
    dateTo: undefined,
    pageSize: 10,
    pageNo: 1
  }

  constructor(private artisan: ArtisanServiceProxy, private state: StatesServiceProxy,
    private alertMe: AlertserviceService) { }

  ngOnInit(): void {
    this.fetchStates();
    this.fetchAllArtisans();
  }

  toggleArtisan(){
    this.artisanModal = !this.artisanModal;
  }

  getBase64(event) {
    console.log(event)
    let me = this;
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    this.artisanModel.brandLogo = reader.result.toString();
    console.log( this.artisanModel.brandLogo);
    reader.onload = function () {
      // this.artisanModel.brandLogo = reader.result;
      console.log(reader.result);
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
 }

 handleFileSelect(evt){
  var files = evt.target.files;
  var file = files[0];
  console.log('My file size', file);

if(files && file && (file.size < 524888 || file.type == "image/png || image/jpg")) {
    var reader = new FileReader();
    reader.onload =this._handleReaderLoaded.bind(this);
    reader.readAsBinaryString(file);
}

else {
  this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.FAILED, 'Check your file type or size', 'OK')

}
}

_handleReaderLoaded(readerEvt) {
 var binaryString = readerEvt.target.result;
        this.artisanModel.brandLogo= btoa(binaryString);
        console.log(btoa(binaryString));
}

  addArtisan(){
    this.btnProcessing = true;
    let myArtisan = new ManageArtisanDTO();
    myArtisan.name = this.artisanModel.name;
    myArtisan.email = this.artisanModel.email;
    myArtisan.mobile = this.artisanModel.mobile;
    myArtisan.specialty = this.artisanModel.specialty;
    myArtisan.locationId = Number(this.artisanModel.locationId);
    myArtisan.description = this.artisanModel.description;
    myArtisan.yearOfExperience = this.artisanModel.yearOfExperience;
    myArtisan.brandLogo = this.artisanModel.brandLogo;
    console.log(myArtisan)
    this.artisan.addUpdateArtisan(myArtisan).subscribe(data => {
      this.btnProcessing = false;
      if(!data.hasError){
        this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.SUCCESS, 'Success', 'Ok').subscribe(res => {
        if(res){
          this.fetchAllArtisans();
          this.artisanModal = false;
        }
        })
      }
      else {
        this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.FAILED, 'Error', 'Dismiss')      }
    })
  }

  async fetchStates(){
    const data = await this.state.fetchStates().toPromise();
    this.stateData = data.value;
    console.log('All states',this.stateData)
  }

  fetchAllArtisans(){
    this.loading = true;
    this.artisan.fetchAllArtisans(this.artisanFilter.searchText, this.artisanFilter.dateFrom,
      this.artisanFilter.dateTo, this.artisanFilter.pageSize, this.artisanFilter.pageNo).subscribe(data => {
        this.loading = false;
      if(!data.hasError){
        this.artisanData = data.value;
        this.artisanCounter = data.totalCount;
        console.log('see all artisans', this.artisanData)
      }
    })
  }

  // fetchSingleArtisan(){
  //   this.artisan.getArtisanById(1).
  // }

}
