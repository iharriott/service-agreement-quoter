import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TopMenu } from 'shared-components-lib/lib/shared-menu/top-menu/shared-top-menu.interface';

@Injectable()
export class AppService {

  constructor(private http: HttpClient) {}

  public getJSON(): Observable<TopMenu> {
    return this.http.get('./assets/menu-mock-data.json');
  }

  menuJSON(): TopMenu {
    const data: TopMenu = {
      menu: {
        items: [
          {
            rs_Type: 'Menu.Items',
            menuItemId: 4000,
            clientId: 'TopMenu',
            displayOrder: 10,
            menuItemText: 'Customer Order to Invoice',
            appUrl: '/MainMenuApplicationURL',
            hasDropDownOptions: true,
          },
          {
            rs_Type: 'Menu.Items',
            menuItemId: 4001,
            clientId: 'TopMenu',
            displayOrder: 20,
            menuItemText: 'Workflow',
          },
          {
            rs_Type: 'Menu.Items',
            menuItemId: 4002,
            clientId: 'TopMenu',
            displayOrder: 30,
            menuItemText: 'Financials',
            hasDropDownOptions: true,
          },
          {
            rs_Type: 'Menu.Items',
            menuItemId: 4003,
            clientId: 'TopMenu',
            displayOrder: 40,
            menuItemText: 'Reports',
          },
          {
            rs_Type: 'Menu.Items',
            menuItemId: 4002,
            parentMenuItemId: 4000,
            clientId: 'WorkflowMenu',
            displayOrder: 10,
            menuItemText: 'App Name 1',
            moduleId: 6,
            appName: 'App Name 1',
            appUrl: '/Application1URL',
          },
          {
            rs_Type: 'Menu.Items',
            menuItemId: 4007,
            parentMenuItemId: 4000,
            menuItemText: 'App Name 2',
            displayOrder: 20,
            moduleId: 999,
            appName: 'App Name 2',
            appUrl: '/Application2URL',
          },
          {
            rs_Type: 'Menu.Items',
            menuItemId: 4008,
            parentMenuItemId: 4000,
            menuItemText: 'App Name 3',
            displayOrder: 20,
            moduleId: 999,
            appName: 'App Name 3',
            appUrl: '/Application3URL',
          },
          {
            rs_Type: 'Menu.Items',
            menuItemId: 4009,
            parentMenuItemId: 4002,
            menuItemText: 'App Name 4',
            displayOrder: 40,
            moduleId: 999,
            appName: 'App Name 4',
            appUrl: '/Application4URL',
          },
          {
            rs_Type: 'Menu.Items',
            menuItemId: 4010,
            parentMenuItemId: 4002,
            menuItemText: 'App Name 5',
            displayOrder: 30,
            moduleId: 999,
            appName: 'App Name 5',
            appUrl: '/Application5URL',
          },
          {
            rs_Type: 'Menu.Icons',
            menuItemId: 4011,
            displayOrder: 50,
            moduleId: 1000,
            iconName: 'search',
            appUrl: '/Application6URL',
          },
          {
            rs_Type: 'Menu.Icons',
            menuItemId: 4012,
            displayOrder: 60,
            moduleId: 1000,
            iconName: 'settings',
            appUrl: '/Application6URL',
          },
          {
            rs_Type: 'Menu.Icons',
            menuItemId: 4013,
            displayOrder: 70,
            moduleId: 1000,
            iconName: 'account_circle',
            appUrl: '/Application6URL',
          },
        ],
      },
    };
    return data;
  }
}
