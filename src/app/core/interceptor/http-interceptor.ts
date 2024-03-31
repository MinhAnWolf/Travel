import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {AuthenticationService} from "../services/authentication.service";
import {StorageUtil} from "../utils/storage.util";

@Injectable()
export class HttpInterceptorSupport implements HttpInterceptor {

    constructor(private authService: AuthenticationService,
                private storageUtil: StorageUtil
                ) {}

    // @ts-ignore
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const authToken = this.storageUtil.getCookieAt;
        const authReq = req.clone(
          {
            headers: req.headers.set('Authorization', authToken)
          }
        )
      return next.handle(authReq);
    }

}
