import { ActionPanel, List } from "@raycast/api";
import { getVisibilityIcon } from "../../../utils";
import { EmptyListView } from "../../../components/empty-list-view";
import { ShowDetailsAction } from "../../../components/actions";
import { useProducts } from "../hooks/use-products";
import { ProductDetail } from "./product-detail";
import { ProductActions } from "./product-actions";

type ProductListItemProps = {
	product: any;
	onMutate: () => void;
};

const ProductListItem = ({ product, onMutate }: ProductListItemProps) => {
	const createdAt = new Date(product.created_at * 1000);

	return (
		<List.Item
			actions={
				<ActionPanel>
					<ShowDetailsAction target={<ProductDetail productId={product.id} />} />
					<ProductActions product={product} onMutate={onMutate} />
				</ActionPanel>
			}
			title={{
				value: product.name,
				tooltip: product.id,
			}}
			subtitle={product.description}
			accessories={[
				{
					date: createdAt,
					tooltip: `Created on ${createdAt.toLocaleDateString()}`,
				},
				{
					icon: getVisibilityIcon(product.visibility),
					tooltip: product.visibility,
				},
			]}
		/>
	);
};

export const ProductList = () => {
	const getProducts = useProducts();
	const products = getProducts.data;

	return (
		<List
			navigationTitle="Search Products"
			isLoading={getProducts.isLoading}
			pagination={getProducts.pagination}
		>
			{products.map((product: any) => (
				<ProductListItem product={product} onMutate={getProducts.mutate} key={product.id} />
			))}
			<EmptyListView title="No Products Found" />
		</List>
	);
};
