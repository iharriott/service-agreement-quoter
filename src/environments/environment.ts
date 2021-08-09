// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
export const BRIDGE_HOST_URL =
  'http://localhost:4000/midtier/clapi-bridge/v2/api/';
export const CL1_1 = 'http://localhost:3000/midtier/cl1.1-api/v2/'; //'http://localhost/midtier/cl1.1-api/v2/';
export const environment = {
  production: false,
  environmentName: 'DEV',
  QUOTE_LIST_EP: BRIDGE_HOST_URL + 'saq/quotes/quotelist/',
  DCF_EP: BRIDGE_HOST_URL + 'arcdb/dcf-component/dcf-component-list/',
  COOKIE_NAME: 'uptakecajwt',
  QUOTE_REPORT_OWNER_EP:
    BRIDGE_HOST_URL + 'saq/report/workflow/summary/owner/list',
  QUOTE_REPORT_STORE_EP:
    BRIDGE_HOST_URL + 'saq/report/workflow/summary/store/list',
  FORM_CONFIG_EP: CL1_1 + 'config/form/',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
