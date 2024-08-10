import { CommandWrapper } from "./components/command-wrapper";
import { SearchPlansForm } from "./features/plans/components/search-plans-form";

export default function SearchPlansCommand() {
	return (
		<CommandWrapper>
			<SearchPlansForm />
		</CommandWrapper>
	);
}
