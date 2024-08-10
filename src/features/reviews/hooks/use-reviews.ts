import { useCachedPromise } from "@raycast/utils";
import { listReviews, ListReviewsOpts } from "../api";

export type UseReviewsOpts = Pick<ListReviewsOpts, "product_id" | "user_id" | "stars" | "status">;

export const useReviews = (opts: UseReviewsOpts) => {
	return useCachedPromise(
		() =>
			async ({ page }) => {
				const { data } = await listReviews({
					page,
					...opts,
				});

				return {
					data: data.data,
					hasMore: data.pagination.next_page !== null,
				};
			},
		[],
		{ keepPreviousData: true, initialData: [] }
	);
};
