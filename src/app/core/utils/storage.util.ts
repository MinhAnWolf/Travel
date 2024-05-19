import {CookieService} from "ngx-cookie-service";
import {Injectable} from "@angular/core";

@Injectable({ providedIn: 'root' })
export class StorageUtil{
  constructor(private cookieService: CookieService) {}

  /**
   * Get value cookie refresh token.
   *
   * @author Minh An
   * */
  public get getCookieRf()  {
    return this.cookieService.get("rf")
  }

  /**
   * Get value cookie access token.
   *
   * @author Minh An
   * */
  public get getCookieAt(): string  {
    return this.cookieService.get("Authorization")
  }

  public setCookieOnly(key:string, value:any) {
    this.cookieService.set(key, value, undefined, "/", undefined, false, 'Strict')
  }

  public setCookie(key:string, value:any) {
    this.cookieService.set(key, value, undefined, "/", undefined, false, 'Strict')
  }

  public clearCookies() {
    this.cookieService.delete("Authorization", "/");
    this.cookieService.delete("rf", "/");
    this.cookieService.delete("c_id", "/");
  }
}
