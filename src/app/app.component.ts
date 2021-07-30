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
  constructor(private analytics: AnalyticsService, private seoService: SeoService, public auth: AuthenticationService) {
  }

  ngOnInit(): void {
    this.myAuthStatus();
    // this.analytics.trackPageViews();
    // this.seoService.trackCanonicalChanges();
  }

  async myAuthStatus(){
    this.authStatus = await this.auth.isAuthenticated();
    this.auth.authStatus.next(this.authStatus)
    console.log('Yayayyssysys',this.authStatus)
  }
}
