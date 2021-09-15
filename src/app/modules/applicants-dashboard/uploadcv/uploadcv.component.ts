import { AccountServiceProxy, ApplicantProfileDTO, ApplicantServiceProxy, JobSeekerResume, ManageJobSeekerRegDTO } from './../../../_services/service-proxies';
import { AlertserviceService } from './../../../_services/alertservice.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-uploadcv',
  templateUrl: './uploadcv.component.html',
  styleUrls: ['./uploadcv.component.scss']
})
export class UploadcvComponent implements OnInit {

  jobSeeker: ManageJobSeekerRegDTO = new ManageJobSeekerRegDTO();
  btnProcessing: boolean = false;
  applicantProfile: ApplicantProfileDTO = new ApplicantProfileDTO();
  prevResume: JobSeekerResume[] = [];


 constructor(private alertMe: AlertserviceService, private applicant: ApplicantServiceProxy) { }


  ngOnInit(): void {
  }

  async fetchProfile() {
    const data = await this.applicant.getMyProfile().toPromise()
    if(!data.hasError){
      this.applicantProfile = data.value;
      this.prevResume = data.value.resumes
      console.log('Here is my profile', this.applicantProfile)
    }
  }

  async fetchResume(){
    const data = await this.applicant.fetchMyResumes(10,1).toPromise()
    if(!data.hasError){
      this.prevResume = data.value;
    }
  }


  uploadCV(){
    this.btnProcessing = true;
    this.applicant.updateMyProfile(this.jobSeeker).subscribe(data => {
      if(!data.hasError){
        this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.SUCCESS, 'Success', 'Ok').subscribe(res => {
        if(res){

        }
        })
      }
      else {
        this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.FAILED, 'Error', 'Dismiss')      }
    })



  }

  getBase64(event) {
    console.log(event)
    let me = this;
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    this.jobSeeker.resume = reader.result.toString();
    console.log( this.jobSeeker.resume);
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
        this.jobSeeker.resume= btoa(binaryString);
        console.log(btoa(binaryString));
}

}
