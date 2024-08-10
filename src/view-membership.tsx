import { CommandWrapper } from "./components/command-wrapper";
import { MembershipDetail } from "./features/memberships/components/membership-detail";
import type { LaunchProps } from "@raycast/api";

export default function ViewMembershipCommand(
	props: LaunchProps<{ arguments: { membership_id: string } }>
) {
	return (
		<CommandWrapper>
			<MembershipDetail membershipId={props.arguments.membership_id} />
		</CommandWrapper>
	);
}
