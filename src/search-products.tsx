import { CommandWrapper } from "./components/command-wrapper";
import { ProductList } from "./features/products/components/product-list";

export default function SearchProductsCommand() {
	return (
		<CommandWrapper>
			<ProductList />
		</CommandWrapper>
	);
}
