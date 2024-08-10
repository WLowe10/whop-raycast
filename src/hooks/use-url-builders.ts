import { useLocalStorage } from "@raycast/utils";
import { buildHubUrl, buildDashUrl } from "../utils/whop";
import { StorageKeys } from "../utils/storage";

export type UseUrlBuildersReturnType =
	| { isLoading: true }
	| {
			isLoading: false;
			buildHubUrl: (...paths: string[]) => string;
			buildDashUrl: (...paths: string[]) => string;
	  };

export const useUrlBuilders = (): UseUrlBuildersReturnType => {
	const bizID = useLocalStorage<string>(StorageKeys.BIZ_ID);
	const slug = useLocalStorage<string>(StorageKeys.SLUG);

	if (bizID.isLoading || slug.isLoading) {
		return {
			isLoading: true,
		};
	}

	return {
		isLoading: false,
		buildHubUrl: (...paths: string[]) => buildHubUrl(slug.value!, ...paths),
		buildDashUrl: (...paths: string[]) => buildDashUrl(bizID.value!, ...paths),
	};
};
