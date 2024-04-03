import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable, tap} from "rxjs";
import {AuthenticationService} from "../services/authentication.service";
import {StorageUtil} from "../utils/storage.util";
import {ResponseAuthModel} from "../../model/response-auth.model";
import {isNull} from "../utils/utils.util";
import {Router} from "@angular/router";
import { throwError } from 'rxjs';

@Injectable()
export class HttpInterceptorSupport implements HttpInterceptor {

    constructor(private storageUtil: StorageUtil,
                private router: Router) {}

    // @ts-ignore
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const authToken = this.storageUtil.getCookieAt;
        const rfToken = this.storageUtil.getCookieRf
        if (this.checkNull(authToken, rfToken)) {
          return throwError('Authentication fail');
        }

        const authReq = req.clone(
          {
            headers: req.headers.set('Authorization', authToken)
              .set('rf', rfToken)
          }
        )
      return next.handle(authReq).pipe(
        tap(res => {
          if (res instanceof HttpResponse) {
            let authRes = res.headers.get('Authorization');
            let rfRes = res.headers.get('rf');
            if (authRes != null && rfRes != null) {
              this.storageUtil.setCookieAt("Authorization", authRes)
              this.storageUtil.setCookieOnlyRf("rf", "Bearer " + rfRes)
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

}
