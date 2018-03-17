import {GeneralService} from '../app.service';
import {Component, OnInit} from '@angular/core';
import {Weather} from '../weather';
import {Forecast} from '../forecast'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {Car} from '../car';
@Component({
  selector: 'forecast',
  templateUrl:'./forecast.component.html',
  styleUrls: []
})

export class ForecastComponent implements OnInit{
  pos: Car;
  forecastdata: Forecast;
  status: string;
  private lat = 33.749;
  private lon = -84.39;
  private mode = "default";
  updateWeather(lat: number,lon:number): void {
    this.generalService.getForecast(lat,lon)
        .subscribe(w => this.forecastdata = w);
        console.log(this.forecastdata);
  }

  constructor(private generalService: GeneralService,private http: HttpClient,private activatedRoute: ActivatedRoute, private router: Router){
    if(this.status == null){
      this.status = 'auto refresh';
    }
    var si = setInterval(() => {
      if(this.status == 'auto refresh'){
        this.updateWeather(this.lat,this.lon);
      }
    },3000);
    //setInterval(() => {this.updateWeather(this.lat,this.lon);},3000);
    //setInterval(()=>{this.updateWeather(20,-70)}, 1000);
  }

  ngOnInit(){
    //this.updateWeather(this.lat,this.lon);
    //this.auto = 1;
    this.activatedRoute.queryParams.subscribe((queryParams:any) => {
    console.log("lat:"+queryParams.lat);
    console.log("lon:"+queryParams.lon);
    if(queryParams.lat!=undefined&&queryParams.lon!=undefined){
      this.mode = "specific";
      this.lat = queryParams.lat;
      this.lon = queryParams.lon;
      console.log("thisfore"+this.lat+"||"+this.lon);
    }
   });
   setInterval(() => {
     if(this.mode=="default"){
       console.log("default_mode");
       this.updateCar();
     }
   },2000);
  }

  updateCar(): void {
        this.generalService.getCar()
            .subscribe(c => {
              this.pos = c;
              console.log(this.pos.lat);
              this.lat = this.pos.lat;
              this.lon = this.pos.lng;
              console.log("thisfore"+this.lat+"||"+this.lon);
            });

      }

  click():void{
    if(this.status == 'auto refresh'){
      this.status ='no refresh';
    }else{
      this.status ='auto refresh';
    }
  }
}
