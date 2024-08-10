import { useCachedPromise } from "@raycast/utils";
import { getWebhook } from "../api";

export const useWebhook = (webhookId: string) => {
	return useCachedPromise(
		async (webhookId) => {
			const res = await getWebhook(webhookId);

			return res.data;
		},
		[webhookId]
	);
};
