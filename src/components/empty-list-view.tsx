import { List } from "@raycast/api";

export const EmptyListView = (props: List.EmptyView.Props) => {
	return <List.EmptyView icon="icon-small.png" {...props} />;
};
