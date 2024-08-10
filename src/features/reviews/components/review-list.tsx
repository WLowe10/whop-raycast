import { ActionPanel, Color, Icon, List } from "@raycast/api";
import { EmptyListView } from "../../../components/empty-list-view";
import { useReviews, type UseReviewsOpts } from "../hooks/use-reviews";
import { ReviewActions } from "./review-actions";
import { ShowDetailsAction } from "../../../components/actions";
import { ReviewDetail } from "./review-detail";

type ReviewListItemProps = {
	review: any;
	onMutate: () => void;
};

const ReviewListItem = ({ review, onMutate }: ReviewListItemProps) => {
	const createdAt = new Date(review.created_at * 1000);

	return (
		<List.Item
			actions={
				<ActionPanel>
					<ShowDetailsAction
						target={<ReviewDetail reviewId={review.id} onMutate={onMutate} />}
					/>
					<ReviewActions review={review} onMutate={onMutate} />
				</ActionPanel>
			}
			title={review.id}
			subtitle={review.description}
			accessories={[
				{
					date: createdAt,
					tooltip: `Created on ${createdAt.toLocaleDateString()}`,
				},
				{
					text: {
						value: String(review.stars),
						color: Color.Yellow,
					},
					icon: {
						source: Icon.Star,
						tintColor: Color.Yellow,
					},
				},
				{
					icon: Icon.Box,
					tooltip: review.product_id,
				},
				{
					tag: {
						value: review.status,
						color:
							review.status === "submitted"
								? Color.Green
								: review.status === "pending"
									? Color.Orange
									: Color.Red,
					},
					tooltip: "Status",
				},
			]}
		/>
	);
};

export type ReviewListFilter = UseReviewsOpts;

export type ReviewListProps = {
	filter: ReviewListFilter;
};

export const ReviewList = ({ filter }: ReviewListProps) => {
	const getReviews = useReviews(filter);
	const reviews = getReviews.data;

	return (
		<List navigationTitle="Search Reviews" isLoading={getReviews.isLoading}>
			{reviews.map((review: any) => (
				<ReviewListItem review={review} onMutate={getReviews.mutate} key={review.id} />
			))}
			<EmptyListView title="No Reviews Found" />
		</List>
	);
};
