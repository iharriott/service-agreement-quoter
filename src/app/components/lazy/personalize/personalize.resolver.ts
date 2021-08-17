import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { PersonalizeService } from './personalize.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable()
export class PersonalizeResolver implements Resolve<boolean> {
  /**
   * Constructor
   * @param personalizeService
   */
  constructor(private personalizeService: PersonalizeService) {}

  /**
   * Resolver Function
   * @return Observable<boolean>
   */
  resolve(): Observable<boolean> {
    return this.personalizeService.resolve().pipe(take(1));
  }
}
