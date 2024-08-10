import { Action, ActionPanel, confirmAlert, Icon, showToast, Toast } from "@raycast/api";
import { EditWebhookForm } from "./edit-webhook-form";
import { RefreshAction } from "../../../components/actions";
import { updateWebhook, deleteWebhook } from "../api";
import { OpenInBrowserSection } from "../../../components/action-panel-sections";
import { useUrlBuilders } from "../../../hooks/use-url-builders";

export type WebhookActionsProps = {
	webhook: any;
	onMutate: () => void;
	onDelete: () => void;
};

export const WebhookActions = ({ webhook, onMutate, onDelete }: WebhookActionsProps) => {
	const builders = useUrlBuilders();

	if (builders.isLoading) {
		return null;
	}

	const { buildDashUrl } = builders;

	const handleEnableWebhook = async () => {
		const toast = await showToast({
			style: Toast.Style.Animated,
			title: "Enabling webhook",
		});

		try {
			await updateWebhook(webhook.id, {
				enabled: true,
			});

			toast.style = Toast.Style.Success;
			toast.title = "Enabled Webhook";

			onMutate();
		} catch (err) {
			toast.style = Toast.Style.Failure;
			toast.title = "Failed to Enable Webhook";
		}
	};

	const handleDisableWebhook = async () => {
		const toast = await showToast({
			style: Toast.Style.Animated,
			title: "Disabling webhook",
		});

		try {
			await updateWebhook(webhook.id, {
				enabled: false,
			});

			toast.style = Toast.Style.Success;
			toast.title = "Disabled Webhook";

			onMutate();
		} catch {
			toast.style = Toast.Style.Failure;
			toast.title = "Failed to Disable Webhook";
		}
	};

	const handleDeleteWebhook = async () => {
		const confirmed = await confirmAlert({
			title: "Delete Webhook",
			message: "Are you sure you want to delete this webhook?",
			icon: Icon.Stop,
		});

		if (!confirmed) {
			return;
		}
		const toast = await showToast({
			style: Toast.Style.Animated,
			title: "Deleting webhook",
		});

		try {
			await deleteWebhook(webhook.id);

			toast.style = Toast.Style.Success;
			toast.title = "Deleted Webhook";

			onDelete();
		} catch {
			toast.style = Toast.Style.Failure;
			toast.title = "Failed to Delete Webhook";
		}
	};

	return (
		<>
			<ActionPanel.Section>
				{webhook.enabled ? (
					<Action
						title="Disable Webhook"
						icon={Icon.Stop}
						onAction={handleDisableWebhook}
					/>
				) : (
					<Action
						title="Enable Webhook"
						icon={Icon.Play}
						onAction={handleEnableWebhook}
					/>
				)}
				<Action.Push
					title="Edit Webhook"
					icon={Icon.Pencil}
					target={<EditWebhookForm webhookId={webhook.id} onMutate={onMutate} />}
				/>
				<Action
					title="Delete Webhook"
					icon={Icon.Trash}
					style={Action.Style.Destructive}
					onAction={handleDeleteWebhook}
				/>
			</ActionPanel.Section>
			<ActionPanel.Section>
				<Action.CopyToClipboard title="Copy Webhook ID" content={webhook.id} />
				<Action.CopyToClipboard title="Copy Webhook URL" content={webhook.url} />
			</ActionPanel.Section>
			<ActionPanel.Section>
				<RefreshAction onAction={onMutate} />
			</ActionPanel.Section>
		</>
	);
};
