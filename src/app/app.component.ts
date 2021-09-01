/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from './@core/utils/analytics.service';
import { SeoService } from './@core/utils/seo.service';
import { AuthenticationService } from './_services/authentication.service';

@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {

  authStatus: boolean = false;
  userRole: string = '';
  constructor(private analytics: AnalyticsService, private seoService: SeoService, public auth: AuthenticationService) {
  }

  ngOnInit(): void {
    var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
    (function(){
    var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
    s1.async=true;
    s1.src='https://embed.tawk.to/61240dac649e0a0a5cd28f02/1fdqdar62';
    s1.charset='UTF-8';
    s1.setAttribute('crossorigin','*');
    s0.parentNode.insertBefore(s1,s0);
    })();
    this.myAuthStatus();
    // this.myRole();
    // this.analytics.trackPageViews();
    // this.seoService.trackCanonicalChanges();
  }

  async myAuthStatus(){
    this.authStatus = await this.auth.isAuthenticated();
    this.auth.authStatus.next(this.authStatus)
    console.log('Yayayyssysys',this.authStatus)
  }

  // async myRole(){
  //   this.myRole = await this.auth.userRole();
  //   console.log('This is my role', this.myRole)
  // }
}
