import { Component, NgModule, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import StockModule from 'highcharts/modules/stock';

import { NzModalService } from 'ng-zorro-antd/modal';


import {Event} from '../../model/event';
import {AdditionalMetadata} from '../../model/additional-metadata';
import { SensorService } from '../../services/sensor.service';

import {AddSensorsComponent} from '../../dialog/add-sensors/add-sensors.component';
import {AddEventComponent} from '../../dialog/add-event/add-event.component';
import {DeleteEventComponent} from '../../dialog/delete-event/delete-event.component';
import {EditEventComponent} from '../../dialog/edit-event/edit-event.component';
import {AddMetadataComponent} from '../../dialog/add-metadata/add-metadata.component';
import {DeleteMetadataComponent} from '../../dialog/delete-metadata/delete-metadata.component';
import {EditMetadataComponent} from '../../dialog/edit-metadata/edit-metadata.component';
import { ResourceLoader } from '@angular/compiler';


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
  
  public charts = [{chartName:'Scatter Plot'},
                    {chartName:'Line Chart'}];
  public isCollapsed = false;
  public Highcharts = Highcharts;
  public updateFromInput = true;

  public selectedChart = {chartName:'Line Chart'};
  public chartOption;  // chart option choosed by user
  public chartOption_line;
  public chartOption_scatter;
  
  public sensors: [];
  public selectedSensor = {id:''};
  
  public sensorData;
  public seriesData: [];
  public timestamps = [];
  public data = []; // data used on the chart

  public events = [];
  public selectedEvent: Event;
  public eventOnChart = [];
  
  public additionalMetadata: AdditionalMetadata[] = [];
  public selectedMeta: AdditionalMetadata;

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

  constructor(private sensorService: SensorService, private modalService: NzModalService, private modal: NzModalService) { }

  ngOnInit(){
    this.sensorService.getSensorsByBuilding(this.buildingID).subscribe((data) => {
      this.sensors = data;
    });
    this.chartOption_line = {
  
      title: {text: 'Sensor Data'},
      series: [{
        name: '',
        tooltip: {
          valueDecimals: 2,
          pointFormat: '{point.x:%m-%d}: {point.y:.2f} °C'
        },
        data:this.data
      }],
      yAxis: {
        title: {text:'Celsius'}
      },
      xAxis: {
        type: 'datetime',
        dateTimeLabelFormats: {
          week: '%Y-%m-%d'
        },
        plotBands: [{
          from: Date.UTC(2016, 10, 27),
          to: Date.UTC(2016, 11, 1),
          color: '#EFFFFF',
          label: {
            text: '<em>Events:</em><br> test date',
            style: {
              color: '#999999'
            },
            y: 180
          }
        }, {
          from: Date.UTC(2016, 11, 1),
          to: Date.UTC(2017, 1, 1),
          color: '#FFFFEF',
          label: {
            text: '<em>Events:</em><br> wssb events',
            style: {
              color: '#999999'
            },
            y: 30
          }
        }, {
          from: Date.UTC(2017, 1, 1),
          to: Date.UTC(2017, 10, 27),
          color: '#FFEFFF',
          label: {
            text: '<em>Events:</em><br> summer events',
            style: {
              color: '#999999'
            },
            y: 30
          }
        }]
      }
    };
    /*
    this.chartOption_scatter = {
      chart: {
        type: 'scatter',
        zoomType: 'xy'
      },
      legend: {
        layout: 'vertical',
        align: 'left',
        verticalAlign: 'middle',
        itemHoverStyle: {
          color: 'red',
        }
      },
      title: {text: 'Temperature Sensor Data'},
      series: [{
        color: 'rgb(233,83,83)',
        name: '',
        tooltip: {
          valueDecimals: 2
        },
        data:this.datapoint
      }],
      yAxis: {

        title: {text:'Degrees Celsius'}
      },
      xAxis: {
        categories: this.timestamps,
        type: 'date',
        dateTimeLabelFormats: {
            day:'%b.%e'
        },
        TickInterval: 1 
      },
      plotOptions: {
        scatter: {
          marker: {
            radius: 5,
            states: {
              hover: {
                enabled: true,
                lineColor: 'rgb(250,100,100)'
              }
            }
          },
          states: {
            hover: {
              marker: {
                enabled: false
              }
            }
          },
          tooltip: {
            headerFormat: '<b>{series.name}</b><br>',
            pointFormat: '{point.x} date, {point.y} degree'
          }
        }
      },
    };
    this.chartOption = this.chartOption_scatter;*/
  };


  selectSensor(value: { id: string}): void {
    this.sensorService.getAllSensorData(value.id).subscribe((data) => {
      this.additionalMetadata = [];
      this.events.length = 0;
      /*
      this.eventData = null;*/
      this.sensorData = data.sensor.data;
      this.seriesData = JSON.parse(data.data);
    
      for (let i =0; i<this.seriesData.length; i++){
        var tempDate = new Date(this.seriesData[i][0]);
        var tms = Date.UTC(tempDate.getUTCFullYear(),tempDate.getMonth(),tempDate.getDate(),tempDate.getHours(),tempDate.getMinutes());
        this.data.push([tms,this.seriesData[i][1]]);
      }
      
      for (const item of data.additionalMetadata) {
        this.additionalMetadata.push(item);
      }
      for (const item of data.events) {
        this.addEvent(item);
      }
      for (const item of this.eventOnChart){
        console.log('event: ' + item.from);
      }
      this.updateFromInput = true;
    });
  }

  selectChart(value: {chartName: string}): void {
    console.log('select: ' + value.chartName);
    if (value.chartName == 'Scatter Plot'){
      this.chartOption = this.chartOption_scatter;
      this.updateFromInput = true;
    } else if (value.chartName == 'Line Chart'){
      this.chartOption = this.chartOption_line;
      this.updateFromInput = true;
    }
  }

  // helper function to push events into events lis
  addEvent(data): void {
    const start = new Date(data.startDate);
    let starttime: number;
    let endtime: number;
    let end: Date;
    starttime = start.getTime();
    if (data.endDate) {
      end = new Date(data.endDate);
      endtime = end.getTime();
    } else {
      endtime = start.getTime();
      end = start;
    }
    if (endtime != starttime ){
      console.log("here");
      this.eventOnChart.push(
        {
          from: start,
          to: end,
          color: '#EFFFFF',
          label: {
            text: data.title,
            style: {
              color: '#999999'
            },
            y: 180
          }
        }
      );
    }
    

    this.events.push({
      id: data.id,
      title: data.title,
      description: data.description,
      cluster: data.cluster,
      from: start,
      to: end,
      that: this,
      color: 'rgba(255,0,0,0.5)',
      events: this.plotBandEvents, 
    });
    this.updateFromInput = true;
  }

  selectMeta(data) {
    this.selectedMeta = {
      id: data.id,
      title: data.title,
      description: data.description,
      sensorId: data.sensorId
    }
  }

  selectEvent(data) {
    const start = new Date(data.from);
    let end = null;
    if (data.to && data.to !== data.from) {
      end = new Date(data.to);
    }
    this.selectedEvent = {
      id: data.id,
      title: data.title,
      description: data.description,
      startDate: start,
      endDate: end,
      buildingId: data.buildingId,
      clusterId: data.clusterId,
      isGlobal: data.isGlobal,
      category: data.category
    };
  }

  editMetaDialog(): void {

  }

  deleteMetaConfirm(deleteMeta): void {
    this.modal.confirm({
      nzTitle: 'Are you sure to delete this Metadata ?',
      nzContent: '<b></b>',
      nzOkText: 'Confirm',
      nzOkType: 'danger',
      nzOnOk: () => {this.sensorService.deleteMeta(deleteMeta.id).subscribe((response) => {
                      this.additionalMetadata = this.additionalMetadata.filter(item => item !== deleteMeta);
                      })
                    }
    });
  }

  addMetaDialog(): void {
    const modalRef = this.modalService.create({
      nzTitle: 'Add Additional Metadata',
      nzContent: AddMetadataComponent,
    });

    modalRef.afterClose.subscribe(
      result =>{
        modalRef.close();
        if (result) {
          const addMetadata: AdditionalMetadata = {
            id: null,
            title: result.metaTitle,
            description: result.metaDescription,
            sensorId: this.selectedSensor.id
          };
          this.sensorService.saveAdditionalMetadata(addMetadata).subscribe((response) => {
            this.additionalMetadata.push(addMetadata);
          });
        }
      }
    )
  }

  editEventDialog(): void {

  }

  deleteEventDialog(): void {
    const modalRef = this.modalService.create({
      nzTitle: 'Delete this Evnet',
      nzContent: DeleteEventComponent,
      nzComponentParams: { deleteEvent: this.selectedEvent},
    });
    modalRef.afterClose.subscribe(
      result =>{
        if (result){
          this.sensorService.deleteEvent(this.selectedEvent.id).subscribe((response) => {
            this.events = this.events.filter(item => item !== this.selectedEvent);
          });
        }
      }
    );
  }

  addEventDialog(): void {
    const modalRef = this.modalService.create({
      nzTitle: 'Add Evnet',
      nzContent: AddEventComponent
    });
    modalRef.afterClose.subscribe(
      result => {
        console.log('here');
        modalRef.close();
        if (result) {
          const addEvent: Event = {
            id: null,
            title: result.eventTitle,
            description: result.eventDescription,
            startDate: result.startDate,
            endDate: result.endDate,
            buildingId: this.buildingID,
            clusterId: result.clusterId,
            isGlobal: result.isGlobal,
            category: result.category
          };
          console.log('result: ' + addEvent.isGlobal);
          this.sensorService.saveEvent(addEvent).subscribe((response) => {
            this.events.push(addEvent);
          });
        }
      }
    )
  }

  deleteEventConfirm(deleteEvent): void {
    this.modal.confirm({
      nzTitle: 'Are you sure to delete this event ?',
      nzContent: '<b></b>',
      nzOkText: 'Confirm',
      nzOkType: 'danger',
      nzOnOk: () => {this.sensorService.deleteEvent(deleteEvent.id).subscribe((response) => {
                      this.events = this.events.filter(item => item !== deleteEvent);
                      })
                    }
    });
  }


}
