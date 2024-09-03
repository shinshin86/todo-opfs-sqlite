# SQLite WASM TODO App

This project is a simple TODO application that demonstrates the use of SQLite WASM for client-side data persistence in a React application. It utilizes Origin Private File System (OPFS) for storing the SQLite database when available, with a fallback to in-memory storage.

## Features

- Add, view, and toggle TODO items
- Persistent storage using SQLite WASM and OPFS
- Responsive UI built with Chakra UI
- TypeScript for type safety

## Technologies Used

- React
- TypeScript
- Vite (for build tooling)
- SQLite WASM (@sqlite.org/sqlite-wasm)
- Chakra UI
- Origin Private File System (OPFS)

## Prerequisites

- Node.js (version 14 or later recommended)
- npm (usually comes with Node.js)

## Setup

1. Clone the repository:
   ```
   git clone https://github.com/shinshin86/todo-opfs-sqlite
   cd todo-opfs-sqlite
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173` (or the port specified by Vite).

## Building for Production

To build the app for production, run:

```
npm run build
```

The built files will be in the `dist` directory.

## Usage

- To add a new TODO item, type in the input field and click "Add" or press Enter.
- To mark a TODO item as complete, click the checkbox next to it.
- TODO items are automatically saved and will persist even after closing the browser.

## Notes

- This application uses OPFS when available. If OPFS is not supported by the browser, it falls back to in-memory storage.
- For OPFS to work, the application must be served over HTTPS or from localhost.
- The application requires modern browser features. Ensure you're using an up-to-date version of Chrome, Edge, or another Chromium-based browser for the best experience.

## Troubleshooting

If you encounter any issues with database initialization or OPFS:

1. Check your browser's console for error messages.
2. Ensure you're using a supported browser.
3. If developing locally, make sure you're accessing the app via `localhost` or `127.0.0.1`.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT