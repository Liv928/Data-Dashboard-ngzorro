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

  public getBuildings(): Observable<any> {
    return this.httpClient.get(this.apiURL + 'buildings');
  }

  public getSensorsByBuilding(buildingID: string): Observable<any> {
    return this.httpClient.get(this.apiURL + 'sensors/building/' + buildingID);
  }

  public getAllSensorData(sensorID: string): Observable<any> {
    return this.httpClient.get(this.apiURL + 'logs/data/all/' + sensorID);
  }

  public saveAdditionalMetadata(data: AdditionalMetadata): Observable<any> {
    return this.httpClient.post<AdditionalMetadata>(this.apiURL + 'sensors/sensor/addmetadata', data);
  }

  public getClusters(buildingID: string): Observable<any> {
    return this.httpClient.get(this.apiURL + 'buildings/clusters/' + buildingID);
  }

  public saveEvent(data: Event): Observable<any> {
    return this.httpClient.post<Event>(this.apiURL + 'events/add', data);
  }

  public deleteEvent(title: string): Observable<any> {
    return this.httpClient.delete(this.apiURL + 'events/delete?title=' + title);
  }

  public deleteMeta(title: string): Observable<any> { 
    return this.httpClient.delete(this.apiURL + 'sensors/sensor/deletemetadata?title=' + title);
  }

  public getEvents(buildingId: string, sensorId: string): Observable<any> {
    return this.httpClient.get(this.apiURL + 'events/get?buildingid=' + buildingId + '&sensorid=' + sensorId);
  }

  public updateMetadata(data: AdditionalMetadata): Observable<any> {
    return this.httpClient.post<AdditionalMetadata>(this.apiURL + 'sensors/sensor/updatemetadata', data);
  }

  public updateEvent(data: Event): Observable<any> {
    return this.httpClient.post<Event>(this.apiURL + 'events/update', data);
  }
}
