import {HttpClient} from "@angular/common/http";
import {ApiConstant} from "../constant/api.constant";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import { GetTimelineTripRequestModel } from "src/app/model/get-timeline-trip-request.model";

@Injectable({ providedIn: 'root' })
export class TripService {

  constructor(private http:HttpClient) {}

  public getTimelineTrip(payload:GetTimelineTripRequestModel): Observable<any> {
    return this.http.post(ApiConstant.API_GET_TIMELINE_TRIP, payload)
  }

  public getListMyTrip(payload:{email: string}): Observable<any> {
    return this.http.post(ApiConstant.API_GET_LIST_MY_TRIP, payload)
  }

}
