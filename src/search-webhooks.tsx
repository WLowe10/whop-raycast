import { CommandWrapper } from "./components/command-wrapper";
import { WebhookList } from "./features/webhooks/components/webhook-list";

export default function SearchWebhooksCommand() {
	return (
		<CommandWrapper>
			<WebhookList />
		</CommandWrapper>
	);
}
