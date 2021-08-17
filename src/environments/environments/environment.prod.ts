export const BRIDGE_HOST_URL = '/midtier/clapi-bridge/v2/api/';
export const CL1_1 = 'http://localhost:3000/midtier/cl1.1-api/v2/';
export const environment = {
  production: true,
  environmentName: 'PROD',
  QUOTE_LIST_EP: BRIDGE_HOST_URL + 'saq/quotes/quotes/',
  DCF_EP: BRIDGE_HOST_URL + 'arcdb/dcf-component/dcf-component-list/',
  cookieName: 'uptakecajwt',
  FORM_CONFIG_EP: CL1_1 + 'config/form/',
};
