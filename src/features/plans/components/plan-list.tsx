import { ActionPanel, List } from "@raycast/api";
import { getVisibilityIcon } from "../../../utils";
import { ShowDetailsAction } from "../../../components/actions";
import { EmptyListView } from "../../../components/empty-list-view";
import { usePlans, type UsePlansOpts } from "../hooks/use-plans";
import { PlanDetail } from "./plan-detail";
import { PlanActions } from "./plan-actions";

type PlanListItemProps = {
	plan: any;
	onMutate: () => void;
};

const PlanListItem = ({ plan, onMutate }: PlanListItemProps) => {
	const createdAt = new Date(plan.created_at * 1000);

	return (
		<List.Item
			actions={
				<ActionPanel title={plan.id}>
					<ShowDetailsAction
						target={<PlanDetail planId={plan.id} onMutate={onMutate} />}
					/>
					<PlanActions plan={plan} onMutate={onMutate} />
				</ActionPanel>
			}
			title={plan.id}
			subtitle={{
				value: plan.product.name,
				tooltip: plan.product.id,
			}}
			accessories={[
				{
					date: createdAt,
					tooltip: `Created on ${createdAt.toLocaleDateString()}`,
				},
				{
					tag: plan.unlimited_stock ? "∞" : String(plan.stock),
					tooltip: "Stock remaining",
				},
				{
					icon: getVisibilityIcon(plan.visibility),
					tooltip: plan.visibility,
				},
			]}
		/>
	);
};

export type PlanListFilter = UsePlansOpts;

export type PlanListProps = {
	filter: PlanListFilter;
};

export const PlanList = ({ filter }: PlanListProps) => {
	const getPlans = usePlans(filter);
	const plans = getPlans.data;

	return (
		<List isLoading={getPlans.isLoading} pagination={getPlans.pagination}>
			{plans.map((plan: any) => (
				<PlanListItem plan={plan} onMutate={getPlans.mutate} key={plan.id} />
			))}
			<EmptyListView title="No Plans Found" />
		</List>
	);
};
