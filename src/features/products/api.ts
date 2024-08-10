import { authenticatedAxios } from "../../utils";

const baseUrl = "https://api.whop.com/api/v5/company/products";

export type ListProductsOpts = {
	page: number;
	per?: number;
};

export function listProducts(opts: ListProductsOpts) {
	return authenticatedAxios.get(baseUrl, {
		params: opts,
	});
}

export function getProduct(productId: string) {
	return authenticatedAxios.get(`${baseUrl}/${productId}`);
}
