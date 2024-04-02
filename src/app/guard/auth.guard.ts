import {CanActivateFn, Router} from '@angular/router';
import {StorageUtil} from "../core/utils/storage.util";
import {inject} from "@angular/core";
import {AuthenticationService} from "../core/services/authentication.service";
import {TokenModel} from "../model/token.model";
import {BaseResponseModelModel} from "../model/base-response-model";
import {ResponseAuthModel} from "../model/response-auth.model";

export const authGuard: CanActivateFn = (route, state) => {
  let util = inject(StorageUtil)
  const at = util.getCookieAt;
  const  rf = util.getCookieRf;
  const router = inject(Router);
  const authenticationService = inject(AuthenticationService);
  let result:boolean = true;
  if (at == null || rf == null) {
      router.navigate(['/login']).then(r =>
        console.log(r)
      )
     return !result;
  }

  const tokenModel: TokenModel = inject(TokenModel);
  tokenModel.accessToken = at;
  tokenModel.refreshToken = rf;
  authenticationService.apiAuthenticationToken(tokenModel).subscribe(data => {
    let response:BaseResponseModelModel = <BaseResponseModelModel> data;
    result = response.data == true;
  });
  return result;
};
