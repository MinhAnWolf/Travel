import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable, tap} from "rxjs";
import {AuthenticationService} from "../services/authentication.service";
import {StorageUtil} from "../utils/storage.util";
import {ResponseAuthModel} from "../../model/response-auth.model";
import {isNull} from "../utils/utils.util";

@Injectable()
export class HttpInterceptorSupport implements HttpInterceptor {

    constructor(private storageUtil: StorageUtil) {}

    // @ts-ignore
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const authToken = this.storageUtil.getCookieAt;
        const rfToken = this.storageUtil.getCookieRf
        const authReq = req.clone(
          {
            headers: req.headers.set('Authorization', authToken)
              .set('rf', rfToken)
          }
        )
      return next.handle(authReq).pipe(
        tap(res => {
          if (res instanceof HttpResponse) {
            if (res.headers.get('Authorization') === null && res.headers.get('rf') === null) {
              let response:ResponseAuthModel = <ResponseAuthModel> res.body;
              this.storageUtil.setCookieAt("Authorization", response.token)
              this.storageUtil.setCookieOnlyRf("rf", response.rf)
            }
          }
        })
      );
    }

}
