## 🌴 Branch Names

The `main` branch of the repository is protected and code can only be added via pull-requests.
Code should always be added on a feature branch according to the following guideline:

- **`feature/<branch-name>`** for new features
- **`patch/<branch-name>`** for small changes in the code (e.g. typos, bugs)
- **`refactor/<branch-name>`** for big changes in the architecture
- **`doc/<branch-name>`** for documentation

The `<branch-name>` has to be in kebab-case (lowercase and words seperated by dashes).

## 📝 Testing Strategy

The app is tested by different types of unit tests. At the moment there are no integration tests which would test the app working together with the backend. The following parts of the code have to be unit tested:

- **`Components`**: The components located under `src/components` are completely controlled via their props. They should not perform API calls or similar things on their own. Every component has to be unit testet, applying the different props and checking if it behaves as expected.
- **`Hooks`**: Hooks (`src/hooks`) encapsulate the business logic of the application by talking to the API and storing relevant data. They have to be unit tested by mocking the API.
- **`Views`** The views located under `src/routes/views` are the top-level components of the application. They use hooks to fetch the relevant data for the page and pass the data to their child components. They also have to be unit tested by mocking the API.
