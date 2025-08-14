const CLIENT_ID = import.meta.env.VITE_AAD_CLIENT_ID as string;
const REDIRECT_URI = (import.meta.env.VITE_AUTH_REDIRECT_URI as string) || window.location.origin;

// v2 endpoint: adminconsent
export function buildAdminConsentUrl(tenantId: string, state?: string) {
  const base = `https://login.microsoftonline.com/${tenantId}/v2.0/adminconsent`;
  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    state: state ?? "consent",
  });
  return `${base}?${params.toString()}`;
}
