import {
  AppHttpRequestInterceptor,
  AppHttpResponseInterceptor,
} from './app-services/app-http-interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { DcfService } from './dcf-services/dcf.service';

@NgModule({
  imports: [],
  declarations: [],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppHttpRequestInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppHttpResponseInterceptor,
      multi: true,
    },
    DcfService,
  ],
})
export class SharedServicesModule {}
