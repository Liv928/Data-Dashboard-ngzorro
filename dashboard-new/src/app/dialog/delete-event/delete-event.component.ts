import { Component, OnInit} from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-delete-event',
  templateUrl: './delete-event.component.html',
  styleUrls: ['./delete-event.component.css']
})
export class DeleteEventComponent implements OnInit {
  public deleteEvent;
  public confirm = false;

  constructor(private modal: NzModalRef) {
    this.deleteEvent = this.modal.componentInstance.deleteEvent;
   }

  ngOnInit() {
  }

  close() {
    this.modal.destroy();
  }

  confirmDelete() {
    this.confirm = true;
    this.modal.destroy(this.confirm);
  }


}
