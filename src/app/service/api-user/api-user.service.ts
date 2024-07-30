import {Injectable} from '@angular/core';
import {AuthService} from "@auth0/auth0-angular";
import {ApiUserUpdate} from "../../model/api-user-update";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {API_CONFIG} from "../../config/api-config";
import {ApiUserUpdateResponse} from "../../model/api-user-update-response";

@Injectable({
  providedIn: 'root'
})
export class ApiUserService {

  constructor(private httpClient: HttpClient, private authService: AuthService) {
  }

  updateUser(request: ApiUserUpdate): Observable<ApiUserUpdateResponse> {
    return this.httpClient.post<ApiUserUpdateResponse>(`${API_CONFIG.baseUrl}/user/update`, request);
  }
}
