import { Subject } from 'rxjs';
import { TopMenu } from 'shared-components-lib/lib/shared-menu/top-menu/shared-top-menu.interface';

export interface TopMenuConfig {
  compConfig: TopMenu | null;
  inputChange: Subject<TopMenu>;
}
