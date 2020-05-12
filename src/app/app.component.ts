import { DatafetchService } from "./datafetch.service";
import { Component } from "@angular/core";
import { data } from "./data";
import { Chart } from "chart.js";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  chartOptions = {
    responsive: true,
    fill: false,
    title: {
      text: "corona virus world wide tracker",
      display: true,
      fontSize: 30,
      fontFamily: " 'Dancing Script', cursive",
    },

    //maintainAspectRatio: false,
  };
  chartOptions1 = {
    responsive: true,
  };
  title = "coronaTracker";
  idata: any;
  numberOfConfirmedCases: number;
  numberOfRecoveredCases: number;
  numberOfDeathCases: number;
  numberOfConfirmedCasescountry: number = 0;
  numberOfRecoveredCasescountry: number = 0;
  numberOfDeathCasescountry: number = 0;
  myChart = [];
  date: any = [];
  dates: any = [];
  confirmedcases: any = [];
  deathcases: any = [];
  countries: any = [];
  country: any = [];
  countryselected: boolean = false;
  countrydatafetched: boolean = false;
  countryData: any = [];
  data1: number[]=[];
  constructor(private datafetch: DatafetchService) {}
  async ngOnInit() {
    this.getdata();
    this.getdates();
    this.getcountries();
  }
  async getdata() {
    this.idata = await this.datafetch.getdata();
    //console.log(this.idata);
    this.numberOfConfirmedCases = this.idata.confirmed.value;
    this.numberOfRecoveredCases = this.idata.recovered.value;
    this.numberOfDeathCases = this.idata.deaths.value;
  }
  async getdates() {
    this.date = await this.datafetch.getdates();

    for (let i = 0; i < this.date.length; i++) {
      this.dates.push(this.date[i]["reportDate"]);
    }

    for (let i = 0; i < this.date.length; i++) {
      this.confirmedcases.push(this.date[i]["confirmed"]["total"]);
    }
    for (let i = 0; i < this.date.length; i++) {
      this.deathcases.push(this.date[i]["deaths"]["total"]);
    }
  }
  async selectChange(value) {
    //console.log(value);
    this.countrydatafetched = false;
    this.countryselected = true;
    this.countryData = await this.datafetch.getcountrydata(value);
   // console.log(this.countryData);
    this.numberOfConfirmedCasescountry = this.countryData["confirmed"]["value"];
    this.numberOfDeathCasescountry = this.countryData["deaths"]["value"];
    this.numberOfRecoveredCasescountry = this.countryData["recovered"]["value"];
   // console.log(this.chartData1);
    
    this.data1.length=0;
    this.data1.push(this.numberOfConfirmedCasescountry);
    this.data1.push(this.numberOfRecoveredCasescountry);
    this.data1.push(this.numberOfDeathCasescountry);

    //console.log(this.data1);
    this.countrydatafetched = true;
    // console.log(this.numberOfDeathCasescountry,this.numberOfConfirmedCasescountry,this.numberOfRecoveredCasescountry)
  }
  async getcountries() {
    this.countries = await this.datafetch.getcountries();

    for (let i = 0; i < this.countries.countries.length; i++) {
      this.country.push(this.countries.countries[i]["name"]);
    }
    //console.log("this.countrys", this.country);
  }

  chartData = [
    {
      data: this.confirmedcases,
      label: "confirmed cases",
      fill: false,
      borderColor: "green",
      backgroundColor: "rgba(0,0,0,0)",
      pointBackgroundColor: "green",
    },
    {
      data: this.deathcases,
      label: "death cases",
      fill: false,
      borderColor: "red",
      backgroundColor: "rgba(0,0,0,0)",
      pointBackgroundColor: "red",
    },
    // { data: [45, 67, 800, 500], label: 'Account C' }
  ];

  public chartData1 = [
    {
      data: this.data1,
    },
  ];
  chartLabels1 = ["confirmed", "recovered", "deaths"];
  chartLabels = this.dates;

  onChartClick(event) {
    console.log(event);
  }
}
