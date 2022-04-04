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

- **`npm run lint`**: Lints the code and displays warnings/errors. This is automatically done when running `start` or `build`.
- **`npm run test`**: Runs all tests of the application.
- **`npm run build`**: Builds the app for production to the `build` folder.

## ⚙️ IDE Configuration

It is recommended to use VS Code for development. Make sure to install the recommended extensions found in `.vscode/extensions.json`. VS Code should automatically prompt for installing the recommended extensions when first opening the project.

## 🧭 Start Developing

The most important tools which are used in this project are [Typescript](https://www.typescriptlang.org/), [React](https://reactjs.org/), [React Router](https://reactrouter.com/docs/en/v6) and [Tailwind CSS](https://tailwindcss.com/). We only work with functional components and avoid the use of class components _(See [Difference between functional and class components](https://www.geeksforgeeks.org/differences-between-functional-components-and-class-components-in-react/#:~:text=A%20functional%20component%20is%20just,method%20used%20in%20functional%20components.))_. Consider the following tutorials/documentations to get started:

- Core concepts of [Tailwind CSS](https://tailwindcss.com/docs/utility-first)
- Get startet with [React](https://reactjs.org/docs/getting-started.html)
- Use functional components with [React-Hooks](https://reactjs.org/docs/hooks-intro.html)

## 🌱 About Enviornments variables

The environment variables, which should be set on build time can be specified in the corresponding .env files. If a env-var should be configurable on the docker-container, it should be put into the `.env` in the following format: A env var called `REACT_APP_TEST_VAR` should be set to `###REACT_APP_TEST_VAR###`. These environment variables will be taken from the environment on run-time of the container.

Be aware that only env-vars with the prefix `REACT_APP_` will be replaced.

## 🚀 Deployment of the Application

Continuous Integration / Delivery of the application is done using Github Actions.

On every push, the project will be linted, built and tested inside the build pipeline. The outcome can be shown in the Github Actions tab on [github.com](https://github.com/saunah/saunah-backend/actions).

On pushes to the `main` branch (eg. via Pull-Request), the application will be packaged as a Docker Container and uploaded to the GitHub Package Registry ([ghcr.io](https://ghcr.io)), in addition to running the tests. The uploaded container will have the tag of the commit SHA which triggered the build (eg. `a58b51a`).

After that, an update for the deployment of the application on the staging Kubernetes environemnt is triggered, which makes the application available for testing there after the build pipeline ran successfully (usually within a few minutes). It can be accessed via [https://saunah-staging.k8s.init-lab.ch](https://saunah-staging.k8s.init-lab.ch).

If a tag is added to a commit which starts with `v`, the application is being deployed to the production Kubernetes environment. Please make sure that tags are only set on the `main` branch and only if it has been successfully tested on the staging environment. Version numbers should follow [Semantic Versioning](https://semver.org/). The production backend is available at [https://saunah.k8s.init-lab.ch](https://saunah.k8s.init-lab.ch).

## 👌🏼 Definition of Done

The Definition of Done is automatically applied as the pull-request template. It can be found in [docs/pull_request_template.md](./docs/pull_request_template.md).

## 📚 Further Documentation

Fother documentation can be found in [docs/README.md](./docs/README.md).
