import { Color, getPreferenceValues, Icon, Image } from "@raycast/api";
import axios from "axios";

export type Preferences = {
	whop_api_key: string;
};

export const prefs = getPreferenceValues() as Preferences;

export const authenticatedAxios = axios.create({
	headers: {
		Authorization: `Bearer ${prefs.whop_api_key}`,
	},
});

export const getTruthyCheckIcon = (truthyVal: any): Image =>
	truthyVal
		? { source: Icon.Check, tintColor: Color.Green }
		: { source: Icon.Xmark, tintColor: Color.Red };

export const getTruthyCircleIcon = (truthyVal: any): Image =>
	truthyVal
		? { source: Icon.CircleFilled, tintColor: Color.Green }
		: { source: Icon.CircleDisabled };

export const getVisibilityIcon = (
	visibility: "visible" | "hidden" | "archived" | "quick_link"
): Icon =>
	visibility === "visible"
		? Icon.Eye
		: visibility === "hidden"
			? Icon.EyeDisabled
			: visibility === "archived"
				? Icon.Folder
				: Icon.Link;
