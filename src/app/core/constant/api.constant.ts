import {environment} from "../../../environments/environment.development";

export class ApiConstant {
  private static API_AUTH:string = environment.SERVER_ADDRESS + "/auth";
  public static API_LOGIN:string = ApiConstant.API_AUTH + "/login"
  public static API_REGISTER:string = ApiConstant.API_AUTH + "/register"
}
