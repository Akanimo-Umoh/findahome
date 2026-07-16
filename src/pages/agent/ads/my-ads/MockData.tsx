import type { AdsStats, DateRange } from "@/types/ads"

export const adsStatsData: Record<DateRange, AdsStats> = {
  "this-week": {
    totalAdsRun: 12,
    activeAds: 5,
    amountSpent: 48000,
    ctr: 2.1,
  },

  "this-month": {
    totalAdsRun: 46,
    activeAds: 18,
    amountSpent: 182000,
    ctr: 3.4,
  },

  "last-30-days": {
    totalAdsRun: 58,
    activeAds: 21,
    amountSpent: 241000,
    ctr: 3.1,
  },

  "this-year": {
    totalAdsRun: 420,
    activeAds: 74,
    amountSpent: 2140000,
    ctr: 3.7,
  },
}
