import crypto from 'node:crypto';

export default function handler(req, res) {
  const state = crypto.randomBytes(16).toString('hex');

  // cookie monouso, solo per il round-trip OAuth: verificato in callback.js
  res.setHeader(
    'Set-Cookie',
    `gh_oauth_state=${state}; HttpOnly; Secure; SameSite=Lax; Path=/api/auth; Max-Age=600`
  );

  const params = new URLSearchParams({
    client_id: process.env.GITHUB_CLIENT_ID,
    redirect_uri: `${process.env.SITE_URL}/api/auth/callback`,
    scope: 'repo,user',
    state,
  });

  res.redirect(302, `https://github.com/login/oauth/authorize?${params}`);
}
