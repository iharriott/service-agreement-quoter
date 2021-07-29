import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { DCFQueryParams } from '../../models/dcf.model';
import { DataDefinition } from '../../../../../../angular-shared-components/dist/shared-components-lib/lib/shared-grid/atom-grid/atom-grid-data.interface';

@Injectable()
export class DcfService {
  constructor(private http: HttpClient) {}

  getDcfList(dcfQueryParams: DCFQueryParams): Observable<DataDefinition> {
    const params = new HttpParams().set(
      'componentId',
      dcfQueryParams.componentId
    );
    return this.http.get<DataDefinition>(environment.DCF_EP, { params });
  }
}
