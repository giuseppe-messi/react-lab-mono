# React Lab Mono

A monorepo showcasing core React skills and front-end architecture practices.

> ⚠️ **Note:** This is an evolving project that I update when time allows, because, well, life happens. Some sections may be in progress or marked with notes if they haven’t been started or fully completed yet. It's more like a living portfolio than a static snapshot.

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
