import { Action, ActionPanel, Icon } from "@raycast/api";
import { RefreshAction } from "../../../components/actions";
import { OpenInBrowserSection } from "../../../components/action-panel-sections";
import { useUrlBuilders } from "../../../hooks/use-url-builders";

export type PlanActionsProps = {
	plan: any;
	onMutate: () => void;
};

// consider adding a sub dropdown to change of plan

export const PlanActions = ({ plan, onMutate }: PlanActionsProps) => {
	const builders = useUrlBuilders();

	if (builders.isLoading) {
		return null;
	}

	const { buildHubUrl } = builders;

	return (
		<>
			<OpenInBrowserSection>
				<Action.OpenInBrowser
					title="Open Plan"
					url={buildHubUrl("products", plan.product.id, `?plan_id=${plan.id}`)}
				/>
				<Action.OpenInBrowser title="Open Checkout URL" url={plan.direct_link} />
			</OpenInBrowserSection>
			<ActionPanel.Section>
				<Action.CopyToClipboard title="Copy Plan ID" content={plan.id} />
				<Action.CopyToClipboard title="Copy Product ID" content={plan.product.id} />
				<Action.CopyToClipboard title="Copy Checkout URL" content={plan.direct_link} />
			</ActionPanel.Section>
			<ActionPanel.Section>
				<RefreshAction onAction={onMutate} />
			</ActionPanel.Section>
		</>
	);
};
