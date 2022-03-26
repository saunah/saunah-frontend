# 🛁🔥 Saunah Frontend

Saunah Frontend is a React, Typescript and Tailwind based webapp for the Saunah platform.

## 💡 Installation

After cloning the repository, perform the following steps to run the web-app locally.

1. Run **`npm install`** in the project directory. This will install all the required node-modules for the project.
2. Create the file `.env.local` and add the following content to it:

```
REACT_APP_API_BASE_URL=http://localhost:8080
```

3. Run **`npm run start`**. This will start a development server and host the app on [http://localhost:3000](http://localhost:3000).

## 🔨 Other commands

-   **`npm run lint`**: Lints the code and displays warnings/errors. This is automatically done when running `start` or `build`.
-   **`npm run test`**: Runs all tests of the application.
-   **`npm run build`**: Builds the app for production to the `build` folder.

## ⚙️ IDE Configuration

It is recommended to use VS Code for development. Make sure to install the recommended extensions found in `.vscode/extensions.json`. VS Code should automatically prompt for installing the recommended extensions when first opening the project.

## 🧭 Start Developing

The most important tools which are used in this project are [Typescript](https://www.typescriptlang.org/), [React](https://reactjs.org/), [React Router](https://reactrouter.com/docs/en/v6) and [Tailwind CSS](https://tailwindcss.com/). We only work with functional components and avoid the use of class components _(See [Difference between functional and class components](https://www.geeksforgeeks.org/differences-between-functional-components-and-class-components-in-react/#:~:text=A%20functional%20component%20is%20just,method%20used%20in%20functional%20components.))_. Consider the following tutorials/documentations to get started:

-   Core concepts of [Tailwind CSS](https://tailwindcss.com/docs/utility-first)
-   Get startet with [React](https://reactjs.org/docs/getting-started.html)
-   Use functional components with [React-Hooks](https://reactjs.org/docs/hooks-intro.html)

## About Enviornments

The environment variables, which should be set on build time can be specified in the corresponding .env files. If a env-var should be configurable on the docker-container, it should be put into the `.env` in the following format: A env var called `REACT_APP_TEST_VAR` should be set to `###REACT_APP_TEST_VAR###`. These environment variables will be taken from the environment on run-time of the container.

### Limitations

1. Be aware that only env-vars with the prefix `REACT_APP_` will be replaced.
2. Make sure your env-vars don't contain a `,`. If they do, they can't be replaced.
