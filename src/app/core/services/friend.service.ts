import {HttpClient} from "@angular/common/http";
import {ApiConstant} from "../constant/api.constant";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable({ providedIn: 'root' })
export class FriendService {

  constructor(private http:HttpClient) {}

  public getMyFriend(payload: {id:string}): Observable<any> {
    return this.http.post(ApiConstant.API_GET_MY_FRIEND, payload)
  }

  public getFriendRequest(payload: {id:string}): Observable<any> {
    return this.http.post(ApiConstant.API_GET_FRIEND_REQUEST, payload)
  }

  


}
