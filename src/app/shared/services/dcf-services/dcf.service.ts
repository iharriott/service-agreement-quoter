import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import {
  DCFComponentGetComponentForViewResult,
  DCFQueryParams,
} from '../../models/dcf.model';

@Injectable()
export class DcfService {
  constructor(private http: HttpClient) {}

  getDcfList(
    dcfQueryParams: DCFQueryParams
  ): Observable<DCFComponentGetComponentForViewResult> {
    const params = new HttpParams().set(
      'componentId',
      dcfQueryParams.componentId
    );
    return this.http.get<DCFComponentGetComponentForViewResult>(
      environment.DCF_EP,
      { params }
    );
  }
}
