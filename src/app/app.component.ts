import { Observable } from 'rxjs/Observable';
import { Component, OnInit} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {GeneralService} from './app.service';
import {Car} from './car';
import {Urls} from './urls';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  pos: Car;
  title = 'app';
  link: string;
  public lat = 33.749;
  public lon = -84.39;
  public mode = "default";
  constructor(private generalService: GeneralService,private http: HttpClient,private activatedRoute: ActivatedRoute, private router: Router) {

    }

updateCar(): void {
      this.generalService.getCar()
          .subscribe(c => {
            this.pos = c;
            console.log(this.pos.lat);
            this.lat = this.pos.lat;
            this.lon = this.pos.lng;
            console.log("this"+this.lat+"||"+this.lon);
            this.link = "http://openweathermap.org/weathermap?basemap=map&cities=true&layer=clouds&lat="+this.lat+"&lon="+this.lon+"&zoom=7";
            document.getElementById("ifm").setAttribute("src",this.link);//src = this.link;
          });

    }

  ngOnInit(){
      this.activatedRoute.queryParams.subscribe((queryParams:any) => {
      console.log("lat:"+queryParams.lat);
      console.log("lon:"+queryParams.lon);
      if(queryParams.lat!=undefined&&queryParams.lon!=undefined){
        this.mode = "specific";
        this.lat = queryParams.lat;
        this.lon = queryParams.lon;
        console.log("this"+this.lat+"||"+this.lon);
        this.link = "http://openweathermap.org/weathermap?basemap=map&cities=true&layer=clouds&lat="+this.lat+"&lon="+this.lon+"&zoom=7";
        document.getElementById("ifm").setAttribute("src",this.link);//src = this.link;
      }
     });
     setInterval(() => {
       if(this.mode=="default"){
         console.log("default_mode");
         this.updateCar();
       }
     },5000*60);
    //console.log("recieve"+);
    //console.log("recieve"+);


  }
  


}
