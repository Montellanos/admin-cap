export class User {
  uid: string;
  displayName: string;
  email: string;
  phoneNumber: string;
  photoURL: string;
  roles: any;
  date : any;
  state : boolean;

  constructor(newUser) {
    this.displayName = newUser.displayName;
    this.email = newUser.email;
    this.phoneNumber = newUser.phoneNumber;
    this.photoURL = '';
    this.roles = newUser.roles;
  }




}
