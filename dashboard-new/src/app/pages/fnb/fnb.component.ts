import { Component, NgModule, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import StockModule from 'highcharts/modules/stock';
import { NzGridModule } from 'ng-zorro-antd/grid'
import { MatDialog, MatDialogModule, MatDialogConfig } from '@angular/material/dialog';




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
  selector: 'app-fnb',
  templateUrl: './fnb.component.html',
  styleUrls: ['./fnb.component.css']
})
export class FnbComponent implements OnInit {
  public buildingID = 'FNB';
  public isCollapsed = false;
  public Highcharts = Highcharts;
  public updateFromInput = true;
  public chartOptions;
  public sensors: [];
  public selectedSensor = {name: ''} ;
  public sensorData;
  public events = [];
  public eventDetails = {};
  public eventData ;
  public additionalMetadata: AdditionalMetadata[] = [];
  public selectedMeta: AdditionalMetadata;
  public seriesData;
  public selectedBuilding;

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
  }



  selectSensor($event) {
    this.sensorService.getAllSensorData($event.value.id).subscribe((data) => {
      this.additionalMetadata = [];
      this.events.length = 0;
      this.eventData = null;
      this.sensorData = {sensor1: data};
      this.seriesData = {sensor1: JSON.parse(data.data)};
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

  /*
  openDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;

    const dialogRef = this.dialog.open(AddSensorsComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        dialogRef.close();
        if (data) {
          this.addSeries(data);
        }
      }
    );
  }


  addEventDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
  
    const dialogRef = this.dialog.open(AddEventComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        dialogRef.close();
        if (data) {
          this.saveEvent(data);
        }
      }
    );
  }

  deleteEventDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    const dialogRef = this.dialog.open(DeleteEventComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        dialogRef.close();
        if (data.delete){
          this.deleteEvent();
        }
      }
    );
  }

  editEventDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    const dialogRef = this.dialog.open(EditEventComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        dialogRef.close();
        if (data) {
          this.updateEvent(data);
        }
      }
    );
  }

  addMetadataDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    const dialogRef = this.dialog.open(AddMetadataComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        dialogRef.close();
        if (data) {
          this.saveMetadata(data);
        }
      }
    );
  }

  deleteMetadataDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    const dialogRef = this.dialog.open(DeleteMetadataComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        dialogRef.close();
        if (data.delete){
          this.deleteMetadata();
        }
      }
    );
  }

  editMetadataDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    const dialogRef = this.dialog.open(EditMetadataComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        dialogRef.close();
        if (data) {
          this.updateMetadata(data);
        }
      }
    );
  }

  selectBuilding($event) {
    this.sensorService.getSensorsByBuilding($event.value.id).subscribe((data) => {
      this.seriesData = null;
      this.sensorData = null;
      this.additionalMetadata = [];
      this.events.length = 0;
      this.sensors = data;
    });
  }

  updateChart(): void {
    this.chartOptions.series[0].data = this.seriesData.sensor1;
    this.chartOptions.yAxis.title = {};
    this.chartOptions.yAxis.title.text = this.sensorData.sensor1.sensorMeta.units;
    this.chartOptions.series[0].name = this.selectedSensor.name;
  }

  addSeries(data): void {
    this.chartOptions.series[1] = {
      data: JSON.parse(data.sensor1.data)
    };
    this.chartOptions.series[1].name = data.sensor1.sensor.name;
    this.updateFromInput = true;
  }

  saveMetadata(data): void {
    const addMetadata: AdditionalMetadata = {
      id: data.id,
      title: data.metaTitle,
      description: data.metaDescription,
      sensorId: this.sensorData.sensor1.sensorMeta._id
    };
    this.sensorService.saveAdditionalMetadata(addMetadata).subscribe((response) => {
      this.additionalMetadata.push(addMetadata);
    });
  }

  // invoke by addEventDialog()
  saveEvent(data): void {
    this.sensorService.saveEvent(data.eventData).subscribe((response) => {
      // if buildingId equals the current one, or it's an global event
      if (data.eventData.buildingId === this.selectedBuilding.id || data.eventData.buildingId === 'GLOBAL') {
        // assign value to start 
        const start = new Date(data.eventData.startDate);
        // create a new number variable endtime
        let endtime: number;
        // if the endDate exists, assign it to the end time
        if (data.eventData.endDate) {
          const end = new Date(data.eventData.endDate);
          endtime = end.getTime();
        // else assign the start time to the end time
        } else {
          endtime = start.getTime();
        }
        // push the object into the events array
        this.events.push({
          id: data.eventData.title,
          color: 'rgba(255,0,0,0.5)',
          from: start.getTime() - 14400000,
          to: endtime - 14400000,
          events: this.plotBandEvents,
          description: data.eventData.description,
          cluster: data.cluster,
          that: this
        });
        this.updateFromInput = true;
      }
    });
  }

  updateEvent(data): void{
    this.sensorService.updateEvent(data.eventData).subscribe(() => this.updateFromInput = true);
  }

  updateMetadata(data): void{
    const updMetadata: AdditionalMetadata = {
      id: data.id,
      title: data.metaTitle,
      description: data.metaDescription,
      sensorId: this.sensorData.sensor1.sensorMeta._id
    };
    this.sensorService.updateMetadata(updMetadata).subscribe(() => this.updateFromInput = true);
  }

  deleteMetadata(): void{
    const delTitle: string = this.selectedMeta.title;
    console.log( 'delete meta' + delTitle);
    this.sensorService.deleteMeta(delTitle).subscribe(() =>
    this.updateFromInput = true);
  }

  deleteEvent(): void {
    let i: number;
    for ( i = 0; i < this.events.length - 1; i++) {
      if ( this.events[i].title === this.eventData.title) {
        this.events.splice(i, 1);
      }
    }   
    for ( i = 0; i < this.events.length - 1; i++) {
      console.log(this.events[i].title);
    }
    const delTitle: string = this.eventData.title;
    this.sensorService.deleteEvent(delTitle).subscribe(() =>
    this.updateFromInput = true);
  }

  selectEvent(data) {
    const startDate = new Date(data.from);
    let endDate = null
    if (data.to && data.to !== data.from) {
      endDate = new Date(data.to);
    }
    this.eventData = {
      id: data.id,
      title: data.title,
      description: data.description,
      start: startDate,
      end: endDate,
      buildingId: data.buildingId,
      cluster: data.cluster,
    };
  }

  selectMeta(data) {
    this.selectedMeta = {
      id: data.id,
      title: data.title,
      description: data.description,
      sensorId: data.sensorId
    }
  }
  */
}
