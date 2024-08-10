import { ActionPanel } from "@raycast/api";

export const OpenInBrowserSection = (props: ActionPanel.Section.Props) => {
	return <ActionPanel.Section title="Open In Browser" {...props} />;
};

export const OpenInRaycastSection = (props: ActionPanel.Section.Props) => {
	return <ActionPanel.Section title="Open In Raycast" {...props} />;
};
