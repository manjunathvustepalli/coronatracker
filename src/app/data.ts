import { Url } from 'url';

export interface data{
    confirmed:object,
    recovered:object,
    deaths:object,
    dailySummary:string,
    dailyTimeSeries:object,
    image:string,
    source:string,
    countries:string,
    countryDetail:string,
    lastUpdate:Date

}