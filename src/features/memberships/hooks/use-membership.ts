import { useCachedPromise } from "@raycast/utils";
import { getMembership } from "../api";

export const useMembership = (membershipId: string) => {
	return useCachedPromise(
		async (membershipId) => {
			const res = await getMembership(membershipId);

			return res.data;
		},
		[membershipId]
	);
};
