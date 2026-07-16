export default async function handler(req, res) {
  const { code, state } = req.query;

  const cookies = parseCookies(req.headers.cookie || '');
  const expectedState = cookies['gh_oauth_state'];

  // cookie monouso: si invalida comunque, che il round-trip vada a buon fine o no
  res.setHeader(
    'Set-Cookie',
    'gh_oauth_state=; HttpOnly; Secure; SameSite=Lax; Path=/api/auth; Max-Age=0'
  );

  if (!code) {
    res.status(400).send('Missing code parameter');
    return;
  }

  if (!state || !expectedState || state !== expectedState) {
    res.status(400).send('Invalid or missing state parameter');
    return;
  }

  let tokenData;
  try {
    const response = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      }),
    });
    tokenData = await response.json();
  } catch (err) {
    res.status(500).send('Failed to fetch token');
    return;
  }

  if (tokenData.error) {
    res.setHeader('Content-Type', 'text/html');
    res.send(buildScript('error', JSON.stringify(tokenData)));
    return;
  }

  const payload = JSON.stringify({
    token: tokenData.access_token,
    provider: 'github',
  });

  res.setHeader('Content-Type', 'text/html');
  res.send(buildScript('success', payload));
}

function parseCookies(cookieHeader) {
  return Object.fromEntries(
    cookieHeader
      .split(';')
      .filter(Boolean)
      .map((c) => {
        const [k, ...v] = c.trim().split('=');
        return [k, decodeURIComponent(v.join('='))];
      })
  );
}

function buildScript(status, payload) {
  const message = `authorization:github:${status}:${payload}`;
  return `<!DOCTYPE html>
<html>
<body>
<script>
  (function() {
    var message = ${JSON.stringify(message)};
    function receiveMessage(e) {
      window.opener.postMessage(message, e.origin);
      window.removeEventListener('message', receiveMessage, false);
      window.close();
    }
    window.addEventListener('message', receiveMessage, false);
    window.opener.postMessage('authorizing:github', '*');
  })();
<\/script>
</body>
</html>`;
}
