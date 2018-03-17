import {WeatherDetails} from './weather-details';
import {WeatherClouds} from './weather-clouds';
import {WeatherMainDetails} from './weather-main-details';
import {WeatherWind} from './weather-wind';
export class Weather{
  coord: any;
  weather: WeatherDetails[];
  main: WeatherMainDetails;
  clouds: WeatherClouds;
  visibility:number;
  wind: WeatherWind;
  dt: number;
  name:string;
  dt_txt:string;

  

}
