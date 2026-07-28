# Bono Millonario — Frontend (Next.js)

Frontend mobile-first del sistema de consulta de resultados de lotería vía QR.
Construido con Next.js 14 (App Router), TypeScript y Tailwind CSS.

## 1. Cómo correrlo localmente

```bash
npm install
cp .env.example .env.local   # y edita BACKEND_API_URL
npm run dev
```

No pude ejecutar `npm install` dentro de este entorno de trabajo (el sandbox
no tiene salida a Internet), así que **no se verificó el build de forma
automática**. El código fue revisado manualmente, pero corre `npm run build`
apenas lo bajes para confirmar que compila en tu máquina, antes de tocar nada más.

## 2. Estructura

```
app/
  page.tsx                    Landing simple
  qr/[codigo]/page.tsx         Resuelve el QR -> resultado del sorteo (público)
  resultados/[id]/page.tsx     Detalle de un resultado (público)
  historial/page.tsx           Historial con filtro por fecha (público)
  admin/login/page.tsx          Login del panel
  admin/dashboard/page.tsx       Lista de sorteos + acciones
  admin/sorteos/nuevo/page.tsx    Crear sorteo
  admin/sorteos/[id]/page.tsx      Editar sorteo, generar QR, subir imagen
  admin/auditoria/page.tsx        Logs de auditoría
  api/auth/{login,refresh,logout}/route.ts   Emiten/renuevan/borran cookies JWT
  api/admin/[...path]/route.ts               Proxy autenticado hacia Django
lib/
  types.ts        Tipos que reflejan el modelo de datos del backend
  config.ts       Lee BACKEND_API_URL y nombres de cookies
  api.ts          Cliente para endpoints PÚBLICOS (Server Components, con ISR)
  admin-data.ts   Lecturas admin para Server Components (SSR inicial de páginas)
  admin-api.ts    Cliente para Client Components (mutaciones: crear, publicar, etc.)
  auth-server.ts  Login/refresh/logout contra Django + manejo de cookies
middleware.ts     Protege /admin/** y /api/admin/**, renueva el access token
components/       UI reutilizable (botones grandes, tarjetas, formularios)
```

## 3. Decisión clave: cómo se maneja el JWT

El access token y el refresh token **nunca llegan al JavaScript del navegador**.
Se guardan como cookies `httpOnly` que solo el servidor de Next.js puede leer.
Esto reduce el riesgo de robo de token por XSS.

Flujo:

1. El admin llena el formulario en `/admin/login` → `POST /api/auth/login`
   (route handler de Next, no Django directo).
2. Ese route handler llama a Django, recibe `{access, refresh}` y los guarda
   como cookies `httpOnly` (`bm_access`, 5 min; `bm_refresh`, 7 días).
3. `middleware.ts` intercepta cada request a `/admin/**` y `/api/admin/**`.
   Si el access expiró pero el refresh sigue vigente, lo renueva de forma
   transparente (soporta refresh rotativo: guarda el refresh nuevo que
   devuelva Django).
4. Cuando el panel necesita crear/editar/publicar/etc., el Client Component
   llama a `fetch('/api/admin/...')` (nuestro propio dominio). Ese proxy
   (`app/api/admin/[...path]/route.ts`) agrega `Authorization: Bearer <access>`
   leyendo la cookie, y reenvía la petición a Django.

Para la carga inicial de páginas del panel (listas, formularios de edición)
se usa `lib/admin-data.ts`, que lee la cookie directo con `next/headers` y
llama a Django sin pasar por el proxy — es más simple y evita un salto extra
de red en el primer render.

## 4. Contrato asumido con el backend (¡revisar al construir Django!)

El enunciado original no detallaba los endpoints de autenticación del admin.
Este frontend asume que existen (estilo simplejwt):

- `POST /api/v1/admin/auth/login/` → body `{usuario, password}` → responde
  `{access, refresh, administrador: {id, usuario, email, rol}}`
- `POST /api/v1/admin/auth/refresh/` → body `{refresh}` → responde
  `{access, refresh}` (refresh rotativo)
- `POST /api/v1/admin/auth/logout/` → body `{refresh}` → invalida/blacklistea

También asume que `/api/v1/admin/sorteos` soporta `GET` (lista paginada estilo
DRF: `{count, next, previous, results}`) y `GET /api/v1/admin/sorteos/{id}`,
además de los `POST/PUT/DELETE` ya definidos. Ajusta las rutas en
`lib/admin-data.ts` y `lib/auth-server.ts` si tu backend usa otros nombres.

La imagen del QR se pide como `{codigo_qr.url_publica}.png` — ajusta
`components/TarjetaQR.tsx` según cómo sirva Django la imagen (PNG directo,
SVG, o una URL de Cloudinary distinta).

## 5. Diseño mobile-first

- Botones con altura mínima de 48px (`min-h-touch`), texto nunca menor a
  16px, una sola columna, navegación con una mano.
- Colores de estado claros (verde=publicado, amarillo=pendiente, gris=oculto).
- `viewport` permite zoom manual (hasta 5x) por accesibilidad para adultos
  mayores — nunca lo desactives.

## 6. Variables de entorno (Vercel)

Configura en el proyecto de Vercel, antes del primer deploy:

- `BACKEND_API_URL` → URL pública de tu backend en Railway (sin barra final)
- `AUTH_COOKIE_ACCESS`, `AUTH_COOKIE_REFRESH` → opcionales, tienen default

`NEXT_PUBLIC_BACKEND_API_URL` queda en `.env.example` por si en el futuro
necesitas llamar al backend directo desde el cliente (por ejemplo, compartir
en redes sociales con datos ya cargados). Hoy no se usa.

## 7. Pendiente / próximos pasos sugeridos

- Conectar contra tu backend Django real y ajustar los endpoints de auth
  si difieren del contrato asumido (sección 4).
- Agregar `generateStaticParams` en `/resultados/[id]` si quieres pre-renderizar
  los sorteos ya publicados en el build (mejora el primer TTFB en Vercel Hobby).
- Compartir en redes sociales (Web Share API) — el diseño ya deja espacio
  para agregarlo en `ResultadoDetalle.tsx` sin romper nada.
- Manejo de "olvidé mi contraseña" para administradores (no estaba en el
  alcance original).
# bono-millonario-frontend
