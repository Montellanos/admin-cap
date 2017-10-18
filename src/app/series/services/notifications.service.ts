import { AngularFireDatabase } from 'angularfire2/database';
import { Headers } from '@angular/http';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class NotificationsService {

  private NOTIFICATIONS_NODE = 'notifications';

  constructor(private http: Http, private db: AngularFireDatabase) { }


  sendNotification(not_title: string, not_body: string, not_topic: string): any {
    const data = {
      title : not_title,
      body : not_body,
      topic : not_topic
    };
    return this.db.list(this.NOTIFICATIONS_NODE).push(data);


    /*
    let topic = '/topics/general';
    let icon = './assets/icons/android-chrome-72x72.png';
    let url = 'https://fcm.googleapis.com/fcm/send';
    let action = 'https://comprastarija.online';
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization' : 'key=AAAA5PhW2D4:APA91bHBnLJahMUU8pXNpbQh-S3y-HVW5F2zNsa_BGb0zEodZb9GfZyFP_Nbq8BUm6YPalbsVs_9tMlghcc-4qNnKJi6GioU-OApKOZiN0-9L-A1M5ihSXSjSfLtz0KiMxDs4eRc8msu'
    });
    let options = {
      'notification' : {
        'title' : not_title,
        'body' : not_body,
        'icon' : icon,
        'click_action' : action,
        'image' : './assets/icons/android-chrome-72x72.png'
      },
      'to' : topic
    }

    return this.http.post(url, options, {headers : headers});*/
  }

}
