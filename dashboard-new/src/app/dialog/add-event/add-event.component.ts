import { Component, OnInit } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {

  public buildings = [];
  public clusters = ['test A'];
  public eventCategory = ['category A', 'category B', 'category C'];
  
  public eventTitle = '';
  public eventDescription = '';
  public startDate: Date;
  public endDate: Date;
  public selectedBuilding;
  public selectedCluster = null;
  public isGlobal: number;

  validateForm: FormGroup;

  constructor(private modal: NzModalRef, private fb: FormBuilder) {
    this.validateForm = this.fb.group({
      eventTitle: ['', [Validators.required]],
      eventDescription: ['', [Validators.required]],
      startDate: [null, [Validators.required]],
      endDate: [null],
      clusterId: [null],
      isGlobal: [false, [Validators.required]],
      category:['']
    });
   }

  ngOnInit() {
  }

  close(): void {
    this.modal.destroy();
  }

  submitForm(value: { eventTitle: string; eventDescription: string; startDate: Date; endDate: Date, clusterId: string, isGlobal: boolean, category: string }): void {
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();
    }
    console.log(value);
  
    const data = {eventTitle: value.eventTitle, 
                  eventDescription: value.eventDescription, 
                  startDate: value.startDate, 
                  endDate: value.endDate,
                  clusterId: value.clusterId,
                  isGlobal: value.isGlobal,
                  category: value.category,
                };
    
    console.log('value global: ' + value.isGlobal + 'cluster: ' + value.clusterId);
    this.modal.destroy(data);
  }

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.validateForm.reset();
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsPristine();
      this.validateForm.controls[key].updateValueAndValidity();
    }
  }

}
