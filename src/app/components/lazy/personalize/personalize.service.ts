import { Injectable } from '@angular/core';
import { forkJoin, Observable, Observer } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { FormService } from 'src/app/shared/services/form.service';
import { FieldConfig } from 'shared-components-lib/lib/shared-form/shared/others/model/field.model';
import { FormField } from '../../../shared/models/form-field.model';
import { User } from './personalize.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable()
export class PersonalizeService {
  /*** Local Variables ***/
  userConfig: FormField[] | undefined;
  userData: User | undefined | null;

  /*** End of Local Variables ***/

  /**
   * Constructor
   * @param formService
   * @param http
   */
  constructor(private formService: FormService, private http: HttpClient) {}

  /*** Start of Public Functions ***/

  /**
   *  Resolver function to prefetch all data
   * @return  Observable<boolean>
   */
  resolve(): Observable<boolean> {
    return new Observable<boolean>((observer: Observer<boolean>) => {
      forkJoin([this.getUserConfig(), this.getUserData()])
        .pipe(take(1))
        .subscribe(() => {
          observer.next(true);
          observer.complete();
        });
    });
  }

  /**
   * Function to get user configs
   * @return Observable<boolean>
   */
  getUserConfig(): Observable<boolean> {
    return new Observable<boolean>((observer: Observer<boolean>) => {
      this.formService
        .getConfig('saqPersonalization')
        .pipe(take(1))
        .subscribe((config: FormField[]) => {
          this.userConfig = config;
          observer.next(true);
          observer.complete();
        });
    });
  }

  /**
   * Function to get user data
   * @return Observable<boolean>
   */
  getUserData(): Observable<boolean> {
    return new Observable<boolean>((observer: Observer<boolean>) => {
      this.http
        .post<User>(environment.PERSONALIZE_GET_EP, null)
        .pipe(take(1))
        .subscribe((data: User) => {
          this.userData = data;
          observer.next(true);
          observer.complete();
        });
    });
  }

  /**
   * Function to save  user data
   * @param user
   * @return Observable<User>
   */
  saveUser(user: User): Observable<User> {
    return this.http.post<User>(environment.PERSONALIZE_UPDATE_EP, user).pipe(
      take(1),
      tap((data: User) => {
        this.userData = data;
      })
    );
  }

  /**
   * Function to transform global config to Forms config
   * @param data
   * @param configs
   * @return FieldConfig[]
   */
  transformToFormsConfig(data: any, configs: FormField[]): FieldConfig[] {
    return this.formService.transformToConfig(data, configs);
  }

  /*** End of Public Functions ***/

  /*** Start of Private Functions ***/
  /*** End of Private Functions ***/
}
