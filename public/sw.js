const CACHE_NAME = 'mamasafe-v2'
const STATIC_CACHE = 'mamasafe-static-v2'
const DYNAMIC_CACHE = 'mamasafe-dynamic-v2'

const staticAssets = [
  '/',
  '/images/logo.png',
  '/manifest.json',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'
]

const apiBaseUrl = 'https://ahead-hackathon.onrender.com/api/v1'

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('Caching static assets')
        return cache.addAll(staticAssets)
      })
      .then(() => self.skipWaiting())
  )
})

// Activate event - clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
            console.log('Deleting old cache:', cacheName)
            return caches.delete(cacheName)
          }
        })
      )
    }).then(() => self.clients.claim())
  )
})

// Fetch event - network first for API, cache first for static
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Handle API requests - network first with offline fallback
  if (url.origin === new URL(apiBaseUrl).origin) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Cache successful API responses
          if (response.ok) {
            const responseClone = response.clone()
            caches.open(DYNAMIC_CACHE)
              .then((cache) => cache.put(request, responseClone))
          }
          return response
        })
        .catch(() => {
          // Return cached response if network fails
          return caches.match(request)
            .then((cachedResponse) => {
              if (cachedResponse) {
                return cachedResponse
              }
              // Return offline fallback for critical endpoints
              if (request.url.includes('/medications/check')) {
                return new Response(JSON.stringify({
                  error: 'Offline mode - please check connection',
                  offline: true
                }), {
                  headers: { 'Content-Type': 'application/json' }
                })
              }
              throw new Error('No cached response available')
            })
        })
    )
    return
  }

  // Handle static assets - cache first
  event.respondWith(
    caches.match(request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse
        }
        return fetch(request)
          .then((response) => {
            // Cache new static assets
            if (response.ok && request.method === 'GET') {
              const responseClone = response.clone()
              caches.open(STATIC_CACHE)
                .then((cache) => cache.put(request, responseClone))
            }
            return response
          })
      })
  )
})

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(
      // Handle offline medication checks or patient data
      console.log('Background sync triggered')
    )
  }
})

// Push notifications for emergency alerts
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'MamaSafe Alert',
    icon: '/images/logo.png',
    badge: '/images/logo.png',
    vibrate: [200, 100, 200],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'View Alert',
        icon: '/images/logo.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/images/logo.png'
      }
    ]
  }

  event.waitUntil(
    self.registration.showNotification('MamaSafe Alert', options)
  )
})

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  event.notification.close()

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    )
  }
})