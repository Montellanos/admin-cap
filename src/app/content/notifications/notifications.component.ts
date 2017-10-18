import { NotificationsService } from './../../series/services/notifications.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  not_title = '';
  not_body = '';
  not_topic = '';
  loading = false;
  message: string;

  constructor(private notService: NotificationsService) { }

  ngOnInit() {
  }

  sendNotification() {
    this.loading = true;
    this.notService.sendNotification(this.not_title, this.not_body, this.not_topic).then(res => {
      console.log(res);
    });
  }


}
