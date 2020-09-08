import { Component, NgModule, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import StockModule from 'highcharts/modules/stock';
import HighchartsMore from 'highcharts/highcharts-more';

import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';


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


HighchartsMore(Highcharts)

@Component({
  selector: 'app-msb',
  templateUrl: './msb.component.html',
  styleUrls: ['./msb.component.css']
})
export class MsbComponent implements OnInit {

  public buildingID = 'MSB';
  
  public isCollapsed = false;
  public Highcharts = Highcharts;
  public chartConstructor='';
  public updateFromInput = true;

  public chartOption;  // chart option choosed by user
  public chartOption_line;
  public chartOption_circular;
  public selectedChart = { label: 'Line Chart', constructor: 'stockChart', chartoption: this.chartOption_line};
  public charts =  [{ label: 'Line', constructor: 'stockChart', chartoption: this.chartOption_line },
                    { label: 'Circular Chart', constructor: '', chartoption: this.chartOption_circular }];

  public sensors: [];
  public selectedSensor = {id:''};
  
  public sensorData;
  public seriesData: [];
  public timestamps = [];
  public data_line = []; // data used in the line chart
  public data_circular_A = []; // data used in the circular chart
  public data_circular_B = [];
  public data_circular_C = [];

  public events = [];
  public selectedEvent: Event;
  public eventOnChart = [];
  public evt_y=75;
  
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

  constructor(private sensorService: SensorService, private modalService: NzModalService, 
              private modal: NzModalService, private message: NzMessageService) { }

  ngOnInit(){
    this.sensorService.getSensorsByBuilding(this.buildingID).subscribe((data) => {
      this.sensors = data;
    });
    this.chartOption_line = {
      chart:{
      },
      plotOptions: {
      },
      title: {text: 'Sensor Data'},
      series: [{
        name: '',
        tooltip: {
          valueDecimals: 2,
          pointFormat: '{point.x:%m-%d}: {point.y:.2f} °C'
        },
        data:this.data_line
      }],
      yAxis: {
        title: {text:'Celsius'}
      },
      xAxis: {
        type: 'datetime',
        dateTimeLabelFormats: {
          week: '%Y-%m-%d'
        },
        plotBands: this.eventOnChart,
      }
    };

    this.chartOption_circular = {
      chart: {
        polar: true,
      },
      title: {
        text: 'Event Statistics for Sensor Data'
      },
      pane: {
        startAngle: 0,
        endAngle: 360
      },
      // the angle indicates the event time in a day
      xAxis: {
        tickInterval: 30,
        min: 0,
        max: 360,
        labels: {
          formatter: function () {
            return (this.value/30)*2 + ':00';
          }
        }
      },
      // the radius indicates the day event happened in a year 
      yAxis: {
        min: 0,
        max: 365 
      },
      plotOptions: {
        series: {
          pointStart: 0,
          pointInterval: 45
        },
        column: {
          pointPadding: 0,
          groupPadding: 0
        }
      },
      series: [{
        type: 'scatter',
        name: 'Event A',
        color: '#DC143C',
        data: this.data_circular_A
      },
      {
        type: 'scatter',
        name: 'Event B',
        color: '#FFD700',
        data: this.data_circular_B
      },
      {
        type: 'scatter',
        name: 'Event C',
        color: '#00BFFF',
        data: this.data_circular_C
      }, ]
    }
  };


  selectSensor(value: { id: string}): void {
    this.sensorService.getAllSensorData(value.id).subscribe((data) => {
      this.additionalMetadata = [];
      this.events.length = 0;
      this.sensorData = data.sensor.data;
      this.seriesData = JSON.parse(data.data);
    
      for (let i =0; i<this.seriesData.length; i++){
        var tempDate = new Date(this.seriesData[i][0]);
        var tms = Date.UTC(tempDate.getUTCFullYear(),tempDate.getMonth(),tempDate.getDate(),tempDate.getHours(),tempDate.getMinutes());
        this.data_line.push([tms,this.seriesData[i][1]]);
      }

      for (const item of data.additionalMetadata) {
        this.additionalMetadata.push(item);
      }
      for (const item of data.events) {
        this.addEvent(item);
        this.evt_y = this.evt_y - 15;
        if (this.evt_y == 0){
          this.evt_y = 75;
        }
      }
      
      this.updateFromInput = true;
    });
  }

  selectChart(value: {chartName: string}): void {
   
  }

  // helper function to push events into events list
  addEvent(data): void {
    const start = new Date(data.startDate);
    console.log('cat: '+ data.category);
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
    const dateArr = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
    const day = start.getDate();
    const month = start.getMonth(); // getMonth() starts from 0
    const year = start.getFullYear();
    const hour = start.getHours();
    const minute = start.getMinutes();
    const second = start.getSeconds();
    let circular_y = 0;
    let circular_x = 0;
    let seconds = (hour * 3600 + minute * 60 + second)/86400;
    circular_x = Math.round(seconds * 360);
    for ( let i = 0; i < month; i++) {
      circular_y += dateArr[i];
    }
    circular_y += day;
    // check if it is Leap year
    if (month > 1 && (year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
      circular_y += 1;
    }
    if (data.category =='category A'){
      console.log('a here ' + circular_y +' '+ circular_x)
      this.data_circular_A.push([circular_x, circular_y]);
    }
    if (data.category =='category B'){
      this.data_circular_B.push([circular_x, circular_y]);
    }
    if (data.category =='category C'){
      this.data_circular_C.push([circular_x, circular_y]);
    }

    if (endtime != starttime ){
      const start_utc  = Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate(),
      start.getUTCHours(), start.getUTCMinutes(), start.getUTCSeconds());

      const end_utc = Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate(),
      end.getUTCHours(), end.getUTCMinutes(), end.getUTCSeconds());

      function randomHexColor() {
        const eventColor: string[] = ['#EFFFFF', '#FFFFEF', '#FFEFFF'];
        var index = Math.floor((Math.random() * eventColor.length));
        return eventColor[index];
      }

      const bandColor = randomHexColor(); // generate random color
      this.eventOnChart.push(
        {
          from: start_utc,
          to: end_utc,
          color: bandColor,
          label: {
            text: data.title,
            style: {
              color: '#999999'
            },
            y: this.evt_y
          }
        }
      );
    }
    let eventToAdd: Event;  
    eventToAdd = {
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
    this.events.push(eventToAdd);
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

  editMetaDialog(metadata): void {
    console.log('edit id '+ metadata.id);
    const modalRef = this.modalService.create({
      nzTitle: 'Edit Metadata',
      nzContent: EditMetadataComponent,
      nzComponentParams: {metaId: metadata.id, metaTitle: metadata.title, metaDescription: metadata.description},
    });

    modalRef.afterClose.subscribe(
      result =>{
        modalRef.close();
        if (result) {
          const updateMetadata: AdditionalMetadata = {
            id: result.metaId,
            title: result.metaTitle,
            description: result.metaDescription,
            sensorId: this.selectedSensor.id
          };
          this.sensorService.updateMetadata(updateMetadata).subscribe((response) => {
          });
        }
      }
    )
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

  editEventDialog(event): void {
    const modalRef = this.modalService.create({
      nzTitle: 'Eidt Event',
      nzContent: EditEventComponent,
      nzComponentParams:{ eventId: event.id,
                          eventTitle: event.title,
                          eventDescription: event.description,
                          startDate: event.startDate,
                          endDate:event.endDate,
                          selectedCluster: event.clusterId,
                          isGlobal: event.isGlobal,
                          eventCategory:event.category},
    });
    
    modalRef.afterClose.subscribe(
      result => {
        modalRef.close();
        if (result) {
          const updateEvent: Event = {
            id: result.eventId,
            title: result.eventTitle,
            description: result.eventDescription,
            startDate: result.startDate,
            endDate: result.endDate,
            buildingId: this.buildingID,
            clusterId: result.clusterId,
            isGlobal: result.isGlobal,
            category: result.category
          };
          console.log('update: ' + updateEvent.description);
          this.sensorService.updateEvent(updateEvent).subscribe((response) => {
          });
        }
      }
    )
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
