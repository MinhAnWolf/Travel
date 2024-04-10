import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable, tap} from "rxjs";
import {AuthenticationService} from "../services/authentication.service";
import {StorageUtil} from "../utils/storage.util";
import {ResponseAuthModel} from "../../model/response-auth.model";
import {isNull} from "../utils/utils.util";
import {Router} from "@angular/router";
import { throwError } from 'rxjs';
import {ApiConstant} from "../constant/api.constant";

@Injectable()
export class HttpInterceptorSupport implements HttpInterceptor {

    constructor(private storageUtil: StorageUtil,
                private router: Router) {}

    // @ts-ignore
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      const authReq = this.handleUrl(req);
      return next.handle(authReq).pipe(
        tap(res => {
          if (res instanceof HttpResponse) {
            let authRes = res.headers.get('Authorization');
            let rfRes = res.headers.get('rf');
            let c_id = res.headers.get('c_id');
            if (authRes != null) {
              this.storageUtil.setCookie("Authorization", authRes)
            }

            if (rfRes != null) {
              this.storageUtil.setCookieOnly("rf", "Bearer " + rfRes)
            }

            if (c_id != null) {
              this.storageUtil.setCookie("c_id", c_id);
            }
          }
        }, error => {
          console.log(error);
          this.router.navigate(['/authentication/login']).then(r =>
            console.log(r))
        })
      );
    }

    private checkNull(at:string, rf:string):boolean {
      return at == null || at == "" || rf == null || rf == ""
    }

    private handleUrl(req: HttpRequest<any>) {
      if (ApiConstant.ARR_IMAGE.includes(req.url)) {
        // handle image here
        return req;
      } else {
        const authToken = this.storageUtil.getCookieAt;
        const rfToken = this.storageUtil.getCookieRf
        return req.clone(
          {
            headers: req.headers.set('Authorization', authToken)
              .set('rf', rfToken)
          }
        )
      }
    }

}
