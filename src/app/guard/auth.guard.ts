import {CanActivateFn, CanMatchFn, Router} from '@angular/router';
import {StorageUtil} from "../core/utils/storage.util";
import {inject} from "@angular/core";
import {AuthenticationService} from "../core/services/authentication.service";
import {TokenModel} from "../model/token.model";
import {BaseResponseModelModel} from "../model/base-response-model";
import {ResponseAuthModel} from "../model/response-auth.model";

export const AuthGuard: CanActivateFn = (route, state) => {
  let util = inject(StorageUtil)
  const at = util.getCookieAt;
  const  rf = util.getCookieRf;
  const router = inject(Router);
  const authenticationService = inject(AuthenticationService);
  let result:boolean = true;
  if (at.valueOf() == "undefined" || rf.valueOf() == "undefined") {
      router.navigate(['/authentication/login']).then(r =>
        console.log(r)
      )
     return !result;
  }

  const tokenModel:TokenModel = new TokenModel();
  tokenModel.accessToken = at;
  tokenModel.refreshToken = rf;
  authenticationService.apiAuthenticationToken(tokenModel).subscribe(data => {
    if (data != true) {
      router.navigate(['/authentication/login']).then(r =>
        console.log(r)
      )
      result = false;
    }
  });
  return result;
};
