# Next.js App

This is a template for [Next.js](https://nextjs.org/) with additional tools.

<!-- toc -->

-   [Tech-Stack](#tech-stack)
-   [Project Setup](#project-setup)
    -   [Set up Vercel](#set-up-vercel)
        -   [App](#app)
        -   [Storybook](#storybook)
    -   [Set up formatter](#set-up-formatter)
-   [Getting started](#getting-started)
-   [Test Driven Development](#test-driven-development)
-   [Commands](#commands)

<!-- tocstop -->

It uses the following tools/libraries:

## Tech-Stack

-   [Next.js](https://nextjs.org/)
-   [Storybook](https://storybook.js.org/)
-   [Jest](https://jestjs.io/)
-   [Testing Library](https://testing-library.com/)
-   [Stylelint](https://stylelint.io/)
-   [Eslint](https://eslint.org/)
-   [Prettier](https://prettier.io/)
-   [Husky](https://typicode.github.io/husky/)
-   [Zustand](https://zustand-demo.pmnd.rs/)

## Project Setup

This project uses multiple Vercel deployments to make design/code reviews easier:

-   App Production
-   App Preview
-   Storybook Production
-   Storybook Preview

### Set up Vercel

Please follow this guide: https://vercel.com/docs/concepts/git

#### App

1.Follow the default setup for Next.js.

#### Storybook

1. Adjust the "Build and Output Settings"
    - BUILD COMMAND: `npm run storybook:build`
    - OUTPUT DIRECTORY: `./storybook-static`

<p align="center"><img src="docs/resources/vercel-storybook.png" alt="Vercel Storybook settings" width="600"/></p>

### Set up formatter

Please adjust your formatter for this project. We enabled several eslint rules, therefore we need to
use eslint as the default formatter.

Add these lines to your `settings.json`. We already added some settings in
[.vscode/settings.json](.vscode/settings.json).

```json
{
	"[javascript]": {
		"editor.defaultFormatter": "dbaeumer.vscode-eslint"
	},
	"[javascriptreact]": {
		"editor.defaultFormatter": "dbaeumer.vscode-eslint"
	}
}
```

## Getting started

**Run the development server:**

```bash
npm run dev
```

**Run storybook:**

```shell
npm run storybook
```

## Test Driven Development

We use jest to write unit tests. Please look at the Documentation for [Jest](https://jestjs.io/) and
[testing-library](https://testing-library.com/docs/react-testing-library/intro/).

## Commands

**Run the development server:**

```bash
npm run dev
```

**Build:**

```shell
npm run build
```

**Run storybook:**

```shell
npm run storybook
```

**Build storybook:**

```shell
npm run storybook:build
```

**Run all tests:**

```shell
npm run test
```

**Run stylelint**

```shell
npm run stylelint
```

**Run eslint**

```shell
npm run eslint
```

**Run all linters**

```shell
npm run lint
```
