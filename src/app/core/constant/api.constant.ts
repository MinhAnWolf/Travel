import {environment} from "../../../environments/environment.development";

export class ApiConstant {
  private static API_AUTH:string = environment.SERVER_ADDRESS + "/auth";
  public static API_LOGIN:string = ApiConstant.API_AUTH + "/login";
  public static API_REGISTER:string = ApiConstant.API_AUTH + "/register";
  public static API_AUTHENTICATION:string = ApiConstant.API_AUTH + "/authentication";
  public static API_GET_TIMELINE_TRIP:string = "https://api.eazymock.net/mock/5bbcdbad-a59b-4b42-866f-4f2d863249df/112/getTimelineTrip";
}
