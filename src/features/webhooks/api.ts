import { authenticatedAxios } from "../../utils";

const baseUrl = "https://api.whop.com/api/v2/webhooks";

export type ListWebhooksOpts = {
	page: number;
	per?: number;
};

export function listWebhooks(opts: ListWebhooksOpts) {
	return authenticatedAxios.get(baseUrl, {
		params: {
			per: opts.per,
			page: opts.page,
		},
	});
}

export function getWebhook(webhookId: string) {
	return authenticatedAxios.get(`${baseUrl}/${webhookId}`);
}

export type CreateWebhookData = {
	url: string;
	events: string[];
	enabled: boolean;
};

export function createWebhook(data: CreateWebhookData) {
	return authenticatedAxios.post(baseUrl, data);
}

export type UpdateWebhookData = Partial<CreateWebhookData>;

export function updateWebhook(webhookId: string, data: UpdateWebhookData) {
	return authenticatedAxios.post(`${baseUrl}/${webhookId}`, data);
}

export function deleteWebhook(webhookId: string) {
	return authenticatedAxios.delete(`${baseUrl}/${webhookId}`);
}
