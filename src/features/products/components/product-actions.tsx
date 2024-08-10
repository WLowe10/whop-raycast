import { Action, ActionPanel, Icon } from "@raycast/api";
import { RefreshAction } from "../../../components/actions";
import { PlanList } from "../../plans/components/plan-list";
import {
	OpenInBrowserSection,
	OpenInRaycastSection,
} from "../../../components/action-panel-sections";
import { ReviewList } from "../../reviews/components/review-list";
import { MembershipList } from "../../memberships/components/membership-list";
import SearchPlansCommand from "../../../search-plans";
import { SearchPlansForm } from "../../plans/components/search-plans-form";
import { SearchMembershipsForm } from "../../memberships/components/search-memberships-form";
import { SearchReviewsForm } from "../../reviews/components/search-reviews-form";
import { useUrlBuilders } from "../../../hooks/use-url-builders";

export type ProductActionsProps = {
	product: any;
	onMutate: () => void;
};

export const ProductActions = ({ product, onMutate }: ProductActionsProps) => {
	const builders = useUrlBuilders();

	if (builders.isLoading) {
		return null;
	}

	const { buildHubUrl } = builders;

	return (
		<>
			<OpenInBrowserSection>
				<Action.OpenInBrowser
					title="Open Product"
					url={buildHubUrl("products", product.id)}
				/>
			</OpenInBrowserSection>
			<OpenInRaycastSection>
				<Action.Push
					title="View Memberships"
					icon={Icon.PersonLines}
					target={<SearchMembershipsForm initialValues={{ product_id: product.id }} />}
				/>
				<Action.Push
					title="View Plans"
					icon={Icon.Plug}
					target={<SearchPlansForm initialValues={{ product_id: product.id }} />}
				/>
				<Action.Push
					title="View Reviews"
					icon={Icon.Stars}
					target={<SearchReviewsForm initialValues={{ product_id: product.id }} />}
				/>
			</OpenInRaycastSection>
			<ActionPanel.Section>
				<Action.CopyToClipboard title="Copy Product ID" content={product.id} />
			</ActionPanel.Section>
			<ActionPanel.Section>
				<RefreshAction onAction={onMutate} />
			</ActionPanel.Section>
		</>
	);
};
