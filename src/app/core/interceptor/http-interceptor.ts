import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable, tap} from "rxjs";
import {AuthenticationService} from "../services/authentication.service";
import {StorageUtil} from "../utils/storage.util";

@Injectable()
export class HttpInterceptorSupport implements HttpInterceptor {

    constructor(private storageUtil: StorageUtil) {}

    // @ts-ignore
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const authToken = this.storageUtil.getCookieAt;
        const authReq = req.clone(
          {
            headers: req.headers.set('Authorization', authToken),
          }
        )
      return next.handle(authReq).pipe(
        tap(event => {
          if (event instanceof HttpResponse) {
            console.log(event);
            // this.storageUtil.setCookieOnlyRf("rf")
          }
        })
      );
    }

}
