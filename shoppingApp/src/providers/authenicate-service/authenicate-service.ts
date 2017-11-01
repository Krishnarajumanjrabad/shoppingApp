import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {AfoListObservable, AngularFireOfflineDatabase} from "angularfire2-offline";
import {AngularFireAuth} from "angularfire2/auth";
import {AlertController} from "ionic-angular";
import 'rxjs/add/operator/map';
import {EmailServiceProvider} from "../email-service/email-service";


/*
  Generated class for the AuthenicateServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class AuthenicateServiceProvider {

  userInfo: AfoListObservable<any[]>;
  songs: AfoListObservable<any[]>;
  private userFound: boolean = false;
  /// errorAlert: Alert;
  //private userList: FirebaseListObservable<any[]>;
  // private user: any;
  //private recordFound: boolean = false;


  constructor(public http: Http, public db: AngularFireOfflineDatabase, public afireauth: AngularFireAuth, public alertCrt: AlertController, public email: EmailServiceProvider) {


  }

  login(credentials) {
    console.log(credentials);
    return new Promise( (resolve, reject) => {
      this.afireauth.auth.signInWithEmailAndPassword( credentials.email, credentials.password ).then( (res) => {
        console.log( res );
        this.userInfo = this.db.list( "/users" );
        this.userInfo.subscribe( (result) => {
        //  console.log( "user info" + result );
          result.forEach( (user) => {
            if (user.email == credentials.email) {
              console.log( "user is found" );
             // console.log( user );
              resolve( user );
              return user;
            }
          } );
        });

        return;
      } ).catch( (err) => {
        reject( err );
      } );
    } );

  }

  passwordreset(email) {
    return new Promise( (resolve, reject) => {
      this.afireauth.auth.sendPasswordResetEmail( email ).then( (res) => {
        console.log( res );
        resolve( res );
        return;
      } ).catch( (err) => {
        reject( err );
      } );
    } );
  }

  adduser(newuser) {
    console.log( newuser );
    return new Promise( (resolve, reject) => {

      this.afireauth.auth.createUserWithEmailAndPassword( newuser.email, newuser.password ).then( (newUser) => {
        this.userInfo = this.db.list( "/users" );
        if (this.userInfo.isEmpty()) {
          this.userInfo.push( newuser );
          this.email.sendRegisterationEmail(newuser).then(response =>{
            console.log(response);
            if(response != null){
              resolve( this.userInfo );
              return;
            }
          }).catch(err =>{
            console.log(err);
          });

        } else {
          this.userInfo.subscribe( (res) => {
            console.log( "user info" + res );
            res.forEach( (user) => {
              if (user.email == newUser.email) {
                this.userFound = true;
                console.log( "user is already exist" );
              }
            } );

            if (!this.userFound) {
              this.userInfo.push( newuser );
              this.email.sendRegisterationEmail(newuser).then(response =>{
                console.log(response);
                if(response != null){
                  resolve( this.userInfo );
                  return;
                }

              }).catch(err =>{
                console.log(err);
              });
            }

          } );
        }
      } );
      return;
    } );

  }


  logOut() {
    this.afireauth.auth.signOut();
  }

}
