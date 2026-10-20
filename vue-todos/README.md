# Vue Todos

A Vue 3 app built with Vite. Axios fetches todos from
https://jsonplaceholder.typicode.com/todos. Includes loading and error states,
retry/refresh, and filters for pending and completed todos.

Click any todo to open its detail page with title, todo ID, user ID, and status.
Details are fetched from `/todos/:id` and include loading, retry, and not-found
states. Hash URLs (for example `/#/todos/1`) support direct links and refreshes
on static hosting without server rewrite configuration. Use “Back to todos” or
the browser's back button to return to the list.

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
