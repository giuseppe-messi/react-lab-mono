# React Lab Mono

### some references for myself.

#### creating a new app:

```
mkdir -p apps/{newAppName}

cd apps/{newAppName}

pnpm create vite -- --template react-ts .
```

don't forget to add the packages you need from the packages/ folder into your newly created app.

```
  "dependencies": {
    ...
    ...
    "@react-lab-mono/ui": "workspace:*"
    ...
    ...
  },
```

after that you want to run:

```
pnpm run install
```

to install all packages needed to for the new app just created

#### running only a specific app:

```
pnpm --filter .\apps\{AppName}\ run dev
```

#### in contrary running:

```
pnpm run dev
```

will run all apps and all packages.

#### adding a new package:

```
pnpm add packageName --filter=appName

ex:

pnpm add zustand --filter=optimistic-ui-sandbox
```
