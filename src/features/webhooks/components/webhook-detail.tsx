import { ActionPanel, Detail, Icon, useNavigation } from "@raycast/api";
import { getTruthyCheckIcon } from "../../../utils";
import { WebhookActions } from "./webhook-actions";
import { useWebhook } from "../hooks/use-webhook";

export type WebhookDetailProps = {
	webhookId: string;
	onMutate?: () => void;
};

export const WebhookDetail = ({ webhookId, onMutate }: WebhookDetailProps) => {
	const navigation = useNavigation();
	const getWebhook = useWebhook(webhookId);
	const webhook = getWebhook.data;

	if (!webhook) {
		return <Detail isLoading={true} />;
	}

	return (
		<Detail
			navigationTitle="View Webhook"
			markdown={`# ${webhook.id}`}
			isLoading={getWebhook.isLoading}
			actions={
				<ActionPanel>
					<WebhookActions
						webhook={webhook}
						onMutate={() => {
							getWebhook.mutate();

							if (onMutate) {
								onMutate();
							}
						}}
						onDelete={() => {
							navigation.pop();

							if (onMutate) {
								onMutate();
							}
						}}
					/>
				</ActionPanel>
			}
			metadata={
				<Detail.Metadata>
					<Detail.Metadata.Label title="ID" icon={Icon.Key} text={webhook.id} />
					<Detail.Metadata.Link title="URL" target={webhook.url} text={webhook.url} />
					<Detail.Metadata.Label
						title="Created At"
						icon={Icon.Clock}
						text={new Date(webhook.created_at * 1000).toLocaleDateString()}
					/>
					<Detail.Metadata.Label
						title="Enabled"
						icon={getTruthyCheckIcon(webhook.enabled)}
					/>
				</Detail.Metadata>
			}
		/>
	);
};
