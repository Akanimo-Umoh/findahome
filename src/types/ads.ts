export type DateRange =
  | "this-week"
  | "this-month"
  | "last-30-days"
  | "this-year";

export interface AdsStats {
  totalAdsRun: number;
  activeAds: number;
  amountSpent: number;
  ctr: number;
}