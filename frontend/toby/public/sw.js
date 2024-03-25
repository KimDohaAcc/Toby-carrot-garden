self.addEventListener('fetch', function(event) {
  // /api로 시작하는 URI는 Service Worker에서 처리하지 않음
  if (!event.request.url.startsWith(self.location.origin + '/api')) {
    event.respondWith(
      caches.match(event.request).then(function(response) {
        return response || fetch(event.request);
      })
    );
  }
});

