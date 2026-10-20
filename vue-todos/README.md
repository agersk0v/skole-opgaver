# Vue Todos

A Vue 3 app built with Vite. Axios fetches todos from
https://jsonplaceholder.typicode.com/todos. Includes loading and error states,
retry/refresh, and filters for pending and completed todos.

## Run locally

Requires Node.js 20.19+ or 22.12+ and npm.

```sh
cd vue-todos
npm ci
npm run dev
```

Open the address printed by Vite. The browser needs Internet access to reach
JSONPlaceholder. No API key or environment variables are needed.

## Production build

```sh
npm run build
npm run preview
```

Build output is written to `dist/`. Todos and their completion status are read-only;
the app does not send updates to the API.
