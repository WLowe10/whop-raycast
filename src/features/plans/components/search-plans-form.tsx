import { Form, ActionPanel, Action, useNavigation, Icon } from "@raycast/api";
import { useForm } from "@raycast/utils";
import { ProductDropdown } from "../../products/components/product-dropdown";
import { PlanList, type PlanListFilter } from "./plan-list";

export type SearchPlansFormProps = {
	initialValues?: PlanListFilter;
};

export const SearchPlansForm = ({ initialValues }: SearchPlansFormProps) => {
	const navigation = useNavigation();

	const form = useForm<PlanListFilter>({
		initialValues,
		onSubmit: (values) => {
			navigation.push(<PlanList filter={values} />);
		},
	});

	return (
		<Form
			actions={
				<ActionPanel>
					<Action.SubmitForm title="Search Plans" onSubmit={form.handleSubmit} />
				</ActionPanel>
			}
		>
			<ProductDropdown info="The plan's product" {...form.itemProps.product_id} />
			{/* @ts-ignore */}
			<Form.Dropdown
				title="Visibility"
				info="The visibility of the plan"
				{...form.itemProps.visibility}
			>
				<Form.Dropdown.Item icon={Icon.Eye} title="Visible" value="visible" />
				<Form.Dropdown.Item icon={Icon.EyeDisabled} title="Hidden" value="hidden" />
				<Form.Dropdown.Item icon={Icon.Folder} title="Archived" value="archived" />
				<Form.Dropdown.Item icon={Icon.Link} title="Quick Link" value="quick_link" />
			</Form.Dropdown>
		</Form>
	);
};
