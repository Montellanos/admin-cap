export class User {
  uid: string;
  displayName: string;
  email: string;
  phoneNumber: string;
  photoURL: string;
  roles: any;
  date: any;
  state: boolean;

  constructor(newUser) {
    this.displayName = newUser.name;
    this.email = newUser.email;
    this.phoneNumber = newUser.cellphone;
    this.photoURL = '';
    this.roles = {}
    this.roles[newUser.roles] = true;
    this.date = {};
    this.date['created_at'] = (new Date()).getTime();
    this.date['updated_at'] = (new Date()).getTime();
    this.state = true;
  }




}
