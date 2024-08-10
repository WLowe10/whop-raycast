import { CommandWrapper } from "./components/command-wrapper";
import { SearchReviewsForm } from "./features/reviews/components/search-reviews-form";

export default function SearchReviewsCommand() {
	return (
		<CommandWrapper>
			<SearchReviewsForm />
		</CommandWrapper>
	);
}
