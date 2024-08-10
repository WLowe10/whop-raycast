import { Action, ActionPanel, Form, useNavigation } from "@raycast/api";
import { useForm } from "@raycast/utils";
import { ProductDropdown } from "../../products/components/product-dropdown";
import { MembershipList, type MembershipListFilter } from "./membership-list";

export type SearchMembershipsFormProps = {
	initialValues?: MembershipListFilter;
};

export const SearchMembershipsForm = ({ initialValues }: SearchMembershipsFormProps) => {
	const { push } = useNavigation();

	const form = useForm<MembershipListFilter>({
		initialValues,
		onSubmit: (values) => {
			push(<MembershipList filter={values} />);
		},
	});

	return (
		<Form
			navigationTitle="Search Memberships"
			actions={
				<ActionPanel>
					<Action.SubmitForm title="Search Memberships" onSubmit={form.handleSubmit} />
				</ActionPanel>
			}
		>
			<ProductDropdown
				info="The product attached to the membership"
				{...form.itemProps.product_id}
			/>
			<Form.TextField
				title="Plan ID"
				placeholder="plan_*************"
				info="The ID of the plan attached to the membership"
				{...form.itemProps.plan_id}
			/>
			<Form.TextField
				title="User ID"
				placeholder="user_*************"
				info="The ID of the user that owns the membership"
				{...form.itemProps.user_id}
			/>
			<Form.Separator />
			{/* @ts-ignore */}
			<Form.Dropdown
				title="Status"
				info="The status of the membership"
				{...form.itemProps.status}
			>
				<Form.Dropdown.Item title="Active" value="active" />
				<Form.Dropdown.Item title="Completed" value="completed" />
				<Form.Dropdown.Item title="Trialing" value="trialing" />
				<Form.Dropdown.Item title="Past Due" value="past_due" />
				<Form.Dropdown.Item title="Unresolved" value="unresolved" />
				<Form.Dropdown.Item title="Canceled" value="canceled" />
				<Form.Dropdown.Item title="Expired" value="expired" />
			</Form.Dropdown>
		</Form>
	);
};
