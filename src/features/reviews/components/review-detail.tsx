import { ActionPanel, Detail, Image } from "@raycast/api";
import { ReviewActions } from "./review-actions";
import { useReview } from "../hooks/use-review";

export type ReviewDetailProps = {
	reviewId: string;
	onMutate?: () => void;
};

function createReviewMarkdown({
	stars,
	name,
	date,
	content,
}: {
	stars: number;
	name: string;
	date: Date;
	content: string;
}) {
	return `${"⭐".repeat(stars)} • ${name} \`${date.toLocaleDateString()}\`\n> ${content}`;
}

export const ReviewDetail = ({ reviewId, onMutate }: ReviewDetailProps) => {
	const getReview = useReview(reviewId);
	const reviewData = getReview.data;

	if (!reviewData) {
		return <Detail isLoading={true} />;
	}

	// const md = createReviewMarkdown({
	// 	date: new Date(),
	// 	name: "Wes Lowe",
	// 	stars: 5,
	// 	content:
	// 		"I love Whop so much! It really helped me sell a course and build a community around my skills and what I love to do. I heavily recommend any creator to hop on Whop no matter their skill. Whop brings you more value than money.",
	// });

	const createdAt = new Date(reviewData.review.created_at * 1000);

	return (
		<Detail
			isLoading={getReview.isLoading}
			markdown={createReviewMarkdown({
				name: reviewData.user.name,
				content: reviewData.review.description,
				stars: reviewData.review.stars,
				date: createdAt,
			})}
			actions={
				<ActionPanel>
					<ReviewActions
						review={reviewData.review}
						onMutate={() => {
							getReview.mutate();

							if (onMutate) {
								onMutate();
							}
						}}
					/>
				</ActionPanel>
			}
			metadata={
				<Detail.Metadata>
					<Detail.Metadata.Label title="ID" text={reviewData.review.id} />
					<Detail.Metadata.Label title="Description" text={reviewData.review.status} />
					<Detail.Metadata.Label title="Status" text={reviewData.review.description} />

					<Detail.Metadata.Separator />

					<Detail.Metadata.Label title="User ID" text={reviewData.user.id} />
					<Detail.Metadata.Label title="Username" text={reviewData.user.username} />
					<Detail.Metadata.Label title="Name" text={reviewData.user.name} />
					<Detail.Metadata.Label title="Email" text={reviewData.user.email} />
					<Detail.Metadata.Label
						title="Picture"
						icon={{
							source: reviewData.user.profile_pic_url,
							mask: Image.Mask.Circle,
						}}
					/>

					<Detail.Metadata.Separator />

					<Detail.Metadata.Label title="Product ID" text={reviewData.review.product_id} />

					<Detail.Metadata.Separator />

					<Detail.Metadata.Label
						title="Created At"
						text={createdAt.toLocaleDateString()}
					/>
				</Detail.Metadata>
			}
		/>
	);
};
