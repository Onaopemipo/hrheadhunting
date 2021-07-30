import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuardService as AuthGuard } from './_services/auth-guard.service';

export const routes: Routes = [
  // {
  //   path: '',
  //   loadChildren: () => import('./modules/modules.module').then(m => m.ModulesModule),
  //   canLoad: [AuthGuard],
  // },

  //  {
  //   path: 'applicants',
  //   loadChildren: () => import('./modules/applicants/applicants.module').then(m => m.ApplicantsModule)
  // },

  {
    path: '',
    loadChildren: () => import('./modules/applicants/applicants.module').then(m => m.ApplicantsModule)
  },

  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule),
  },

  {
    path: 'appdash',
    loadChildren: () => import('./modules/applicants-dashboard/applicants-dashboard.module').then(m => m.ApplicantsDashboardModule),
  },

  {
    path: 'empdash',
    loadChildren: () => import('./modules/employer-dashboard/employer-dashboard.module').then(m => m.EmployerDashboardModule),
  },

  {
    path: 'modules',
    loadChildren: () => import('./modules/modules.module').then(m => m.ModulesModule),
    canLoad: [AuthGuard],
  },

  // {
  //   path: 'recruitment',
  //   loadChildren: () => import('./modules/recruitment/recruitment.module').then(m => m.RecruitmentModule)
  // },

   { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: '**', redirectTo: 'auth' },
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
