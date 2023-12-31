import { NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegesterComponent } from './regester/regester.component';
import { TimelistingComponent } from './timelisting/timelisting.component';
import { AuthguardGuard } from './authguard.guard'; // Import the AuthGuard
import { ForgotpassComponent } from './forgotpass/forgotpass.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegesterComponent },
  { path: 'timelog', component: TimelistingComponent, canActivate: [AuthguardGuard] },
  { path: 'forgot', component: ForgotpassComponent },
  { path: '**', redirectTo: 'register' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
