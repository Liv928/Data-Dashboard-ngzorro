import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import {AdditionalMetadata} from '../model/additional-metadata';
import {Event} from '../model/event';

@Injectable({
  providedIn: 'root'
})
export class SensorService {
  private apiURL = 'http://localhost:8080/api/';
  constructor(private httpClient: HttpClient) { }

  // get building list 
  public getBuildings(): Observable<any> {
    return this.httpClient.get(this.apiURL + 'buildings');
  }

  // get the sensor list of a building
  public getSensorsByBuilding(buildingID: string): Observable<any> {
    console.log("buiding id: " + buildingID);
    return this.httpClient.get(this.apiURL + 'sensors/building/' + buildingID);
  }

  // get all sensor data in a date range specified by sensorMeta
  public getAllSensorData(sensorID: string): Observable<any> {
    return this.httpClient.get(this.apiURL + 'logs/data/all/' + sensorID);
  }

  // get the cluster list of a building
  public getClusters(buildingID: string): Observable<any> {
    return this.httpClient.get(this.apiURL + 'buildings/clusters/' + buildingID);
  }

  // get Events list of a building
  public getEvents(buildingId: string, sensorId: string): Observable<any> {
    return this.httpClient.get(this.apiURL + 'events/get?buildingid=' + buildingId + '&sensorid=' + sensorId);
  }

  // add function
  public saveEvent(data: Event): Observable<any> {
    console.log('data: '+ data.title);
    return this.httpClient.post<Event>(this.apiURL + 'events/add', data);
  }

  public saveAdditionalMetadata(data: AdditionalMetadata): Observable<any> {
    return this.httpClient.post<AdditionalMetadata>(this.apiURL + 'sensors/sensor/addmetadata', data);
  }

  // delete function
  public deleteEvent(title: string): Observable<any> {
    return this.httpClient.delete(this.apiURL + 'events/delete?title=' + title);
  }

  public deleteMeta(title: string): Observable<any> { 
    return this.httpClient.delete(this.apiURL + 'sensors/sensor/deletemetadata?title=' + title);
  }

  // edit function
  public updateMetadata(data: AdditionalMetadata): Observable<any> {
    return this.httpClient.post<AdditionalMetadata>(this.apiURL + 'sensors/sensor/updatemetadata', data);
  }

  public updateEvent(data: Event): Observable<any> {
    return this.httpClient.post<Event>(this.apiURL + 'events/update', data);
  }
}
