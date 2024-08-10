import { useCachedPromise } from "@raycast/utils";
import { getProduct } from "../api";

export const useProduct = (productId: string) => {
	return useCachedPromise(
		async (productId) => {
			const res = await getProduct(productId);

			return res.data;
		},
		[productId]
	);
};
