import { Component, OnInit } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Observable, Observer } from 'rxjs';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';

@Component({
  selector: 'app-add-metadata',
  templateUrl: './add-metadata.component.html',
  styleUrls: ['./add-metadata.component.css']
})
export class AddMetadataComponent implements OnInit {
  public metaTitle = '';
  public metaDescription = '';
  public metaDate;
  public metaComment = '';
  
  addMetaForm: FormGroup;

  constructor(private modal: NzModalRef, private fb: FormBuilder) {
    this.addMetaForm = this.fb.group({
      metaTitle: ['', [Validators.required]],
      metaDescription: ['', [Validators.required]],
    });
    
   }

   ngOnInit (){
  }

   submitForm(value: { title: string; desc: string}): void {
     
    for (const key in this.addMetaForm.controls) {
      this.addMetaForm.controls[key].markAsDirty();
      this.addMetaForm.controls[key].updateValueAndValidity();
    }
    console.log('submit title1: ' + value.title);
    console.log('submit title2: ' + this.addMetaForm.value.metaTitle);
    const data = {metaTitle: this.addMetaForm.value.metaTitle, metaDescription: this.addMetaForm.value.metaDescription};
    this.modal.destroy(data);
  }

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.addMetaForm.reset();
    for (const key in this.addMetaForm.controls) {
      this.addMetaForm.controls[key].markAsPristine();
      this.addMetaForm.controls[key].updateValueAndValidity();
    }
  }

  close(): void {
    this.modal.destroy();
  }


}
