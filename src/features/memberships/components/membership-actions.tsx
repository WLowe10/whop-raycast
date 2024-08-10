import { Action, ActionPanel, confirmAlert, Icon, showToast, Toast } from "@raycast/api";
import { EditMembershipForm } from "./edit-membership-form";
import { RefreshAction } from "../../../components/actions";
import { OpenInBrowserSection } from "../../../components/action-panel-sections";
import { useUrlBuilders } from "../../../hooks/use-url-builders";
import { cancelMembership, terminateMembership } from "../api";

export type MembershipActionsProps = {
	membership: any;
	onMutate: () => void;
};

export const MembershipActions = ({ membership, onMutate }: MembershipActionsProps) => {
	const builders = useUrlBuilders();

	if (builders.isLoading) {
		return null;
	}

	const { buildDashUrl } = builders;

	const handleCancelMembership = async () => {
		const confirmed = await confirmAlert({
			title: "Cancel Membership",
			message: "Are you sure you want to cancel this membership?",
			icon: Icon.Stop,
		});

		if (!confirmed) {
			return;
		}

		const toast = await showToast({
			style: Toast.Style.Animated,
			title: "Canceling membership",
		});

		try {
			await cancelMembership(membership.id);

			toast.style = Toast.Style.Success;
			toast.title = "Canceled Membership";

			onMutate();
		} catch {
			toast.style = Toast.Style.Failure;
			toast.title = "Failed to Cancel Membership";
		}
	};

	const handleTerminateMembership = async () => {
		const confirmed = await confirmAlert({
			title: "Terminate Membership",
			message: "Are you sure you want to terminate this membership?",
			icon: Icon.Stop,
		});

		if (!confirmed) {
			return;
		}

		const toast = await showToast({
			style: Toast.Style.Animated,
			title: "Terminating membership",
		});

		try {
			await terminateMembership(membership.id);

			toast.style = Toast.Style.Success;
			toast.title = "Terminated membership";

			onMutate();
		} catch {
			toast.style = Toast.Style.Failure;
			toast.title = "Failed to Terminate Membership";
		}
	};

	return (
		<>
			<OpenInBrowserSection>
				<Action.OpenInBrowser
					title="Open Membership"
					url={buildDashUrl("memberships", membership.id)}
				/>
			</OpenInBrowserSection>
			<ActionPanel.Section>
				<Action.Push
					title="Edit Membership"
					icon={Icon.Pencil}
					target={<EditMembershipForm membershipId={membership.id} onMutate={onMutate} />}
				/>
				{membership.valid && (
					<>
						<Action
							title="Cancel Membership"
							icon={Icon.Stop}
							style={Action.Style.Destructive}
							onAction={handleCancelMembership}
						/>
						<Action
							title="Terminate Membership"
							icon={Icon.Hammer}
							style={Action.Style.Destructive}
							onAction={handleTerminateMembership}
						/>
					</>
				)}
			</ActionPanel.Section>
			<ActionPanel.Section>
				<Action.CopyToClipboard title="Copy Membership ID" content={membership.id} />
				<Action.CopyToClipboard title="Copy User ID" content={membership.user.id} />
				<Action.CopyToClipboard title="Copy Product ID" content={membership.product} />
			</ActionPanel.Section>
			<ActionPanel.Section>
				<RefreshAction onAction={onMutate} />
			</ActionPanel.Section>
		</>
	);
};
