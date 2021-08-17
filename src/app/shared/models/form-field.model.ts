export interface FormField {
  fieldId: string;
  componentId: string;
  parentFieldId: string;
  fieldType: string;
  fieldLabel: string;
  fieldName: string;
  displayOrder: number;
  showInd: number;
  flex: number;
  hint?: string;
  tooltip?: string;
  info?: string;
  readOnly?: boolean;
  validation?: {
    fn?: string;
    val?: string | number | null;
  };
  source?: string;
  options?: OptionObject[];
}

export interface OptionObject {
  optionKey: string;
  labelValues: OptionValue[];
}

export interface OptionValue {
  label: string;
  value: string | number | boolean;
}

export const getConfig: FormField[] = []; // TODO: remove this completely
