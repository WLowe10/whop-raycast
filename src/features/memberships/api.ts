import { authenticatedAxios } from "../../utils";

const baseUrl = "https://api.whop.com/api/v2/memberships";

export type ListMembershipOpts = {
	page: number;
	per?: number;
	status?:
		| "active"
		| "completed"
		| "trialing"
		| "past_due"
		| "unresolved"
		| "canceled"
		| "expired";
	plan_id?: string;
	product_id?: string;
	user_id?: string;
};

export function listMemberships(opts: ListMembershipOpts) {
	return authenticatedAxios.get(baseUrl, {
		params: {
			...opts,
			expand: ["user"],
		},
	});
}

export function getMembership(membershipId: string) {
	return authenticatedAxios.get(`${baseUrl}/${membershipId}`);
}

export type UpdateMembershipData = {
	metadata: object;
};

export function updateMembership(membershipId: string, data: UpdateMembershipData) {
	return authenticatedAxios.post(`${baseUrl}/${membershipId}`, data);
}

export function cancelMembership(membershipId: string) {
	return authenticatedAxios.post(`${baseUrl}/${membershipId}/cancel`);
}

export function terminateMembership(membershipId: string) {
	return authenticatedAxios.post(`${baseUrl}/${membershipId}/terminate`);
}
