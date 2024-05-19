import {CanActivateFn, Router} from '@angular/router';
import {StorageUtil} from "../core/utils/storage.util";
import {inject} from "@angular/core";
import {AuthenticationService} from "../core/services/authentication.service";
import {TokenModel} from "../model/token.model";
import {ConstantCommon} from "../shared/common/ConstantCommon";

export const AuthGuard: CanActivateFn = (route, state) => {
  let util = inject(StorageUtil)
  const at = util.getCookieAt;
  const  rf = util.getCookieRf;
  const router = inject(Router);
  const authenticationService = inject(AuthenticationService);
  const constantCommon = inject(ConstantCommon);
  let result:boolean = true;
  if (at.valueOf() == constantCommon.UNDEFINED_VALUE || rf.valueOf() == constantCommon.UNDEFINED_VALUE
    || at == constantCommon.NULL_VALUE || rf == constantCommon.NULL_VALUE) {
      router.navigate([constantCommon.ROUTER_LOGIN]).then(r =>
        console.log(r)
      )
     return !result;
  }

  const tokenModel:TokenModel = new TokenModel();
  tokenModel.accessToken = at;
  tokenModel.refreshToken = rf;
  authenticationService.apiAuthenticationToken(tokenModel).subscribe(data => {
    if (data != true) {
      router.navigate([constantCommon.ROUTER_LOGIN]).then(r =>
        console.log(r)
      )
      result = false;
    }
  });
  return result;
};
