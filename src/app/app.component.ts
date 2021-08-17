import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { TopMenuConfig } from './app.model';
import { AppService } from './app.service';
import { Subject } from 'rxjs';
import { TopMenu } from 'shared-components-lib/lib/shared-menu/top-menu/shared-top-menu.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'service-agreement-quoter';
  topMenuConfig: TopMenuConfig | null | undefined;

  constructor(
    private appService: AppService,
    private changeDetectoref: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.topMenuConfig = {
      compConfig: {},
      inputChange: new Subject<TopMenu>(),
    };
  }

  ngAfterViewInit() {
    this.appService.getJSON().subscribe((data) => {
      if (this.topMenuConfig) {
        this.topMenuConfig.compConfig = data;
        this.topMenuConfig.inputChange.next(this.topMenuConfig.compConfig);
        this.changeDetectoref.detectChanges();
      }
    });
  }
}
