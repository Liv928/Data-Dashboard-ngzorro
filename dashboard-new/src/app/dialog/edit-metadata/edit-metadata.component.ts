import { Component, OnInit } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-edit-metadata',
  templateUrl: './edit-metadata.component.html',
  styleUrls: ['./edit-metadata.component.css']
})
export class EditMetadataComponent implements OnInit {
 
  
  constructor(private modal: NzModalRef) { }

  ngOnInit() {
  }

  destroyModal(): void {
    this.modal.destroy();
  }
 
}
