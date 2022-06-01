import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserInfo } from './models/user-info';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _registerUrl = "https://pmanager-back.herokuapp.com/api/register"
  private _loginUrl = "https://pmanager-back.herokuapp.com/api/login"
  private _getUserInfoUrl = "https://pmanager-back.herokuapp.com/api/getUser"


  constructor(
    private http: HttpClient,
    private _router: Router
    ) { }

  
  registerUser(user: any) {
    return this.http.post<any>(this._registerUrl, user)
  }

  loginUser(user: any) {
    console.log(user);
    return this.http.post<any>(this._loginUrl, user)
  }
  
  loggedIn() {
    return !!localStorage.getItem('token') //si il y'a token, return true, sinon return false
  }

  getToken() {
    return localStorage.getItem('token')
  }

  logoutUser(){
    localStorage.removeItem('token')
    this._router.navigate(['/'])
  }
  

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', "Content-Security-Policy":"upgrade-insecure-requests"})
  }

  httpOptionsToken = {
    headers: new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization':`${this.getToken()}`,
      "Content-Security-Policy":"upgrade-insecure-requests"
    })
  }

  registerGoogleAccount(userInfo : UserInfo): Observable<UserInfo> {
    console.log(userInfo);
    return this.http.post<UserInfo>(this._registerUrl, userInfo, this.httpOptions)
  }

  //Envoie une requete get en donnant le token
  getUserInfo() {
    console.log("Mon token: ",this.getToken());
    return this.http.get<any>(this._getUserInfoUrl, this.httpOptionsToken);
  }


}
