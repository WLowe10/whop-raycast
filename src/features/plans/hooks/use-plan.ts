import { useCachedPromise } from "@raycast/utils";
import { getPlan } from "../api";

export const usePlan = (planId: string) => {
	return useCachedPromise(
		async (planId) => {
			const res = await getPlan(planId);

			return res.data;
		},
		[planId]
	);
};
