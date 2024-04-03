import {HttpClient} from "@angular/common/http";
import {ApiConstant} from "../constant/api.constant";
import {Observable} from "rxjs";
import {UserModel} from "../../model/auth.model";
import {Injectable} from "@angular/core";
import {TokenModel} from "../../model/token.model";

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

  constructor(private http:HttpClient) {}

  public apiLogin(payload:UserModel): Observable<any> {
    return this.http.post(ApiConstant.API_LOGIN, payload)
  }

  public apiAuthenticationToken(payload:TokenModel): Observable<any> {
    return this.http.post(ApiConstant.API_AUTHENTICATION, payload)
  }
}
