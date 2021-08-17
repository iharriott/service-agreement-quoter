import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { SharedModule } from './shared/shared.module';
import { SharedTopMenuModule } from 'shared-components-lib';

@NgModule({
  declarations: [AppComponent],
  providers: [AppService],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    SharedTopMenuModule,
    SharedModule.forRoot(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
