import { ActivatedRoute } from '@angular/router';
import { IDTextViewModel, EmployerServiceProxy, EmployerDTO } from './../../../_services/service-proxies';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'app/_services/authentication.service';

@Component({
  selector: 'ngx-employerdetails',
  templateUrl: './employerdetails.component.html',
  styleUrls: ['./employerdetails.component.scss']
})
export class EmployerdetailsComponent implements OnInit {

  employerData: EmployerDTO =  new EmployerDTO();
  employerCounter:number = 0;
  employerId:number = 0;
  loading: boolean = false;
  btnProcessing: boolean = false;
  myRole: string = '';
  constructor(public authenService: AuthenticationService, private employer: EmployerServiceProxy, private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.authenService.userRole().then(data => {
      this.myRole = data;
  })
    this.loading = true;
    this.employer.getEmployerById(this.employerId = Number(this.router.snapshot.paramMap.get("id"))).subscribe(data => {
      this.loading = false;
      if(!data.hasError){
        this.employerData = data.value;
        this.employerCounter = data.totalCount;
        console.log('Your Recruiter is here:', this.employerData);
      }
    })
  }


}
