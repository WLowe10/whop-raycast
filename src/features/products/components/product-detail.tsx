import { ActionPanel, Detail, Icon } from "@raycast/api";
import { useProduct } from "../hooks/use-product";
import { ProductActions } from "./product-actions";
import { getVisibilityIcon } from "../../../utils";

export type ProductDetailProps = {
	productId: string;
	onMutate?: () => void;
};

export const ProductDetail = ({ productId, onMutate }: ProductDetailProps) => {
	const getProduct = useProduct(productId);
	const product = getProduct.data;

	if (!product) {
		return <Detail isLoading={true} />;
	}

	return (
		<Detail
			actions={
				<ActionPanel>
					<ProductActions
						product={product}
						onMutate={() => {
							getProduct.mutate();

							if (onMutate) {
								onMutate();
							}
						}}
					/>
				</ActionPanel>
			}
			markdown={`# ${product.name}${product.description ? `\n\n${product.description}` : ""}`}
			metadata={
				<Detail.Metadata>
					<Detail.Metadata.Label title="ID" icon={Icon.Key} text={product.id} />
					<Detail.Metadata.Label title="Name" text={product.name} />
					{product.description && (
						<Detail.Metadata.Label
							title="Description"
							icon={Icon.Info}
							text={product.description}
						/>
					)}
					<Detail.Metadata.Label
						title="Visibility"
						icon={getVisibilityIcon(product.visibility)}
						text={product.visibility}
					/>
				</Detail.Metadata>
			}
		/>
	);
};
