import { forwardRef } from "react";
import { Form } from "@raycast/api";
import { useProducts } from "../hooks/use-products";

export const ProductDropdown = forwardRef((props: Form.Dropdown.Props, ref) => {
	const getProducts = useProducts();
	const products = getProducts.data;

	return (
		<Form.Dropdown
			title="Product"
			isLoading={getProducts.isLoading}
			ref={ref as any}
			{...props}
		>
			{products.map((product: any) => (
				<Form.Dropdown.Item title={product.name} value={product.id} key={product.id} />
			))}
		</Form.Dropdown>
	);
});
