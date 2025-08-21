# tms-trello

A collaborative educational project inspired by Trello. This project is developed by a group of students as part of the TeachMeSkills course.

### Design

[Figma](https://www.figma.com/design/qXkaRd9JE8TgkzBczyE50t/TMS-Trello?node-id=0-1&t=nMmUrJZ5iHjHYaKS-1)

### Quick Start

1. Clone and install:

```bash
git clone https://github.com/anton-furs/tms-trello.git
cd tms-trello
npm install
```

2. Development:

```bash
npm run dev
```

### Available Scripts for Development

- `npm run dev` - start development server
- `npm run lint` - run ESLint
- `npm run format` - format code with Prettier

### Git Workflow

1. Create a branch: `git checkout -b feat/your-feature`
2. Commit changes: `git commit -m "feat: add some feature"`
3. Push branch: `git push origin feat/your-feature`
4. Create pull request to merge into `develop`
5. Wait for approval from team members

### Conventional Commit Types

We use conventional commits to standardize our commit messages:

- `feat` - new features or functionality
- `fix` - bug fixes
- `refactor` - code changes that neither fix bugs nor add features
- `style` - formatting, missing semicolons, etc; no code change
- `build` - changes to build process or dependencies
- `perf` - performance improvements
- `chore` - maintenance tasks, updating dev dependencies
- `revert` - reverting previous commits

### Tech Stack

- Vanilla JavaScript
- Sass (SCSS)
- Vite
- ESLint & Prettier
