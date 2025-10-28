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
