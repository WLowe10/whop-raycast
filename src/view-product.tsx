import { CommandWrapper } from "./components/command-wrapper";
import { ProductDetail } from "./features/products/components/product-detail";
import type { LaunchProps } from "@raycast/api";

export default function ViewProductCommand(
	props: LaunchProps<{ arguments: { product_id: string } }>
) {
	return (
		<CommandWrapper>
			<ProductDetail productId={props.arguments.product_id} />
		</CommandWrapper>
	);
}
