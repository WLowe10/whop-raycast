import { authenticatedAxios } from "../../utils";

const baseUrl = "https://api.whop.com/api/v2/plans";

export type ListPlansOpts = {
	per: number;
	page: number;
	product_id?: string;
	visibility?: "visible" | "hidden" | "archived" | "quick_link";
};

export function listPlans(opts: ListPlansOpts) {
	return authenticatedAxios.get(baseUrl, {
		params: {
			...opts,
			expand: ["product"],
		},
	});
}

export function getPlan(planId: string) {
	return authenticatedAxios.get(`${baseUrl}/${planId}`);
}
