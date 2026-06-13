const WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbzWyDYlKfS-ohbzmCbRfzVlz1c3KOT_w4uOuXMK3xCDj1t6J7ywpe5ISXkQpUEFXeM5/execERE";

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  if (url.pathname === '/share-handler') {
    const sharedUrl = url.searchParams.get('url') || url.searchParams.get('text') || '';

    event.respondWith(
      fetch(WEBHOOK_URL, {
        method: 'POST',
        body: JSON.stringify({ url: sharedUrl }),
        headers: { 'Content-Type': 'text/plain' } // avoids CORS preflight
      }).then(() => {
        return new Response(
          `<html><body style="font-family:sans-serif;text-align:center;padding-top:50px">
             <h2>✅ Saved!</h2>
             <p>${sharedUrl}</p>
           </body></html>`,
          { headers: { 'Content-Type': 'text/html' } }
        );
      }).catch(() => {
        return new Response("❌ Failed to save", { headers: { 'Content-Type': 'text/html' } });
      })
    );
  }
});