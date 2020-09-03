import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import StockModule from 'highcharts/modules/stock';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzMessageService } from 'ng-zorro-antd/message';
import { SensorService } from '../../services/sensor.service';


import {AdditionalMetadata} from '../../model/additional-metadata';
declare var BMap: any;

StockModule(Highcharts);

Highcharts.setOptions({
  title: {
    style: {
      color: 'black'
    }
  },
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
  public threshold;

  constructor(private message: NzMessageService, private sensorService: SensorService ) { }

 
  ngOnInit() {
    this.sensorService.getBuildings().subscribe((data) => {
      this.buildings = data;
    });
    this.chartOptions = {
      chart: {
          type: 'spline',
          marginRight: 10,
          events: {
              load: function () {
                  const series = this.series[0];
                  setInterval(function () {
                      const x = (new Date()).getTime(); // current time
                      const y = Math.round(Math.random() * 100);
                      if (y > 70){
                        this.message.create('warning', 'Abnormal Temperature Notification');
                      }
                      series.addPoint([x, y], true, true);
                  }, 1000);
              }
          }
      },
      title: {
          text: 'Live Random Data'
      },
      xAxis: {
          type: 'datetime',
          tickPixelInterval: 150
      },
      yAxis: {
          title: {
              text: null
          }
      },
      tooltip: {
          formatter: function () {
              return '<b>'  + '</b><br/>' +
                  Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                  Highcharts.numberFormat(this.y, 2);
          }
      },
      legend: {
          enabled: false
      },
      series: [{
          name: 'Random Data',
          data: (function () {
              // 生成随机值
              const data = [];
              const time = (new Date()).getTime();
              let i: number;
              for (i = -99; i <= 0; i += 1) {
                  data.push([time + i * 1000, Math.round(Math.random() * 100)] );
              }
          
              return data;
          }())
      }]
    }
    
  }

  activeLastPointToolip(chart): void {
    const points = chart.series[0].points;
    chart.tooltip.refresh(points[points.length - 1]);
  }

  createBasicMessage(): void {
    this.message.info('Abnormal Temperature Notification.');
  }


}
