import { useCachedPromise } from "@raycast/utils";
import { listPlans, ListPlansOpts } from "../api";

export type UsePlansOpts = Pick<ListPlansOpts, "product_id" | "visibility">;

export const usePlans = (opts?: UsePlansOpts) => {
	return useCachedPromise(
		(opts) =>
			async ({ page }) => {
				const { data } = await listPlans({
					page,
					...opts,
				});

				return {
					data: data.data,
					hasMore: data.pagination.current_page !== data.pagination.total_page,
				};
			},
		[opts],
		{ keepPreviousData: true, initialData: [] }
	);
};
