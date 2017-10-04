export class User {
  uid: string;
  displayName: string;
  email: string;
  phoneNumber: string;
  photoURL: string;
  roles: any;
  date: any;
  state: boolean;

  constructor(authData) {
    this.uid = authData.uid;
    this.displayName = authData.displayName;
    this.email = authData.email;
    this.photoURL = authData.photoURL;
    this.phoneNumber = authData.phoneNumber;
    this.roles = { editor: true };
    this.date.created_at = (new Date()).getTime();
    this.date.updated_at = (new Date()).getTime();
    this.state = true;
  }


}
