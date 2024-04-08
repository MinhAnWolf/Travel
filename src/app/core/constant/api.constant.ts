import {environment} from "../../../environments/environment.development";

export class ApiConstant {
  private static API_AUTH:string = environment.SERVER_ADDRESS + "/auth";
  public static API_LOGIN:string = ApiConstant.API_AUTH + "/login";
  public static API_REGISTER:string = ApiConstant.API_AUTH + "/register";
  public static API_AUTHENTICATION:string = ApiConstant.API_AUTH + "/authentication";
  public static API_GET_TIMELINE_TRIP:string = "https://api.eazymock.net/mock/3c62348e-f32e-44dc-99cc-7080e6ffbc3b/115/getTimelineTrip";
  public static API_GET_LIST_MY_TRIP:string = "https://api.eazymock.net/mock/3c62348e-f32e-44dc-99cc-7080e6ffbc3b/115/getListMyTrip";
  public static API_GET_MY_FRIEND:string = "https://api.eazymock.net/mock/3c62348e-f32e-44dc-99cc-7080e6ffbc3b/115/getFriendRequest";
  public static API_GET_FRIEND_REQUEST:string = "https://api.eazymock.net/mock/3c62348e-f32e-44dc-99cc-7080e6ffbc3b/115/getFriendRequest";
  private static API_ADDRESS:string = environment.SERVER_ADDRESS + "/address";
  public static API_GET_PROVINCE:string = ApiConstant.API_ADDRESS + "/province";
  public static API_GET_DISTRICT:string = ApiConstant.API_ADDRESS + "/district";
  public static API_GET_WARD:string = ApiConstant.API_ADDRESS + "/ward";
  
}
