import { CommandWrapper } from "./components/command-wrapper";
import { ReviewDetail } from "./features/reviews/components/review-detail";
import type { LaunchProps } from "@raycast/api";

export default function ViewReviewCommand(
	props: LaunchProps<{ arguments: { review_id: string } }>
) {
	return (
		<CommandWrapper>
			<ReviewDetail reviewId={props.arguments.review_id} />
		</CommandWrapper>
	);
}
