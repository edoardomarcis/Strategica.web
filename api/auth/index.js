export default function handler(req, res) {
  const params = new URLSearchParams({
    client_id: process.env.GITHUB_CLIENT_ID,
    redirect_uri: `${process.env.SITE_URL}/api/auth/callback`,
    scope: 'repo,user',
    state: Math.random().toString(36).substring(2),
  });

  res.redirect(302, `https://github.com/login/oauth/authorize?${params}`);
}
