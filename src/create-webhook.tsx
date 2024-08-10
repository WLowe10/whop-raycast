import { CommandWrapper } from "./components/command-wrapper";
import { CreateWebhookForm } from "./features/webhooks/components/create-webhook-form";

export default function CreateWebhookCommand() {
	return (
		<CommandWrapper>
			<CreateWebhookForm />
		</CommandWrapper>
	);
}
