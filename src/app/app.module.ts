import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChartsModule } from "ng2-charts";
import { FormsModule } from "@angular/forms";
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, ChartsModule,FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
