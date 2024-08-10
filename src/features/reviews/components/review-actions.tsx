import { Action, ActionPanel } from "@raycast/api";
import { RefreshAction } from "../../../components/actions";
import { OpenInBrowserSection } from "../../../components/action-panel-sections";

export type ReviewActionsProps = {
	review: string;
	onMutate: () => void;
};

export const ReviewActions = ({ review, onMutate }: ReviewActionsProps) => {
	return (
		<>
			<OpenInBrowserSection>
				<Action.OpenInBrowser title="Open Review" url="todo" />
			</OpenInBrowserSection>
			<ActionPanel.Section>
				<RefreshAction onAction={onMutate} />
			</ActionPanel.Section>
		</>
	);
};
