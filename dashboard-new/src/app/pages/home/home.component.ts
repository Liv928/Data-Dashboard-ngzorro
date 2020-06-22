import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import StockModule from 'highcharts/modules/stock';
import { NzGridModule } from 'ng-zorro-antd/grid';

import { MatDialog, MatDialogModule, MatDialogConfig } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import {AdditionalMetadata} from '../../model/additional-metadata';

StockModule(Highcharts);

Highcharts.setOptions({
  title: {
    style: {
      color: 'black'
    }
  }
});

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
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

  constructor() { }

  ngOnInit() {

    this.chartOptions = {
      legend: {
        layout: 'vertical',
        align: 'left',
        verticalAlign: 'middle',
        itemHoverStyle: {
          color: 'red',
        }
      },
      rangeSelector: {
        selected: 2
      },
      title: {text: 'Sensor Data'},
      series: [{
        showInLegend: true,
        type: 'line',
        name: '',
        tooltip: {
          valueDecimals: 2
        },
        data:[]
      }],
      yAxis: {
        opposite: false,
        title: {}
      },
      xAxis: {
        type: 'datetime',
        dateTimeLabelFormats: {
            hour: '%H:%M'
        },
        minRange: 1000,
        minTickInterval: 1000 
      }
    }
  }

}
