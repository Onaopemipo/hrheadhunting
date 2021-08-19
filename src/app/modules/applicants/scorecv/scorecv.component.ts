import { AlertserviceService } from './../../../_services/alertservice.service';
import { CvScoreDTO, CvScoreServiceProxy, RezScore } from './../../../_services/service-proxies';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'app/_services/authentication.service';

@Component({
  selector: 'ngx-scorecv',
  templateUrl: './scorecv.component.html',
  styleUrls: ['./scorecv.component.scss']
})
export class ScorecvComponent implements OnInit {

  btnprocessing: boolean = false;
  showMenu: boolean = false;
  cvScoreModel: CvScoreDTO = new CvScoreDTO();
  analysisResult: RezScore = new RezScore();
  imgSrc: string = '';
  pageId: number = 0;
  constructor(public authenService: AuthenticationService, private score: CvScoreServiceProxy, private alertMe: AlertserviceService) { }

  ngOnInit(): void {
  }

  toggleMenu(){
    this.showMenu = !this.showMenu;
  }

  analyzeCv(){
    this.btnprocessing = true;
    this.score.analyze(this.cvScoreModel).subscribe(data => {
      this.btnprocessing = false;
      if(!data.hasError){
        this.analysisResult = data.result;
        this.pageId = 1;
        this.imgSrc = "assets/images/grades/" + data.result.scoreImg + ".png";
        console.log('Here is your Image',this.imgSrc)
        console.log('Here is your result',this.analysisResult)
        this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.SUCCESS, data.message, 'OK')
      } else {
        this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.FAILED, data.message, 'OK')
      }
    });
  }

  getBase64(event) {
    console.log(event)
    let me = this;
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    this.cvScoreModel.cv = reader.result.toString();
    // console.log( this.cvScoreModel.cv);
    reader.onload = function () {
      // this.cvScoreModel.cv = reader.result;
      // console.log(reader.result);
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
 }

 handleFileSelect(evt){
  var files = evt.target.files;
  var file = files[0];
  this.cvScoreModel.extension = file.name.split('.').pop()
  // console.log('My file is here:', file);

if(files && file && (file.size < 524888 || file.type == "doc || pdf || docx")) {
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
        this.cvScoreModel.cv= btoa(binaryString);
        console.log(btoa(binaryString));
}

}
