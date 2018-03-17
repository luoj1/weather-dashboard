import {GeneralService} from '../app.service'
import {Component, OnInit} from '@angular/core';
import {Weather} from '../weather'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {Car} from '../car';
import {Urls} from '../urls';
@Component({
  selector: 'instantWeather',
  templateUrl:'./instantWeather.component.html',
  styleUrls: []
})

export class InstantWeatherComponent implements OnInit{
  instantdata: Weather;
  pos: Car;
  private lat = 33.749;
  private lon = -84.39;
  private mode = "default";
  updateWeather(lat: number,lon:number): void {
    this.generalService.getInstantWeather(lat,lon)
        .subscribe(w => this.instantdata = w);
        console.log(this.instantdata);
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
  constructor(private generalService: GeneralService,private http: HttpClient,private activatedRoute: ActivatedRoute, private router: Router, private urls: Urls){
    setInterval(() => {this.updateWeather(this.lat,this.lon);},3000);
}
  ngOnInit(){
    //this.autorefresh = 12;

    //setInterval(()=>{this.updateWeather(20,-70)}, 1000);
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


}
