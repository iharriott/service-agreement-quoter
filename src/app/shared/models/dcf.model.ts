export interface DCFComponentGetComponentForViewDetail {
  componentId: number;
  componentTypeId: number;
  name: string;
  description: string;
  componentType: string;
  roleId: number;
}

export interface DCFComponentGetConfigForViewDetail {
  configName: string;
  configValue: string;
}
export interface DCFComponentGetFieldForViewDetail {
  fieldId: number;
  fieldName: string;
  template: string;
  Xtemplate: string;
  headerText: string;
  parentFieldId: number;
  minWidth: number;
  width: number;
  flex: number;
  headerCssClass: string;
  fieldCssClass: string;
  format: string;
  linkTemplate: string;
  sortable: boolean;
  displayOrder: number;
  show: number;
  showExcel: number;
  requiredValidator: number;
  validatorType: string;
  validationExpression: string;
  validationBeginValue: string;
  validationEndValue: string;
  fieldDataType: string;
  editable: number;
  useNull: boolean;
  primary: number;
}

export interface DCFQueryParams {
  viewUserId?: string;
  componentId: number;
}

export interface DCFComponentGetComponentForViewResult {
  definition: DCFComponentGetComponentForViewDetail;
  config: DCFComponentGetConfigForViewDetail[];
  columns: DCFComponentGetFieldForViewDetail[];
}
