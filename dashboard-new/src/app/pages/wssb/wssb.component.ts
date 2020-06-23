import { Component, NgModule, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import StockModule from 'highcharts/modules/stock';
import { NzGridModule } from 'ng-zorro-antd/grid'
import { MatDialog, MatDialogModule, MatDialogConfig } from '@angular/material/dialog';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';

import {AdditionalMetadata} from '../../model/additional-metadata';
import { SensorService } from '../../services/sensor.service';
StockModule(Highcharts);

Highcharts.setOptions({
  title: {
    style: {
      color: 'black'
    }
  }
});


@Component({
  selector: 'app-wssb',
  templateUrl: './wssb.component.html',
  styleUrls: ['./wssb.component.css']
})
export class WssbComponent implements OnInit {

  public buildingID = 'WSSB';
  public isCollapsed = false;
  public Highcharts = Highcharts;
  public updateFromInput = true;
  public chartOptions;
  public sensors: [];
  public selectedSensor = {id:''};
  public sensorData;
  public seriesData: [];

  public events = [];
  public eventDetails = {};
  public eventData ;
  public additionalMetadata: AdditionalMetadata[] = [];
  public selectedMeta: AdditionalMetadata;

  public timestamps = [];
  public datapoint = [];

  plotBandEvents = {
    click(e) {
      const startDate = new Date(this.options.from);
      let endDate = null
      if (this.options.to && this.options.to !== this.options.from) {
        endDate = new Date(this.options.to);
      }
      this.options.that.eventData = {
        title: this.options.id,
        description: this.options.description,
        cluster: this.options.cluster,
        start: startDate,
        end: endDate
      };
    },

    mouseover(e) {
      document.body.style.cursor = 'pointer';
      const chart = this.axis.chart;
      const x = e.offsetX;
      if (chart.customLabel) {
        chart.customLabel.hide();
      }
      chart.customLabel = chart.renderer.label(this.id, x, 85, 'callout', chart.plotLeft, chart.plotTop, false)
        .css({
          color: 'white',
        })
        .attr({
          padding: 5,
          zIndex: 6,
          stroke: 'black',
          fill: 'rgba(0,0,0,0.6)',
          r: 5,
        }).add();
    },
    mouseout(e) {
      document.body.style.cursor = 'auto';
      const chart = this.axis.chart;
      if (chart.customLabel) {
        chart.customLabel.hide();
      }
    }
  };
  constructor(private sensorService: SensorService, public dialog: MatDialog) { }

  ngOnInit(){
    this.sensorService.getSensorsByBuilding(this.buildingID).subscribe((data) => {
      this.sensors = data;
      
    });
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
  };


  selectSensor(value: { id: string}): void {
    this.sensorService.getAllSensorData(value.id).subscribe((data) => {
      this.additionalMetadata = [];
      this.events.length = 0;
      this.eventData = null;
      this.sensorData = data.sensor.data;
      this.seriesData = JSON.parse(data.data);

      for (let i =0; i<this.seriesData.length; i++){
        console.log("i: " + i + "temp[i]: " + this.seriesData[i][1]);
      
        this.timestamps.push(this.seriesData[i][0]);
        this.datapoint.push(this.seriesData[i][1]);

      }
      console.log("size " + this.timestamps.length + " " + this.datapoint.length);
      for (const item of data.additionalMetadata) {
        this.additionalMetadata.push(item);
      }
      for (const item of data.events) {
        this.addEvent(item);
      }

      this.updateFromInput = true;
    });
  }

  addEvent(data): void {
    const start = new Date(data.startDate);
    let endtime: number;
    if (data.endDate) {
      const end = new Date(data.endDate);
      endtime = end.getTime();
    } else {
      endtime = start.getTime();
    }
    this.events.push({
      id: data.id,
      title: data.title,
      color: 'rgba(255,0,0,0.5)',
      from: start.getTime(),
      to: endtime,
      events: this.plotBandEvents,
      description: data.description,
      cluster: data.cluster,
      that: this
    });
    this.updateFromInput = true;
  }



}
