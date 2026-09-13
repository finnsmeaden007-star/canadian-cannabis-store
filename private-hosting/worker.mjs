const headers = {
  'Cache-Control': 'private, no-store',
  'X-Robots-Tag': 'noindex, nofollow, noarchive',
  'Content-Type': 'text/plain; charset=utf-8',
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.protocol !== 'https:') {
      url.protocol = 'https:';
      return new Response(null, { status: 308, headers: { ...headers, Location: url.href } });
    }
    if (!env.DEMO_PASSWORD) {
      return new Response('Private demo setup is in progress.', { status: 503, headers });
    }
    let password = '';
    try {
      const auth = request.headers.get('Authorization') || '';
      if (auth.startsWith('Basic ')) {
        const decoded = atob(auth.slice(6));
        const separator = decoded.indexOf(':');
        if (separator >= 0) password = decoded.slice(separator + 1);
      }
    } catch {}
    const digest = async value => new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value)));
    const [actual, expected] = await Promise.all([digest(password), digest(env.DEMO_PASSWORD)]);
    let difference = 0;
    for (let i = 0; i < actual.length; i++) difference |= actual[i] ^ expected[i];
    if (!password || difference !== 0) {
      return new Response('Private preview. Enter demo as the username and the shared password.', {
        status: 401,
        headers: { ...headers, 'WWW-Authenticate': 'Basic realm="Private website preview", charset="UTF-8"' },
      });
    }
    const assetRequest = new Request(request);
    assetRequest.headers.delete('Authorization');
    const response = new Response(await env.ASSETS.fetch(assetRequest));
    response.headers.set('Cache-Control', 'private, no-store');
    response.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive');
    return response;
  },
};
