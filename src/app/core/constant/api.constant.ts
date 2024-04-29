import {environment} from "../../../environments/environment.development";

export class ApiConstant {
  // API AUTH
  private static API_AUTH:string = environment.SERVER_ADDRESS + "/auth";
  public static API_LOGIN:string = ApiConstant.API_AUTH + "/login";
  public static API_REGISTER:string = ApiConstant.API_AUTH + "/register";
  public static API_AUTHENTICATION:string = ApiConstant.API_AUTH + "/authentication";

  // API TRIP
  private static API_TRIP:string = environment.SERVER_ADDRESS + "/trip";
  public static API_GET_TIMELINE_TRIP:string = "https://api.eazymock.net/mock/3c62348e-f32e-44dc-99cc-7080e6ffbc3b/115/getTimelineTrip";
  public static API_GET_LIST_MY_TRIP:string = "https://api.eazymock.net/mock/3c62348e-f32e-44dc-99cc-7080e6ffbc3b/115/getListMyTrip";
  public static API_GET_MY_FRIEND:string = "https://api.eazymock.net/mock/3c62348e-f32e-44dc-99cc-7080e6ffbc3b/115/getMyFriend";
  public static API_GET_FRIEND_REQUEST:string = "https://api.eazymock.net/mock/3c62348e-f32e-44dc-99cc-7080e6ffbc3b/115/getFriendRequest";
  public static GET_TRIP_DETAIL = "https://api.eazymock.net/mock/3c62348e-f32e-44dc-99cc-7080e6ffbc3b/115/getTripDetail";
  public static API_CREATE_TRIP = ApiConstant.API_TRIP+"/create";

  private static API_ADDRESS:string = environment.SERVER_ADDRESS + "/address";
  public static API_GET_PROVINCE:string = ApiConstant.API_ADDRESS + "/province";
  public static API_GET_DISTRICT:string = ApiConstant.API_ADDRESS + "/district";
  public static API_GET_WARD:string = ApiConstant.API_ADDRESS + "/ward";

  // API IMAGE
  public static ARR_IMAGE:string[] = ["https://api.imgur.com/3/image","https://script.google.com/macros/s/AKfycbzhrcuz9mmHzRgSmPTSeLVfDO0neSzOmuXaV8n3UK0K9BhJYahdj2lmXhFDVPkTqYFegw/exec"]

}
