# React Lab Mono

A monorepo showcasing core React skills and front-end architecture practices. It is split into a [Design System](#design-system), located at `packages/ui` and [Examples & Micro-demos](#examples-demos), which you'll find inside `apps/`

> ⚠️ **Note:** This is an evolving project that I update when time allows, because, well, life happens. Some sections may be in progress or marked with notes if they haven’t been started or fully completed yet. It's more like a living portfolio than a static snapshot.

<a id="design-system"></a>

### 🎨 Design System

Inside `packages/ui` you'll find a self-contained, production-ready React component library, [published on npm](https://www.npmjs.com/package/@react-lab-mono/ui) demonstrating: Core TypeScript/JavaScript & Web Fundamentals, React Fundamentals, Styling & Theming, Type Safety, Accessibility (a11y), Performance Optimization, Testing, Documentation & Design Systems, Build Tools & Workflow.

<a id="examples-demos"></a>

### 🧩 Examples & Micro-demos

Inside [apps/](https://github.com/giuseppe-messi/react-lab-mono/tree/main/apps) you'll find:

- A `docs/` directory containing the Storybook project.
- A set of focused example apps, each highlighting specific core skills.

Every project is backed by unit and integration tests using Jest and React Testing Library. I also automate linting, formatting, and type-checking using ESLint and TypeScript configuration files.


1. **[Storybook](https://github.com/giuseppe-messi/react-lab-mono/tree/main/apps/docs)** ( 🧪 Work In Progress )

   - **Checkout the repo**: [apps/docs](https://github.com/giuseppe-messi/react-lab-mono/tree/main/apps/docs)
   - **Live demo**: [Packages UI Storybook](https://storybook-package-ui.netlify.app/?path=/docs/button--docs)

2. **[Optimistic UI Sandbox](https://github.com/giuseppe-messi/react-lab-mono/tree/main/apps/optimistic-ui-sandbox)**

   - **State Management**: Zustand
   - **Mocked Data Fetching & API Integration**: mocking + optimistic UI
   - **Testing**: Jest & React Testing Library
   - **Core JavaScript & Web Fundamentals**: async/await, Promises, modules and more
   - **Test coverage**: 100%
   - **Checkout the repo**: [apps/optimistic-ui-sandbox](https://github.com/giuseppe-messi/react-lab-mono/tree/main/apps/optimistic-ui-sandbox)
   - **Live demo**: [Optimistic UI Sandbox](https://optimistic-ui-sandbox.netlify.app/)

3. **Auth-Guarded Docs & SSR** ( ❌ Coming Soon )
   - **Routing & Navigation**: nested MDX routes, JWT-based admin guards
   - **Data Fetching & API Integration**: SSG for public docs, SSR for protected pages
   - **Type Safety** & **React Fundamentals**: functional components, hooks, strict TS
   - **Build Tools & Workflow**: Next.js configuration, SSR/SSG pipeline
4. **PWA Cache Demo** ( ❌ Coming Soon )
   - **Core JS/Web Fundamentals**: Service Workers, IndexedDB via localForage, Web APIs
   - **Data Fetching & API Integration**: fetch + runtime caching (Workbox)
   - **Accessibility**: offline state banner, progressive enhancement
   - **Build Tools & Workflow**: Vite PWA template, manifest.json
5. **Cross-Platform UI** ( ❌ Coming Soon )
   - **React Fundamentals** & **Type Safety**: JSX, props & state, TypeScript
   - **Styling & Theming**: shared design-system tokens across web & native
   - **Component Architecture**: code-sharing via React Native Web
   - **Build Tools & Workflow**: Metro/RNW bundling, platform-agnostic styling

## 📁 Structure

```bash
react-lab-mono/
├── apps/
│   ├── docs/
│   └── optimistic-ui-sandbox/
├── packages/
│   ├── ui/
│   └── ...
```

## 🚀 Getting Started

### 1. Clone the monorepo

```bash
git clone https://github.com/giuseppe-messi/react-lab-mono.git

cd react-lab-mono
```

### 2. Install dependencies

from inside the monorepo directory

```bash
pnpm install

# or whichever package managers you use
```

### 3. Running the Project

To run a single app (e.g. optimistic-ui-sandbox):

```bash
pnpm --filter=optimistic-ui-sandbox dev
```

### 4. Run all apps and packages

To run everything in parallel:

```bash
pnpm dev
```

## 🛠️ Dev Documentation

### creating a new app:

```bash
mkdir -p apps/{newAppName}

cd apps/{newAppName}

pnpm create vite -- --template react-ts .
```

don't forget to add the packages you need from the packages/ folder into your newly created app.

```bash
  "dependencies": {
    ...
    ...
    "@react-lab-mono/ui": "workspace:*"
    ...
    ...
  },
```

after that you want to run:

```bash
pnpm run install
```

to install all packages needed to for the new app just created.

### running only a specific app:

```bash
pnpm --filter .\apps\{AppName}\ run dev
```

### in contrary running:

```bash
pnpm run dev
```

will run all apps and all packages.

### adding a new package:

```bash
pnpm add packageName --filter=appName

ex:

pnpm add zustand --filter=optimistic-ui-sandbox
```

### Upgrading the ui package

```bash
# Step 1: Create a changeset (choose version bump + add summary)
pnpm changeset

# Step 2: Apply version updates and changelogs
pnpm changeset version
```

When master is eventually updated the package will be too.
