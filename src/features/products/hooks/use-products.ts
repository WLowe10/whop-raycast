import { useCachedPromise } from "@raycast/utils";
import { listProducts } from "../api";

export const useProducts = () => {
	return useCachedPromise(
		() =>
			async ({ page }) => {
				const { data } = await listProducts({
					page,
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
