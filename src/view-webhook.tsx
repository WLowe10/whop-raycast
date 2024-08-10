import { CommandWrapper } from "./components/command-wrapper";
import { WebhookDetail } from "./features/webhooks/components/webhook-detail";
import type { LaunchProps } from "@raycast/api";

export default function ViewWebhookCommand(
	props: LaunchProps<{ arguments: { webhook_id: string } }>
) {
	return (
		<CommandWrapper>
			<WebhookDetail webhookId={props.arguments.webhook_id} />
		</CommandWrapper>
	);
}
