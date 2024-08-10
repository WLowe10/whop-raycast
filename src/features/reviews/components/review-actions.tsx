import { ActionPanel } from "@raycast/api";
import { RefreshAction } from "../../../components/actions";

export type ReviewActionsProps = {
	review: string;
	onMutate: () => void;
};

export const ReviewActions = ({ review, onMutate }: ReviewActionsProps) => {
	return (
		<>
			{/* todo  */}
			{/* <OpenInBrowserSection>
				<Action.OpenInBrowser title="Open Review" url="todo" />
			</OpenInBrowserSection> */}
			<ActionPanel.Section>
				<RefreshAction onAction={onMutate} />
			</ActionPanel.Section>
		</>
	);
};
