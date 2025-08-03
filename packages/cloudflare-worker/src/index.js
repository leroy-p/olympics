export default {
  async fetch(request, env) {
    const url = new URL(request.url)

    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': '*',
        },
      })
    }

    if (request.method === 'GET' && url.pathname === '/players') {
      const object = await env.STORE.get('players.json')

      if (!object) {
        return new Response('File not found: players.json.', { status: 404 })
      }

      return new Response(object.body, {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      })
    }

    if (request.method === 'POST' && url.pathname === '/players') {
      const json = await request.json()
      await env.STORE.put('players.json', JSON.stringify(json), {
        httpMetadata: {
          contentType: 'application/json',
        },
      })

      return new Response('File updated: players.json.', {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      })
    }

    if (request.method === 'GET' && url.pathname === '/trials') {
      const object = await env.STORE.get('trials.json')

      if (!object) {
        return new Response('File not found: trials.json.', { status: 404 })
      }

      return new Response(object.body, {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      })
    }

    if (request.method === 'POST' && url.pathname === '/trials') {
      const json = await request.json()
      await env.STORE.put('trials.json', JSON.stringify(json), {
        httpMetadata: {
          contentType: 'application/json',
        },
      })

      return new Response('File updated: trials.json.', {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      })
    }

    return new Response('Not found', { status: 404 })
  },
}
