import { useCachedPromise } from "@raycast/utils";
import { listWebhooks } from "../api";

export const useWebhooks = () => {
	return useCachedPromise(
		() =>
			async ({ page }) => {
				const { data } = await listWebhooks({
					page,
				});

				return {
					data: data.data,
					hasMore: data.pagination.current_page !== data.pagination.total_page,
				};
			},
		[],
		{ keepPreviousData: true, initialData: [] }
	);
};
