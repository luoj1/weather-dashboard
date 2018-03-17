import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule }    from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';
import { AppComponent } from './app.component';
import {InstantWeatherComponent} from './instantWeather/instantWeather.component';
import {ForecastComponent} from './forecast/forecast.component';
import {GeneralService} from './app.service'
import {maths} from './forecast/forecast.pipe'
import { FormsModule } from '@angular/forms';
import {Urls} from './urls';
//import {DomSanitizer} from '@angular/platform-browser';
//import {uiSwitch} from 'angular-ui-switch';
const appRoutes: Routes = [
{path:'location', component : AppComponent},
];
@NgModule({
  declarations: [
    AppComponent,
    InstantWeatherComponent,
    ForecastComponent,
    maths
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false} // <-- debugging purposes only
    )
//    DomSanitizer
  ],
  providers: [GeneralService,Urls],
  bootstrap: [AppComponent]
})
export class AppModule { }
