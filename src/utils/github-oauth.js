export function getGitHubUrl(from) {
  const rootURl = "https://github.com/login/oauth/authorize";

  const options = {
    client_id: process.env.VUE_APP_GITHUB_CLIENT_ID,
    redirect_uri: process.env.VUE_APP_GITHUB_CALLBACK_URL,
    scope: "read:user, read:org",
    state: from,
  };

  const qs = new URLSearchParams(options);

  return `${rootURl}?${qs.toString()}`;
}
