import { Action, ActionPanel, Color, Form, Icon, useNavigation, type Image } from "@raycast/api";
import { useForm } from "@raycast/utils";
import { ProductDropdown } from "../../products/components/product-dropdown";
import { ReviewList, type ReviewListFilter } from "./review-list";

const starImg: Image = {
	source: Icon.Star,
	tintColor: Color.Yellow,
} as const;

export type SearchReviewsFormProps = {
	initialValues?: ReviewListFilter;
};

export const SearchReviewsForm = ({ initialValues }: SearchReviewsFormProps) => {
	const navigation = useNavigation();

	const form = useForm<ReviewListFilter>({
		initialValues,
		onSubmit: (values) => {
			navigation.push(
				<ReviewList
					filter={{
						...values,
						stars: parseInt(values.stars as unknown as string),
					}}
				/>
			);
		},
	});

	return (
		<Form
			actions={
				<ActionPanel>
					<Action.SubmitForm title="Search Reviews" onSubmit={form.handleSubmit} />
				</ActionPanel>
			}
		>
			<ProductDropdown info="The product a review is for" {...form.itemProps.product_id} />
			<Form.TextField
				title="User ID"
				info="The ID of the user that created the review"
				placeholder="user_*************"
				{...form.itemProps.user_id}
			/>
			{/* @ts-ignore */}
			<Form.Dropdown
				title="Stars"
				info="The number of stars of the review"
				{...form.itemProps.stars}
			>
				<Form.Dropdown.Item title="5" value="5" icon={starImg} />
				<Form.Dropdown.Item title="4" value="4" icon={starImg} />
				<Form.Dropdown.Item title="3" value="3" icon={starImg} />
				<Form.Dropdown.Item title="2" value="2" icon={starImg} />
				<Form.Dropdown.Item title="1" value="1" icon={starImg} />
			</Form.Dropdown>

			<Form.Separator />

			{/* @ts-ignore */}
			<Form.Dropdown
				title="Status"
				info="The status of the review"
				{...form.itemProps.status}
			>
				<Form.Dropdown.Item
					title="Published"
					value="published"
					icon={{
						source: Icon.CircleFilled,
						tintColor: Color.Green,
					}}
				/>
				<Form.Dropdown.Item
					title="Pending"
					value="pending"
					icon={{
						source: Icon.Hourglass,
						tintColor: Color.Yellow,
					}}
				/>
				<Form.Dropdown.Item
					title="Removed"
					value="removed"
					icon={{
						source: Icon.MinusCircle,
						tintColor: Color.Red,
					}}
				/>
			</Form.Dropdown>
		</Form>
	);
};
