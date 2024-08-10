import { Action, Icon } from "@raycast/api";
import type { PartialBy } from "../types";

export const RefreshAction = (props: PartialBy<Action.Props, "title">) => {
	return (
		<Action
			title="Refresh"
			icon={Icon.ArrowClockwise}
			shortcut={{ modifiers: ["cmd"], key: "r" }}
			{...props}
		/>
	);
};

export const ShowDetailsAction = (props: PartialBy<Action.Push.Props, "title">) => {
	return <Action.Push title="Show Details" icon={Icon.AppWindowSidebarRight} {...props} />;
};
