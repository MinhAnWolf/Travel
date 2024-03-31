export class ApiConstant {
  private static API_AUTH:string = "/auth";
  public static API_LOGIN:string = ApiConstant.API_AUTH + "/login"
  public static API_REGISTER:string = ApiConstant.API_AUTH + "/register"
}
