import { authenticatedAxios } from "../../utils";

const baseUrl = "https://api.whop.com/api/v5/company/users";

export function getUser(userId: string) {
	return authenticatedAxios.get(`${baseUrl}/${userId}`);
}

export function getSocialAccounts(userId: string) {
	return authenticatedAxios.get(`${baseUrl}/${userId}/social-accounts`);
}
