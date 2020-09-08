import { Component, OnInit, Input } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-metadata',
  templateUrl: './edit-metadata.component.html',
  styleUrls: ['./edit-metadata.component.css']
})
export class EditMetadataComponent implements OnInit {
  @Input() public metaId;
  @Input() public metaTitle;
  @Input() public metaDescription;
  
  editMetaForm: FormGroup;

  constructor(private modal: NzModalRef, private fb: FormBuilder) {
    this.editMetaForm = this.fb.group({
      metaTitle: [''],
      metaDescription: [''],
    });
   }

  ngOnInit() {
  }
  submitForm(value: { title: string; desc: string}): void {
    for (const key in this.editMetaForm.controls) {
        this.editMetaForm.controls[key].markAsDirty();
        this.editMetaForm.controls[key].updateValueAndValidity();
    }
    
    if (this.editMetaForm.value.metaTitle == ''){
      this.editMetaForm.value.metaTitle = this.metaTitle;
    }
    if (this.editMetaForm.value.metaDescription == ''){
      this.editMetaForm.value.metaDescription = this.metaDescription;
    }

    const data = {metaId: this.metaId, 
                  metaTitle: this.editMetaForm.value.metaTitle, 
                  metaDescription: this.editMetaForm.value.metaDescription};
    console.log('edit '+ data.metaTitle);
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
