import { useCachedPromise } from "@raycast/utils";
import { ListMembershipOpts, listMemberships } from "../api";

export type UseMembershipsOpts = Pick<
	ListMembershipOpts,
	"status" | "plan_id" | "product_id" | "user_id"
>;

export const useMemberships = (opts: UseMembershipsOpts) => {
	return useCachedPromise(
		(opts) =>
			async ({ page }) => {
				const { data } = await listMemberships({
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
