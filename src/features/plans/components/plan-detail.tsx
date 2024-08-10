import { ActionPanel, Detail, Icon } from "@raycast/api";
import { usePlan } from "../hooks/use-plan";
import { PlanActions } from "./plan-actions";
import { getVisibilityIcon } from "../../../utils";

export type PlanDetailProps = {
	planId: string;
	onMutate?: () => void;
};

export const PlanDetail = ({ planId, onMutate }: PlanDetailProps) => {
	const getPlan = usePlan(planId);
	const plan = getPlan.data;

	if (!plan) {
		return <Detail isLoading={true} />;
	}

	return (
		<Detail
			markdown={`# ${plan.id}${plan.internal_notes ? `\n\n${plan.internal_notes}` : ""}`}
			isLoading={getPlan.isLoading}
			actions={
				<ActionPanel>
					<PlanActions
						plan={plan}
						onMutate={() => {
							getPlan.mutate();

							if (onMutate) {
								onMutate();
							}
						}}
					/>
				</ActionPanel>
			}
			metadata={
				<Detail.Metadata>
					<Detail.Metadata.Label title="ID" icon={Icon.Key} text={plan.id} />
					<Detail.Metadata.Link
						title="Checkout URL"
						text={plan.direct_link}
						target={plan.direct_link}
					/>
					<Detail.Metadata.Label title="Product ID" icon={Icon.Box} text={plan.product} />
					<Detail.Metadata.Label
						title="Created At"
						text={new Date(plan.created_at * 1000).toLocaleDateString()}
					/>
					<Detail.Metadata.Label title="Type" text={plan.plan_type} />
					<Detail.Metadata.Label title="Release Method" text={plan.release_method} />
					<Detail.Metadata.Label
						title="Visibility"
						icon={getVisibilityIcon(plan.visibility)}
						text={plan.visibility}
					/>

					<Detail.Metadata.Separator />

					<Detail.Metadata.Label title="Renewal Price" text={plan.renewal_price} />
					<Detail.Metadata.Label title="Initial Price" text={plan.initial_price} />
					<Detail.Metadata.Label title="Base Currency" text={plan.base_currency} />
					<Detail.Metadata.TagList title="Accepted Payment Methods">
						{plan.accepted_payment_methods.map((method: string, idx: number) => (
							<Detail.Metadata.TagList.Item text={method} key={idx} />
						))}
					</Detail.Metadata.TagList>

					<Detail.Metadata.Separator />

					<Detail.Metadata.Label
						title="Stock"
						text={plan.unlimited_stock ? "∞" : String(plan.stock)}
					/>

					<Detail.Metadata.Separator />

					{plan.billing_period && (
						<Detail.Metadata.Label title="Billing Period" text={plan.billing_period} />
					)}
					{plan.internal_notes && (
						<Detail.Metadata.Label title="Internal Notes" text={plan.internal_notes} />
					)}
					{Object.keys(plan.metadata).length > 0 && (
						<Detail.Metadata.Label
							title="Metadata"
							text={JSON.stringify(plan.metadata)}
						/>
					)}
				</Detail.Metadata>
			}
		/>
	);
};
