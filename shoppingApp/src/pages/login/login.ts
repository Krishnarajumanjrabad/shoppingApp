import {
  AlertController,
  Events,
  IonicPage,
  LoadingController,
  NavController,
  ViewController
} from 'ionic-angular';
import {FormBuilder, Validators} from "@angular/forms";

import {AuthenicateServiceProvider} from "../../providers/authenicate-service/authenicate-service";
import {Component} from '@angular/core';
import {SigninPage} from "../signin/signin";
import {UserInformation} from "../../model/userInformation";
import {HomePage} from "../../pages/home/home";

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loginForm: any;
  email: string = "";
  password: string = "";
  users: any;
  errorMessage: string = "Invalid username or password";
  errorAlert: any;
  loading: any;
  userInfo: UserInformation = null;

  constructor(public evt: Events, public navCtrl: NavController, public fb: FormBuilder, public auth: AuthenicateServiceProvider, public loadingCrt: LoadingController, public alertCrt: AlertController, public popCrtl: ViewController) {
    console.log('Hello Login Page');
    //  this.email = window.localStorage.getItem("username");
    if (this.email == null) {
      this.email = " ";
    }
    // this.password = window.localStorage.getItem("password");
    if (this.password == null) {
      this.password = " ";
    }


    this.loginForm = fb.group({
      'email': [' ', Validators.required],
      'password': [' ', Validators.required]

    });

    this.email = this.loginForm.controls['email'];
    this.password = this.loginForm.controls['password'];

  }


  signIn() {
    console.log('button is clicked');
    this.navCtrl.push(SigninPage);
  }

  reset(form) {
    form.reset();

  }

  login(form) {
    let userInfos = null;
    this.userInfo = null;

    console.log('it is inside the onsubmit' + form);
    if (form) {

      console.log('inside the login submission');
      //    this.evt.preventDefault();


      return new Promise(resolve => {
        this.auth.login(form).then((res) => {

          if (res) {
            userInfos = JSON.parse(JSON.stringify(res));
            console.log(userInfos);

            this.userInfo = new UserInformation(userInfos.fname, userInfos.mname, userInfos.lname, userInfos.address, userInfos.contactNumber, userInfos.aptNumber, userInfos.address1, userInfos.altContact, userInfos.email, userInfos.userType);
            console.log("logged in user information" + this.userInfo);
            //Flushing the existing user from the localstorage
            window.localStorage.removeItem("user");
            //creating new logged in user
            window.localStorage.setItem("user", JSON.stringify(this.userInfo));
            resolve(this.userInfo);

            //we will also checkf ro event push to notify the app component for menu loading
            this.evt.publish('userInfo', this.userInfo);

            this.navCtrl.setRoot(HomePage);
          } else {
            this.errorAlert = this.alertCrt.create({
              title: 'Login Failure Message',
              message: this.errorMessage,
              buttons: [
                {
                  text: "Ok",

                  handler: data => {
                    console.log('Save Clicked');
                  }

                }
              ]
            });
            this.errorAlert.present();

          }
        }).catch((error) => {
          console.log("inside the else loop");

          this.errorAlert = this.alertCrt.create({
            title: 'Login Failure Message',
            message: this.errorMessage,
            buttons: [
              {
                text: "Ok",

                handler: data => {
                  console.log('Save Clicked');
                }

              }
            ]
          });
          this.errorAlert.present();

        });
      });

    }


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
