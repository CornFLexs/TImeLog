import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule} from '@angular/forms';
import { TimelistingComponent } from './timelisting/timelisting.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RegesterComponent } from './regester/regester.component';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from './material/material.module';
import { ThemePalette } from '@angular/material/core';
import { ForgotpassComponent } from './forgotpass/forgotpass.component';
@NgModule({
  declarations: [
    AppComponent,
    TimelistingComponent,
    RegesterComponent,
    LoginComponent,
    ForgotpassComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
