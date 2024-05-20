import {HttpClient} from "@angular/common/http";
import {ApiConstant} from "../constant/api.constant";
import {Observable} from "rxjs";
import {UserModel} from "../../model/auth.model";
import {Injectable} from "@angular/core";
import {TokenModel} from "../../model/token.model";
import { StorageUtil } from "../utils/storage.util";
import { Router } from "@angular/router";

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

  constructor(private http:HttpClient, private storageUtil: StorageUtil, private router: Router) {}

  public apiLogin(payload:UserModel): Observable<any> {
    return this.http.post(ApiConstant.API_LOGIN, payload)
  }

  public apiAuthenticationToken(payload:TokenModel): Observable<any> {
    return this.http.post(ApiConstant.API_AUTHENTICATION, payload)
  }

  public apiLogout() {
    this.storageUtil.clearCookies();
  }

  //////////////////////////////////////
  public apiRegister(payload:UserModel): Observable<any> {
    console.log(payload);
    return this.http.post(ApiConstant.API_REGISTER, payload);
  }
}
