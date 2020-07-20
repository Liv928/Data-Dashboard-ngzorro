import { Component, OnInit } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-metadata',
  templateUrl: './edit-metadata.component.html',
  styleUrls: ['./edit-metadata.component.css']
})
export class EditMetadataComponent implements OnInit {
  public metaTitle = '';
  public metaDescription = '';
  public metaDate;
  public metaComment = '';
  
  editMetaForm: FormGroup;
 
  
  constructor(private modal: NzModalRef,private fb: FormBuilder) {
    this.editMetaForm = this.fb.group({
      metaTitle: ['', [Validators.required]],
      metaDescription: ['', [Validators.required]],
    });
   }

  ngOnInit() {
  }
  submitForm(value: { title: string; desc: string}): void {
     
    for (const key in this.editMetaForm.controls) {
      this.editMetaForm.controls[key].markAsDirty();
      this.editMetaForm.controls[key].updateValueAndValidity();
    }
    
    const data = {metaTitle: this.editMetaForm.value.metaTitle, metaDescription: this.editMetaForm.value.metaDescription};
    this.modal.destroy(data);
  }

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.editMetaForm.reset();
    for (const key in this.editMetaForm.controls) {
      this.editMetaForm.controls[key].markAsPristine();
      this.editMetaForm.controls[key].updateValueAndValidity();
    }
  }

  destroyModal(): void {
    this.modal.destroy();
  }
 
}
