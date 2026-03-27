# Ferma-TN Workspace

Desktop farm management software for Tunisian farmers, built as a Fastify backend plus an Electron desktop client.

## Tech stack

![Electron](https://img.shields.io/badge/Electron-Desktop-47848F?logo=electron&logoColor=white)
![React](https://img.shields.io/badge/React-UI-61DAFB?logo=react&logoColor=0B1020)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178C6?logo=typescript&logoColor=white)
![Mantine](https://img.shields.io/badge/Mantine-Components-339AF0?logo=mantine&logoColor=white)
![Fastify](https://img.shields.io/badge/Fastify-API-000000?logo=fastify&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?logo=mongodb&logoColor=white)
![TanStack Query](https://img.shields.io/badge/TanStack_Query-State-FF4154?logo=reactquery&logoColor=white)
![i18next](https://img.shields.io/badge/i18next-I18n-26A69A?logo=i18next&logoColor=white)

## UI highlights

- Clear language selector with Arabic, French, and English names shown directly
- White mode and green night mode with persistent appearance settings
- Wider and more responsive desktop layouts with better desktop spacing
- Farm-themed table, card, and dashboard styling for Tunisian agriculture workflows
- Interactive farm map simulation for irrigation, health, and harvest focus
- RTL-ready Arabic experience alongside French and English

## Screenshots

<table>
  <tr>
    <td><img src="./docs/screenshots/Screenshot%202026-03-27%20183921.png" alt="Ferma-TN dashboard" width="100%"></td>
    <td><img src="./docs/screenshots/Screenshot%202026-03-27%20184413.png" alt="Ferma-TN map and overview" width="100%"></td>
  </tr>
  <tr>
    <td><img src="./docs/screenshots/Screenshot%202026-03-27%20184427.png" alt="Ferma-TN livestock screen" width="100%"></td>
    <td><img src="./docs/screenshots/Screenshot%202026-03-27%20184450.png" alt="Ferma-TN tasks screen" width="100%"></td>
  </tr>
  <tr>
    <td><img src="./docs/screenshots/Screenshot%202026-03-27%20184459.png" alt="Ferma-TN operations screen" width="100%"></td>
    <td><img src="./docs/screenshots/Screenshot%202026-03-27%20184557.png" alt="Ferma-TN settings screen" width="100%"></td>
  </tr>
</table>

## Workspace structure

```text
backend/         Fastify API, MongoDB access, JWT auth, farm modules
desktop-client/  Electron main process, preload bridge, React dashboard UI
docs/            UI notes and screenshots
Makefile         Install, typecheck, build, and run shortcuts
```

## Main desktop experience

- Dashboard with farm KPIs, finance trends, herd balance, task flow, and recent operations
- Interactive map simulation with olive grove, greenhouse, livestock yard, water basin, and packing point zones
- Livestock registry for tags, breeds, status, and locations
- Task management with inline status updates and modal creation flows
- Finance and operations tracking for costs, quantities, sales, and suppliers
- Settings page for language and appearance preferences

## Environment

The repo-level `.env` is shared by both apps.

```env
MONGO_URL=your-mongodb-atlas-uri
JWT_SECRET=strong-secret-for-access-tokens
APP_NAME=Ferma-TN
API_HOST=127.0.0.1
API_PORT=4545
API_BASE_URL=http://127.0.0.1:4545
```

## Commands

```bash
make install
make typecheck
make build
make dev
```

You can also use workspace scripts:

```bash
pnpm typecheck
pnpm build
pnpm dev
```

## Notes

- `make dev` and `pnpm dev` start the backend and desktop client together
- The desktop app expects the backend on `API_BASE_URL` and defaults to `http://127.0.0.1:4545`
- Language preference is stored locally and Arabic automatically switches layout direction to RTL
- Color mode preference is stored locally so the app reopens in the last selected appearance
- Keep `.env` out of version control because it contains secrets
