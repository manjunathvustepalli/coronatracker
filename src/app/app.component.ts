import { DatafetchService } from './datafetch.service';
import { Component } from '@angular/core';
import { data } from './data';
import { Chart} from 'chart.js'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'coronaTracker';
  idata:data;
  numberOfConfirmedCases:number;
  numberOfRecoveredCases: number;
  numberOfDeathCases: number;
myChart=[];
date:any;
dates:Array=[];
confirmedcases:Array=[];
deathcases:Array=[];
constructor(private datafetch:DatafetchService) {
  
}
  async ngOnInit() {
  this.getdata();
  this.date = await this.datafetch.getdates();
  console.log("date", this.date[0]["confirmed"]["total"]);
  for(let i=0;i<this.date.length;i++){
this.dates.push(this.date[i]["reportDate"]);

  }
  for (let i = 0; i < this.date.length; i++) {
    this.confirmedcases.push(this.date[i]["confirmed"]["total"]);
  }
  for (let i = 0; i < this.date.length; i++) {
    this.deathcases.push(this.date[i]["deaths"]["total"]);
  }
  console.log(this.deathcases)
  

  this.myChart = new Chart(myChart, {
    type: "line",
    data: {
      labels: this.dates,
      datasets: [
        {
          label: "number of confirmed cases",
          data: this.confirmedcases,
          fill:false,
          borderColor: "yellow",
          borderWidth: 1,
          
        },
        {
          label: "number of deaths",
          data: this.deathcases,
          fill:false,
          borderColor: "red",
          borderWidth: 1,
          
        },
      ],
    },
    options: {
      responsive: true,
      animation: {
        duration: 2000,
        easing: "easeInOutSine",
      },
      title: {
        display: true,
        text: "world wide corona cases",
        fontSize: 30,
        fontFamily: " 'Dancing Script', cursive",
      },
      scales: {
        xAxes: [
          {
            gridLines: {
              color: "rgba(0, 0, 0, 0)",
            },
          },
        ],
        yAxes: [
          {
            gridLines: {
              color: "rgba(0, 0, 0, 0)",
            },
            // ticks: {
            //   beginAtZero: true,
            // },
          },
        ],
      },
    },
  });



}
async getdata(){
  this.idata = await this.datafetch.getdata();
  console.log(this.idata);
  this.numberOfConfirmedCases = this.idata.confirmed.value;
  this.numberOfRecoveredCases = this.idata.recovered.value;
  this.numberOfDeathCases = this.idata.deaths.value;
}

}
