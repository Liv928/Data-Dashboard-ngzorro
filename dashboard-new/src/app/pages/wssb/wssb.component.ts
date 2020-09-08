import { Component, NgModule, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import StockModule from 'highcharts/modules/stock';

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
        plotBands: this.eventOnChart,
      }
    };
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

  // helper function to push events into events list
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
            y: 30
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
