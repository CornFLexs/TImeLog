import { NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegesterComponent } from './regester/regester.component';
import { TimelistingComponent } from './timelisting/timelisting.component';
import { AuthguardGuard } from './authguard.guard'; // Import the AuthGuard

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'regester', component: RegesterComponent },
  { path: 'timelog', component: TimelistingComponent, canActivate: [AuthguardGuard] },
  { path: '**', redirectTo: 'regester' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
