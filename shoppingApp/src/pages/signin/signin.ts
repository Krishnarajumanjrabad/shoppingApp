import {Component} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {HomePage} from "../../pages/home/home";
import {AuthenicateServiceProvider} from "../../providers/authenicate-service/authenicate-service";

/**
 * Generated class for the SigninPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component( {
  selector: 'page-signin',
  templateUrl: 'signin.html',
} )
export class SigninPage {
  signupForm: any;
  fname: string;
  mname: string;
  lname: string;
  password: string;
  confirmPassword: string;
  address: string;
  contactNumber: string;
  email: string;
  errorAlert: any;
  userType: string = "regular";
  errorMessage: string = "User is already Exist in the system";
  signUpMessage: string = "Registration is complete to Activate, please follow the registered email";
  signAlert: any;

  constructor(public navCtrl: NavController, public fb: FormBuilder, public navParams: NavParams, public auth: AuthenicateServiceProvider, public alert: AlertController) {

    this.signupForm = fb.group( {
      'password': ['', [Validators.required, Validators.minLength( 8 )]],
      'confirmPassword': ['', [Validators.required, Validators.minLength( 8 )]],
      'fname': ['', Validators.required],
      'mname': [''],
      'lname': ['', Validators.required],
      'address': ['', Validators.required],
      'contactNumber': ['', Validators.required],
      'email': ['', [Validators.required, Validators.pattern( '[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$' )]],
      "userType": ['']
    } );


    this.password = this.signupForm.controls['password'];
    this.fname = this.signupForm.controls['fname'];
    this.mname = this.signupForm.controls['mname'];
    this.lname = this.signupForm.controls['lname'];
    this.confirmPassword = this.signupForm.controls['confirmPassword'];
    this.address = this.signupForm.controls['address'];
    this.contactNumber = this.signupForm.controls['contactNumber'];
    this.email = this.signupForm.controls['email'];
    this.userType = this.signupForm.controls['userType'];
  }

  ionViewDidLoad() {
    console.log( 'ionViewDidLoad SigninPage' );
  }

  checkConfirmPasswordValidator(password, confirmPassword) {

    if (password != null && confirmPassword != null) {

      if (JSON.stringify( password ) == JSON.stringify( confirmPassword )) {
        return true;
      } else {
        return false;
      }
    }

  }

  login(formValue) {

  }

  signUp(formValue) {
    console.log( 'inside the signup method' );
    if (formValue)
      this.auth.adduser( formValue ).then( (result) => {
        console.log("sign in results");
        console.log( result );
        this.showAlert();
        this.navCtrl.setRoot( "HomePage", result ).then(data =>{
          this.navCtrl.popToRoot();
        });
      } );

  }


  private showAlert() {
    this.errorAlert = this.alert.create( {
      title: 'New User is created to RashiEWaste',
      message: 'Thank You for the registration to RashiEWaste',
      buttons: [
        {
          text: "Ok",
          handler: data => {
            console.log( 'Save Clicked' );
          }
        }
      ]
    } );
    this.errorAlert.present();
  }

}
