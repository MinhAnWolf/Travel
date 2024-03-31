import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

export class AuthenticationService {
  constructor(private http:HttpClient) {}
  public apiLogin(payload) {
    this.http.post()
  }
}
