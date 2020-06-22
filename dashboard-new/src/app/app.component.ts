import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';
import StockModule from 'highcharts/modules/stock';
import { NzGridModule } from 'ng-zorro-antd/grid';
import {AdditionalMetadata} from './model/additional-metadata';



StockModule(Highcharts);

Highcharts.setOptions({
  title: {
    style: {
      color: 'black'
    }
  }
});

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  public isCollapsed = false;
  public Highcharts = Highcharts;
  public updateFromInput = true;
  public chartOptions;
  public buildings: [];
  public sensors: [];
  public sensorData;
  public additionalMetadata: AdditionalMetadata[] = [];
  public selectedBuilding;
  public selectedSensor;
  public selectedChart;
  public seriesData;
  public events = [];
  public eventDetails = {};
  public eventData;
  public selectedMeta: AdditionalMetadata;
  public charts: string[] = ['Pie Chart', 'Bar Chart', 'Scatter Plot'];


  constructor(){
  }

  ngOnInit() {
  }
}
