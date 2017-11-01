export class UserInformation{
  public fname: string;
  public mname: string;
  public lname: string;
  public address: string;
  public contactNumber: number;
  public aptNumber:string;
  public address1: string;
  public  altContact: number;
  public email: string;
  public userType: string;


  constructor(fname: string, mname: string, lname: string, address: string, contactNumber: number, aptNumber: string, address1: string, altContact: number, email: string, userType: string) {
    this.fname = fname;
    this.mname = mname;
    this.lname = lname;
    this.address = address;
    this.contactNumber = contactNumber;
    this.aptNumber = aptNumber;
    this.address1 = address1;
    this.altContact = altContact;
    this.email = email;
    this.userType = userType;
  }


}
