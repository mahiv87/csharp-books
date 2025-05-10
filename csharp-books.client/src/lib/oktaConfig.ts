// Configuration settings for Okta sign in widget
export const oktaConfig = {
	clientId: import.meta.env.VITE_OKTA_CLIENT_ID!,
	issuer: import.meta.env.VITE_OKTA_ISSUER!,
	redirectUri: import.meta.env.VITE_OKTA_REDIRECT_URI!,
	scopes: ['openid', 'profile', 'email'],
	pkce: true,
	disableHttpsCheck: true,
	features: {
		registration: true
	}
};
