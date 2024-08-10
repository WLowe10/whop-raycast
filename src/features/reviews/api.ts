import { authenticatedAxios } from "../../utils";

const baseUrl = "https://api.whop.com/api/v5/company/reviews";

export type ListReviewsOpts = {
	page: number;
	per?: number;
	product_id?: string;
	user_id?: string;
	stars?: number;
	status?: "pending" | "published" | "removed";
};

export function listReviews(opts: ListReviewsOpts) {
	return authenticatedAxios.get(baseUrl, {
		params: opts,
	});
}

export function getReview(reviewId: string) {
	return authenticatedAxios.get(`${baseUrl}/${reviewId}`);
}
