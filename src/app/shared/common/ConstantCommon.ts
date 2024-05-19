import {Injectable} from "@angular/core";

/**
 * Variable common.
 * */
@Injectable({ providedIn: 'root' })
export class ConstantCommon {
  public ROUTER_LOGIN:string = "/authentication/login";
  public UNDEFINED_VALUE:string = "undefined";
  public NULL_VALUE:string = "";

  public static success:number = 1;
  public static fail:number = 0;
}
