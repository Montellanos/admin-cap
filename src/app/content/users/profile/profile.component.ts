import { AngularFireDatabase } from 'angularfire2/database';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from './../../../series/services/users.service';
import { FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  selectedFiles: FileList;
  private key: string;
  uploading = false;
  constructor(private formBuild: FormBuilder, private userService: UsersService, private route: ActivatedRoute, private db : AngularFireDatabase, private router: Router) {
    route.params.forEach(param=>{
      this.key = param['$key']
    });
    console.log(this.key);
   }

  ngOnInit() {
  }

  upload() {
    this.uploading = true;
    this.userService.updateUserPhoto(this.key, [(<HTMLInputElement>document.getElementById('file')).files[0]]).subscribe(res=>{
      console.log(res);
      this.uploading = false;
    });


}

}

interface Image {
  path: string;
  filename: string;
  downloadURL?: string;
  $key?: string;
}
