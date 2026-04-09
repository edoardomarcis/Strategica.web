export default async function handler(req, res) {
  const { code } = req.query;

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
