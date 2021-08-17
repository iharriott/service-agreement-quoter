export interface QuotesGetQuoteStatusListForViewDetail {
  quoteStatusId?: number;
  quoteStatus?: string;
}

export interface QuotesGetStoreListForViewDetail {
  storeNumber?: string;
  storeName?: string;
}

export interface QuotesGetCostCenterListForViewDetail {
  storeNo?: string;
  costCenterCode?: string;
  costCenterName?: string;
}

export interface QuotesGetTermsListForViewDetail {
  termsCode?: number;
  termsCodeDescription?: string;
}

export interface QuotesGetTaxCodeListForViewDetail {
  taxCode?: string;
  taxCodeDescription?: string;
}

export interface QuotesGetChargeCodeListForViewDetail {
  chargeCode?: string;
  chargeCodeDesc?: string;
}

export interface QuotesGetStateListForViewDetail {
  stateProvinceCode?: string;
  stateProvinceName?: string;
  countryCode?: string;
}

export interface QuotesGetAppUserListForViewDetail {
  userId?: number;
  userName?: string;
  salesRepPhoneNo?: string;
  salesRepCellPhoneNumber?: string;
  salesRepFaxNumber?: string;
}

export interface QuotesGetContractTypeListForViewDetail {
  contractTypeId?: number;
  contractTypeDesc?: string;
}

export interface QuotesOpportunityCommodityListForViewDetail {
  commodityCategoryId?: number;
  commodityCategoryName?: string;
  bitmaskOpportunityTypeId?: number;
}

export interface QuotesGetOpportunitySourceListForViewDetail {
  opportunitySourceId?: number;
  opportunitySourceDescription?: string;
  opportunitySourceTypeId?: number;
}

export interface QuotesGetEventTriggerUnitListForViewDetail {
  eventTriggerUnitCode?: string;
  eventTriggerUnitDescription?: string;
}

export interface QuotesGetIntervalListForViewDetail {
  intervalId?: number;
  intervalDescription?: string;
}

export interface QuotesGetExpireByListForViewDetail {
  expiresById?: number;
  expiresByDescription?: string;
}

export interface QuotesGetContactTypeListForViewDetail {
  contactTypeId?: number;
  contactTypeDescription?: string;
}

export interface QuotesGetDefaultValueForViewDetail {
  estimatedUser?: string;
  quoteDate?: Date;
  quoteStatusId?: number;
  quoteTypeId?: number;
  storeNumber?: string;
  costCenterCode?: string;
  salesRepPhoneNumber?: string;
  salesRepCellPhoneNumber?: string;
  salesRepFaxNumber?: string;
  salesRepUserId?: number;
  urgencyIndicatorId?: number;
}

export interface QuotesGetLostReasonListForViewDetail {
  lostReasonId?: number;
  lostReasonDescription?: string;
}

export interface QuotesGetQuotesForViewResult {
  quoteStatusList?: QuotesGetQuoteStatusListForViewDetail[];
  storeList?: QuotesGetStoreListForViewDetail[];
  costCenterList?: QuotesGetCostCenterListForViewDetail[];
  termsList?: QuotesGetTermsListForViewDetail[];
  taxCodeList?: QuotesGetTaxCodeListForViewDetail[];
  chargeCodeList: QuotesGetChargeCodeListForViewDetail[];
  stateList?: QuotesGetStateListForViewDetail[];
  appUserList?: QuotesGetAppUserListForViewDetail[];
  contractTypeList?: QuotesGetContractTypeListForViewDetail[];
  oppCommodityList?: QuotesOpportunityCommodityListForViewDetail[];
  oppSourceList?: QuotesGetOpportunitySourceListForViewDetail[];
  eventTriggerUnitList?: QuotesGetEventTriggerUnitListForViewDetail[];
  intervalList?: QuotesGetIntervalListForViewDetail[];
  expiresByList?: QuotesGetExpireByListForViewDetail[];
  contactTypeList?: QuotesGetContactTypeListForViewDetail[];
  defaultValue?: QuotesGetDefaultValueForViewDetail[];
  lostReasonList?: QuotesGetLostReasonListForViewDetail[];
}

export interface QuotesGetQuoteHeaderListForViewDetail {
  quoteId?: number;
  quoteNumber?: string;
  quoteStatusId?: number;
  quoteStatus?: string;
  ownerUserId?: number;
  ownerFirstName?: string;
  ownerLastName?: string;
  branchNumber?: string;
  storeName?: number;
  costCenterCode?: string;
  quoteDescription?: string;
  customerNumber?: number;
  customerName?: string;
  customerPhone?: string;
  division?: string;
  city?: string;
  state?: string;
  divisionName?: string;
  purchaseOrderNumber?: number;
  enterUserId?: number;
  creatorFirstName?: string;
  creatorLastName?: string;
  ownerPhoneNumber?: string;
  ownerCellPhoneNumber?: string;
  ownerFaxNumber?: string;
  comments?: string;
  quoteTotal?: number;
  hasOpportunity?: boolean;
}

export interface QuotesGetRevisionFinancialsListForViewDetail {
  revision?: number;
  totalFlatRate?: number;
  totalDiscount?: number;
  totalExtended?: number;
}

export interface QuotesGetRevisionsListForViewDetail {
  revision?: number;
  revisionStatusId?: number;
  revisionStatus?: string;
  equipmentCount?: number;
}

export interface QuotesGetQuoteContextMenuListForViewDetail {
  menuIcon?: string;
  menuKey?: string;
  menuDesc?: string;
  menuGroup?: number;
  quoteStatusId?: number;
  sortOrder?: number;
}

export default class QuotesGetQuoteRevisonContextMenuListForViewDetail {
  revison?: number;
  menuIcon?: string;
  menuKey?: string;
  menuDesc?: string;
  menuGroup?: number;
  sortOrder?: number;
}

export interface QuotesGetQuotesHeaderForViewResult {
  quoteHeader: QuotesGetQuoteHeaderListForViewDetail[];
  revisionFinancials?: QuotesGetRevisionFinancialsListForViewDetail[];
  revisions?: QuotesGetRevisionsListForViewDetail[];
  quoteContextMenu?: QuotesGetQuoteContextMenuListForViewDetail[];
  lostReason?: QuotesGetLostReasonListForViewDetail[];
  revisionContextMenu?: QuotesGetQuoteRevisonContextMenuListForViewDetail[];
}
