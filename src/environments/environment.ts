// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
export const BRIDGE_HOST_URL =
  'http://localhost:4000/midtier/clapi-bridge/v2/api/';
export const environment = {
  production: false,
  environmentName: 'DEV',
  QUOTE_LIST_EP: BRIDGE_HOST_URL + 'saq/quotes/quotelist/',
  DCF_EP: BRIDGE_HOST_URL + 'arcdb/dcf-component/dcf-component-list/',
  COOKIE_NAME: 'uptakecajwt',
  QUOTE_REPORT_EP: BRIDGE_HOST_URL + 'saq/report/workflow/summary/owner/list',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
