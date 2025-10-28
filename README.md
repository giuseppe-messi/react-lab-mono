# React Lab Mono

A monorepo showcasing **core React, TypeScript, and front-end architecture** skills.
It currently includes a single **Design System** package along with a **Storybook documentation**.

> ⚠️ **Note:** This is an evolving project that I update when time allows, because, well, life happens. Some sections may be in progress or marked with notes if they haven’t been started or fully completed yet. It's more like a living portfolio than a static snapshot.

<a id="design-system"></a>

### 🎨 Design System

Inside `packages/ui` you'll find a self-contained, production-ready React component library, [published on npm](https://www.npmjs.com/package/@react-lab-mono/ui) demonstrating: Core TypeScript/JavaScript & Web Fundamentals, React Fundamentals, Styling & Theming, Type Safety, Accessibility (a11y), Performance Optimization, Testing, Documentation & Design Systems, Build Tools & Workflow.

<a id="examples-demos"></a>

### 📘 Storybook

Inside `/apps/docs` you'll find the [Storybook](https://github.com/giuseppe-messi/react-lab-mono/tree/main/apps/docs) project, which provides a visual playground and documentation for every UI component. You can check it live here: [Packages UI Storybook](https://storybook-package-ui.netlify.app/?path=/docs/button--docs).

1. **[Storybook](https://github.com/giuseppe-messi/react-lab-mono/tree/main/apps/docs)** ( 🧪 Work In Progress )

   - **Checkout the repo**: [apps/docs](https://github.com/giuseppe-messi/react-lab-mono/tree/main/apps/docs)
   - **Live demo**: [Packages UI Storybook](https://storybook-package-ui.netlify.app/?path=/docs/button--docs)

## 📁 Structure

```bash
react-lab-mono/
├── apps/
│   ├── docs/
│   └── ...
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

```bash
pnpm dev
```
