import { Action, ActionPanel, Form, showToast, Toast } from "@raycast/api";
import { useForm } from "@raycast/utils";
import { validateWebhookURL } from "../utils";
import { createWebhook, type CreateWebhookData } from "../api";

const defaultData = {
	url: "",
	enabled: true,
	events: [
		"membership_went_valid",
		"membership_went_invalid",
		"membership_metadata_updated",
		"membership_experience_claimed",
		"membership_cancel_at_period_end_changed",
		"payment_succeeded",
		"payment_failed",
		"payment_affiliate_reward_created",
	],
};

export type CreateWebhookFormProps = {
	onMutate?: () => void;
};

export const CreateWebhookForm = ({ onMutate }: CreateWebhookFormProps) => {
	const form = useForm<CreateWebhookData>({
		initialValues: defaultData,
		validation: {
			url: validateWebhookURL,
		},
		onSubmit: async (values) => {
			const toast = await showToast({
				style: Toast.Style.Animated,
				title: "Creating webhook",
			});

			try {
				await createWebhook(values);

				toast.style = Toast.Style.Success;
				toast.title = "Created Webhook";

				form.reset(defaultData);

				if (onMutate) {
					onMutate();
				}
			} catch {
				toast.style = Toast.Style.Failure;
				toast.title = "Failed to Create Webhook";
			}
		},
	});

	return (
		<Form
			navigationTitle="Create Webhook"
			actions={
				<ActionPanel>
					<Action.SubmitForm title="Create Webhook" onSubmit={form.handleSubmit} />
				</ActionPanel>
			}
		>
			<Form.TextField
				title="URL"
				placeholder="https://website.com/api/whop/webhook"
				info="The URL where new webhook events will be sent to"
				{...form.itemProps.url}
			/>
			<Form.TagPicker
				title="Events"
				info="A list of events the webhook will receive"
				{...form.itemProps.events}
			>
				<Form.TagPicker.Item value="membership_went_valid" title="membership_went_valid" />
				<Form.TagPicker.Item
					value="membership_went_invalid"
					title="membership_went_invalid"
				/>
				<Form.TagPicker.Item
					value="membership_metadata_updated"
					title="membership_metadata_updated"
				/>
				<Form.TagPicker.Item
					value="membership_experience_claimed"
					title="membership_experience_claimed"
				/>
				<Form.TagPicker.Item
					value="membership_cancel_at_period_end_changed"
					title="membership_cancel_at_period_end_changed"
				/>
				<Form.TagPicker.Item value="payment_succeeded" title="payment_succeeded" />
				<Form.TagPicker.Item value="payment_failed" title="payment_failed" />
				<Form.TagPicker.Item
					value="payment_affiliate_reward_created"
					title="payment_affiliate_reward_created"
				/>
			</Form.TagPicker>

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
