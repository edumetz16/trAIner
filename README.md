# Trainer Monorepo

Arquitectura base implementada para MVP:

`types (zod) -> db schema (drizzle) -> api-contract -> nest server -> client-api -> apps`

## Paquetes
- `packages/types`: schemas de dominio en Zod (fuente única de verdad).
- `packages/db`: schema relacional PostgreSQL con Drizzle.
- `packages/api-contract`: contratos REST y base OpenAPI.
- `packages/client-api`: cliente TypeScript para apps.

## Apps
- `apps/nest-functions`: API REST v1 para auth, players, channels/messages, calendar y convocations.
- `apps/dashboard`: app Next.js consumiendo `client-api`.
- `apps/expo`: app Expo inicial.
