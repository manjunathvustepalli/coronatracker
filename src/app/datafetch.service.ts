import { data } from './data';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DatafetchService {
  private url ="https://covid19.mathdro.id/api";
  constructor(private http:HttpClient) { }
   async getdata(){
   console.log("object")
     let response = await this.http.get(this.url).toPromise();
     return response;
  }
  async getdates(){
    let dates = await this.http.get(this.url+"/daily").toPromise();
    console.log(dates)
    return dates;
  }
 
}
