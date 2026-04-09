export default async function handler(req, res) {
  const { code } = req.query;
  const siteUrl = process.env.SITE_URL;

  if (!code) {
    res.status(400).send('Missing code parameter');
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
    res.send(buildScript('error', JSON.stringify(tokenData), siteUrl));
    return;
  }

  const payload = JSON.stringify({
    token: tokenData.access_token,
    provider: 'github',
  });

  res.setHeader('Content-Type', 'text/html');
  res.send(buildScript('success', payload, siteUrl));
}

function buildScript(status, payload, origin) {
  return `<!DOCTYPE html>
<html>
<body>
<script>
  (function() {
    var message = 'authorization:github:${status}:' + ${JSON.stringify(payload)};
    window.opener.postMessage(message, ${JSON.stringify(origin)});
    window.close();
  })();
<\/script>
</body>
</html>`;
}
