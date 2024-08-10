import { CommandWrapper } from "./components/command-wrapper";
import { SearchMembershipsForm } from "./features/memberships/components/search-memberships-form";

export default function SearchMembershipsCommand() {
	return (
		<CommandWrapper>
			<SearchMembershipsForm />
		</CommandWrapper>
	);
}
