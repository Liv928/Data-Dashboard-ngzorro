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
  
  public eventTitle = '';
  public eventDescription = '';
  public startDate: Date;
  public endDate: Date;
  public selectedBuilding;
  public selectedCluster = null;
  public isGlobal = false;

  validateForm: FormGroup;

  constructor(private modal: NzModalRef, private fb: FormBuilder) {
    this.validateForm = this.fb.group({
      eventTitle: ['', [Validators.required]],
      eventDescription: ['', [Validators.required]],
      startDate: [null, [Validators.required]],
      endDate: [null],
      cluster: [''],
      isglobal: [Boolean, [Validators.required]]
    });
   }

  ngOnInit() {
  }

  close(): void {
    this.modal.destroy();
  }

  submitForm(value: { eventTitle: string; eventDescription: string; startDate: Date; endDate: Date, cluster: string }): void {
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();
    }
    console.log(value);
    console.log('g: ' + this.isGlobal + 'cluster: ' + this.selectedCluster);
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
