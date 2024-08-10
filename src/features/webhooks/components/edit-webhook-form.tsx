import { Action, ActionPanel, Form, showToast, Toast } from "@raycast/api";
import { useForm } from "@raycast/utils";
import { useWebhook } from "../hooks/use-webhook";
import { validateWebhookURL } from "../utils";
import { updateWebhook, type UpdateWebhookData } from "../api";

export type EditWebhookFormProps = {
	webhookId: string;
	onMutate: () => void;
};

export const EditWebhookForm = ({ webhookId, onMutate }: EditWebhookFormProps) => {
	const getWebhook = useWebhook(webhookId);
	const webhook = getWebhook.data;

	const form = useForm<Required<UpdateWebhookData>>({
		initialValues: webhook,
		validation: {
			url: validateWebhookURL,
		},
		onSubmit: async (values) => {
			const toast = await showToast({
				style: Toast.Style.Animated,
				title: "Editing webhook",
			});

			try {
				await updateWebhook(webhookId, values);

				toast.style = Toast.Style.Success;
				toast.title = "Edited Webhook";

				getWebhook.mutate();
				onMutate();
			} catch (err) {
				console.log(err);
				toast.style = Toast.Style.Failure;
				toast.title = "Failed to Edit Webhook";
			}
		},
	});

	return (
		<Form
			isLoading={getWebhook.isLoading}
			actions={
				<ActionPanel>
					<Action.SubmitForm title="Edit Webhook" onSubmit={form.handleSubmit} />
				</ActionPanel>
			}
		>
			<Form.TextField
				title="URL"
				placeholder="https://website.com/api/whop/webhook"
				info="The URL where new webhook events will be sent to"
				{...form.itemProps.url}
			/>

			<Form.Separator />

			<Form.Checkbox
				title="Enabled"
				info="Whether or not the specified webhook is enabled for new event notifications"
				label=""
				{...form.itemProps.enabled}
			/>
		</Form>
	);
};
