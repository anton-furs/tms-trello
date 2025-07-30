# Component Playground

Isolated environment for component development and testing by the team.

### Quick start your playground

Each developer runs their own isolated environment:

```bash
npm run playground:anton  # for Anton
npm run playground:vera  # for Vera
npm run playground:alex  # for Alex
```

### Use Available Aliases

- `@` - src folder
- `@stores` - stores folder (e.g., `@stores/user-store.js`)
- `@components` - components folder (e.g., `@components/list.js`)
- `@styles` - styles folder
- `@utils` - utils folder

### File structure

```
playground/
├── index.html          # Single HTML page with dynamic imports
├── main-anton.js       # Anton's components
├── main-vera.js        # Vera's components
├── main-alex.js        # Alex's components
├── vite.config.js      # Vite configuration with aliases
└── README.md           # This file
```
