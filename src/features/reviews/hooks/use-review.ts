import { useCachedPromise } from "@raycast/utils";
import { getReview } from "../api";
import { getUser } from "../../users/api";

export const useReview = (reviewId: string) => {
	return useCachedPromise(
		async (reviewId) => {
			const { data: review } = await getReview(reviewId);
			const { data: user } = await getUser(review.user_id);

			return {
				review,
				user,
			};
		},
		[reviewId]
	);
};
