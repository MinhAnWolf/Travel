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
    return this.cookieService.get("rf_key")
  }

  /**
   * Get value cookie access token.
   *
   * @author Minh An
   * */
  public get getCookieAt(): string  {
    return this.cookieService.get("Authorization")
  }

  public setCookieOnlyRf(key:string) {
    this.cookieService.set("rf", key, undefined, undefined, undefined, true, 'Strict')
  }

  public setCookieAt(key:string) {
    this.cookieService.set("Authorization", key)
  }
}
