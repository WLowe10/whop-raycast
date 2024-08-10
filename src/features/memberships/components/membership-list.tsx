import { Action, ActionPanel, List, Icon, Image } from "@raycast/api";
import { formatDistanceToNow, isFuture } from "date-fns";
import { EmptyListView } from "../../../components/empty-list-view";
import { useMemberships, type UseMembershipsOpts } from "../hooks/use-memberships";
import { MembershipDetail } from "./membership-detail";
import { MembershipActions } from "./membership-actions";

type MembershipListItemProps = {
	membership: any;
	onMutate: () => void;
};

const MembershipListItem = ({ membership, onMutate }: MembershipListItemProps) => {
	const accessories: List.Item.Accessory[] = [
		{
			tag: membership.status,
			tooltip: "Status",
		},
		{
			icon: Icon.Box,
			tooltip: membership.product,
		},
		{
			icon: Icon.Person,
			tooltip: membership.user.id,
		},
		{
			icon: Icon.Envelope,
			tooltip: membership.email,
		},
	];

	if (membership.expires_at) {
		const expirationDate = new Date(membership.expires_at * 1000);

		accessories.push({
			icon: Icon.Clock,
			tooltip: `${isFuture(expirationDate) ? "Expires" : "Expired"} ${formatDistanceToNow(expirationDate, { addSuffix: true })}`,
		});
	}

	return (
		<List.Item
			title={membership.user.username}
			subtitle={membership.id}
			accessories={accessories}
			icon={{
				source: membership.user.profile_pic_url,
				mask: Image.Mask.Circle,
			}}
			actions={
				<ActionPanel title={membership.id}>
					<Action.Push
						title="Show Details"
						icon={Icon.AppWindowSidebarRight}
						target={
							<MembershipDetail membershipId={membership.id} onMutate={onMutate} />
						}
					/>
					<MembershipActions membership={membership} onMutate={onMutate} />
				</ActionPanel>
			}
		/>
	);
};

export type MembershipListFilter = UseMembershipsOpts;

export type MembershipListProps = {
	filter: MembershipListFilter;
};

export const MembershipList = ({ filter }: MembershipListProps) => {
	const getMemberships = useMemberships(filter);
	const memberships = getMemberships.data;

	return (
		<List
			navigationTitle="Search Memberships"
			isLoading={getMemberships.isLoading}
			pagination={getMemberships.pagination}
		>
			{memberships.map((membership: any) => (
				<MembershipListItem
					membership={membership}
					onMutate={getMemberships.mutate}
					key={membership.id}
				/>
			))}
			<EmptyListView title="No Memberships Found" />
		</List>
	);
};
