import {
	Detail,
	showToast,
	Toast,
	openExtensionPreferences,
	confirmAlert,
	useNavigation,
} from "@raycast/api";
import { useLocalStorage, usePromise } from "@raycast/utils";
import { AxiosError } from "axios";
import { prefs, authenticatedAxios } from "../utils";
import { StorageKeys } from "../utils/storage";
import type { PropsWithChildren } from "react";

/*
This component wraps all of the commands to ensure that certain company values pertinent to certain 
commands exist in local storage whenever the user changes their Whop api key
*/

export const CommandWrapper = ({ children }: PropsWithChildren) => {
	const navigation = useNavigation();

	const prevAPIKey = useLocalStorage<string>(StorageKeys.PREV_WHOP_API_KEY);
	const bizID = useLocalStorage<string>(StorageKeys.BIZ_ID);
	const slug = useLocalStorage<string>(StorageKeys.SLUG);

	const isLoading = prevAPIKey.isLoading || bizID.isLoading || slug.isLoading;
	const apiKeyChanged = !prevAPIKey.isLoading && prefs.whop_api_key !== prevAPIKey.value;
	const isMissingLocalValue = !bizID.isLoading && !bizID.value && !slug.isLoading && !slug.value;
	const shouldReloadCompanyInfo = apiKeyChanged || isMissingLocalValue;

	usePromise(
		async () => {
			const toast = await showToast({
				style: Toast.Style.Animated,
				title: "Loading Whop info",
			});

			try {
				const { data } = await authenticatedAxios.get(
					"https://api.whop.com/api/v2/company"
				);

				bizID.setValue(data.id);
				slug.setValue(data.route);
				prevAPIKey.setValue(prefs.whop_api_key);

				toast.style = Toast.Style.Success;
				toast.title = "Loaded Whop Info";
			} catch (err) {
				toast.style = Toast.Style.Failure;
				toast.title = "Failed to Load Whop Info";

				if (err instanceof AxiosError) {
					if (err.response?.status === 401) {
						const confirmed = await confirmAlert({
							title: "Your API Key Is Invalid",
							message: "Would you like to open your preferences to change it?",
						});

						if (confirmed) {
							openExtensionPreferences();
						}
					}
				}

				navigation.pop();
			}
		},
		[],
		{
			execute: shouldReloadCompanyInfo,
		}
	);

	if (isLoading || shouldReloadCompanyInfo) {
		return <Detail isLoading={true} />;
	}

	return children;
};
