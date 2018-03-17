import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import {Weather} from './weather';
import {Forecast} from './forecast';
import { of } from 'rxjs/observable/of';
import {Car} from './car';
import {Urls} from './urls';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class GeneralService {

  constructor(private http: HttpClient,private urls: Urls) { }

  getInstantWeather(lat:number,lon:number): Observable<Weather>{
    let url = this.urls.instantWeatherURL(lat,lon);
    return this.http.get<Weather>(url)
   .pipe(
     tap(reply => console.log(reply)),
    catchError(this.errorHandler<Weather>('error in showing weather'))
    );
  }
  getForecast(lat:number,lon:number): Observable<Forecast>{
    let url = this.urls.forecastURL(lat,lon);
    return this.http.get<Forecast>(url)
   .pipe(
     tap(reply => console.log(reply)),
    catchError(this.errorHandler<Forecast>('error in showing weather'))
    );
  }
  getCar(): Observable<Car>{
    let url = this.urls.carAPI();
    let header = new HttpHeaders({'Access-Control-Allow-Origin': '*','Access-Control-Allow-Methods': 'GET',
  'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'});
    return this.http.get<Car>(url,{headers:header})
   .pipe(
     tap(reply => console.log(reply)),
    catchError(this.errorHandler<Car>('error in car'))
    );
  }

  private errorHandler<T>(x: any,result?: T){
    return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    console.log(`${x} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
  }


}
