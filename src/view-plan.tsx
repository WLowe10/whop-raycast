import { CommandWrapper } from "./components/command-wrapper";
import { PlanDetail } from "./features/plans/components/plan-detail";
import type { LaunchProps } from "@raycast/api";

export default function ViewPlanCommand(props: LaunchProps<{ arguments: { plan_id: string } }>) {
	return (
		<CommandWrapper>
			<PlanDetail planId={props.arguments.plan_id} />
		</CommandWrapper>
	);
}
