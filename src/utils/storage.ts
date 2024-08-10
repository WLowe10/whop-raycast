export const StorageKeys = {
	PREV_WHOP_API_KEY: "prev_whop_api_key",
	BIZ_ID: "biz_id",
	SLUG: "slug",
} as const;

export type StorageKeysType = (typeof StorageKeys)[keyof typeof StorageKeys];
