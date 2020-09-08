import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import * as moment from 'moment';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']
})
export class EditEventComponent implements OnInit {


  public buildings = [];
  public clusters = ['1101'];
  public Category = ['category A', 'category B', 'category C'];
  
  @Input() public eventId;
  @Input() public eventTitle;
  @Input() public eventDescription;
  @Input() public startDate: Date;
  @Input() public endDate: Date;
  @Input() public selectedCluster;
  @Input() public isGlobal;
  @Input() public eventCategory;

  public eventstart;
  public eventend;
  validateForm: FormGroup;

  constructor(private modal: NzModalRef, private fb: FormBuilder) {
    this.validateForm = this.fb.group({
      eventTitle: [''],
      eventDescription: [''],
      startDate: [null],
      endDate: [null],
      selectedCluster: [''],
      isGlobal: [false],
      eventCategory:['']
    });
   }

  ngOnInit() {
    this.eventstart = moment(this.startDate).format('YYYY-MM-DD HH:mm:ss');
    this.eventend = moment(this.endDate).format('YYYY-MM-DD HH:mm:ss');
    console.log('start Date ' + this.eventstart);
    console.log('end Date ' + this.eventend);
  }

  submitForm(value: { eventTitle: string; eventDescription: string; startDate: Date; endDate: Date, clusterId: string, isGlobal: boolean, category: string }): void {
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();
    }

    if (this.validateForm.value.eventTitle == ''){
      this.validateForm.value.eventTitle = this.eventTitle;
    }
    if (this.validateForm.value.eventDescription == ''){
      this.validateForm.value.eventDescription = this.eventDescription;
    }
    if (this.validateForm.value.startDate == null){
      this.validateForm.value.startDate = this.startDate;
    } 
    if (this.validateForm.value.endDate == null){
      this.validateForm.value.endDate = this.endDate;
    } 
    if (this.validateForm.value.selectedCluster == ''){
      this.validateForm.value.selectedCluster = this.selectedCluster;
    }
    if (this.validateForm.value.eventCategory == ''){
      this.validateForm.value.eventCategory = this.eventCategory;
    } 
    if (this.validateForm.value.isGlobal == ''){
      this.validateForm.value.isGlobal = this.isGlobal;
    }

    
    const data = {eventId: this.eventId,
                  eventTitle: this.validateForm.value.eventTitle, 
                  eventDescription: this.validateForm.value.eventDescription, 
                  startDate: this.validateForm.value.startDate, 
                  endDate: this.validateForm.value.endDate,
                  clusterId: this.validateForm.value.clusterId,
                  isGlobal: this.validateForm.value.isGlobal,
                  category: this.validateForm.value.category,
                };
    
    console.log('event edit title: ' + data.eventTitle + 'desc ' + data.eventDescription + 'end' + data.endDate );
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
