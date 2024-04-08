import {HttpClient} from "@angular/common/http";
import {ApiConstant} from "../constant/api.constant";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable({ providedIn: 'root' })
export class AddressService {

  constructor(private http:HttpClient) {}

  public getProvince(): Observable<any> {
    return this.http.get(ApiConstant.API_GET_PROVINCE)
  }

  public getDistrict(): Observable<any> {
    return this.http.get(ApiConstant.API_GET_DISTRICT)
  }

  public getWard(): Observable<any> {
    return this.http.get(ApiConstant.API_GET_WARD)
  }

}
