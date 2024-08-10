import { ActionPanel, Detail, useNavigation } from "@raycast/api";
import { MembershipActions } from "./membership-actions";
import { getTruthyCheckIcon } from "../../../utils";
import { useMembership } from "../hooks/use-membership";

export type MembershipDetailProps = {
	membershipId: string;
	onMutate?: () => void;
};

export const MembershipDetail = ({ membershipId, onMutate }: MembershipDetailProps) => {
	const getMembership = useMembership(membershipId);
	const membership = getMembership.data;

	if (!membership) {
		return <Detail isLoading={true} />;
	}

	const hasMetadata = Object.keys(membership.metadata).length > 0;
	const formattedMetadata = JSON.stringify(membership.metadata, null, 2);

	return (
		<Detail
			navigationTitle="View Membership"
			markdown={`# ${membership.id}${hasMetadata ? `\n---\n### Metadata\n\n\`\`\`json\n${formattedMetadata}\n\`\`\`` : ""}`}
			actions={
				<ActionPanel>
					<MembershipActions
						membership={membership}
						onMutate={() => {
							getMembership.mutate();

							if (onMutate) {
								onMutate();
							}
						}}
					/>
				</ActionPanel>
			}
			metadata={
				<Detail.Metadata>
					<Detail.Metadata.Label title="ID" text={membership.id} />
					<Detail.Metadata.Label title="Product ID" text={membership.product} />
					<Detail.Metadata.Label title="User ID" text={membership.user} />
					<Detail.Metadata.Label title="Plan ID" text={membership.plan} />
					<Detail.Metadata.Label title="Status" text={membership.status} />
					<Detail.Metadata.Label
						title="Valid"
						icon={getTruthyCheckIcon(membership.valid)}
					/>

					<Detail.Metadata.Separator />

					<Detail.Metadata.Label title="Email" text={membership.email} />
					{membership.discord_id && (
						<Detail.Metadata.Label title="Discord ID" text={membership.discord_id} />
					)}
					{membership.telegram_id && (
						<Detail.Metadata.Label title="Telegram ID" text={membership.telegram_id} />
					)}

					<Detail.Metadata.Separator />

					<Detail.Metadata.Label
						title="Created At"
						text={new Date(membership.created_at * 1000).toLocaleDateString()}
					/>
					{membership.expires_at && (
						<Detail.Metadata.Label
							title="Expires at"
							text={new Date(membership.expires_at * 1000).toLocaleDateString()}
						/>
					)}

					<Detail.Metadata.Label
						title="Cancel at period end"
						icon={getTruthyCheckIcon(membership.cancel_at_period_end)}
					/>

					<Detail.Metadata.Separator />

					{membership.wallet_address && (
						<Detail.Metadata.Label
							title="Wallet Adress"
							text={membership.wallet_address}
						/>
					)}
					{hasMetadata && (
						<Detail.Metadata.Label title="Metadata" text={formattedMetadata} />
					)}
				</Detail.Metadata>
			}
		/>
	);
};
