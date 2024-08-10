export function validateWebhookURL(url: string | undefined): string | undefined {
	if (!url) {
		return "URL is required";
	}

	let urlObj;

	try {
		urlObj = new URL(url);
	} catch {
		return "Must be a valid URL";
	}

	if (urlObj.protocol !== "http:" && urlObj.protocol !== "https:") {
		console.log(urlObj.protocol);

		return 'The URL must begin with either "http" or "https"';
	}
}
