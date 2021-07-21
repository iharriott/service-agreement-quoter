export const BRIDGE_HOST_URL = '/midtier/clapi-bridge/v2/api/';
export const environment = {
  production: true,
  environmentName: 'PROD',
  QUOTE_LIST_EP: BRIDGE_HOST_URL + 'saq/quotes/quotes/',
  DCF_EP: BRIDGE_HOST_URL + 'arcdb/dcf-component/dcf-component-list/',
  cookieName: 'uptakecajwt',
};
