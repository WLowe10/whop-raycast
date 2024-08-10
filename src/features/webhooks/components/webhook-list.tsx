import { Action, ActionPanel, List } from "@raycast/api";
import { getTruthyCircleIcon } from "../../../utils";
import { EmptyListView } from "../../../components/empty-list-view";
import { ShowDetailsAction } from "../../../components/actions";
import { useWebhooks } from "../hooks/use-webhooks";
import { WebhookActions } from "./webhook-actions";
import { WebhookDetail } from "./webhook-detail";
import { CreateWebhookForm } from "./create-webhook-form";

type WebhookListItemProps = {
	webhook: any;
	onMutate: () => void;
};

const WebhookListItem = ({ webhook, onMutate }: WebhookListItemProps) => {
	const createdAt = new Date(webhook.created_at * 1000);

	return (
		<List.Item
			title={{
				tooltip: webhook.id,
				value: webhook.url,
			}}
			accessories={[
				{
					tooltip: `Created on ${createdAt.toLocaleDateString()}`,
					date: createdAt,
				},
				{
					tooltip: webhook.enabled ? "enabled" : "disabled",
					icon: getTruthyCircleIcon(webhook.enabled),
				},
			]}
			actions={
				<ActionPanel title={webhook.id}>
					<ShowDetailsAction
						target={<WebhookDetail webhookId={webhook.id} onMutate={onMutate} />}
					/>
					<WebhookActions webhook={webhook} onMutate={onMutate} onDelete={onMutate} />
				</ActionPanel>
			}
		/>
	);
};

export const WebhookList = () => {
	const getWebhooks = useWebhooks();
	const webhooks = getWebhooks.data;

	return (
		<List
			navigationTitle="Search Webhooks"
			isLoading={getWebhooks.isLoading}
			pagination={getWebhooks.pagination}
		>
			{webhooks.map((webhook: any) => (
				<WebhookListItem webhook={webhook} onMutate={getWebhooks.mutate} key={webhook.id} />
			))}
			<EmptyListView
				title="No Webhooks Found"
				actions={
					<ActionPanel>
						<Action.Push
							title="Create Webhook"
							target={<CreateWebhookForm onMutate={getWebhooks.mutate} />}
						/>
					</ActionPanel>
				}
			/>
		</List>
	);
};
