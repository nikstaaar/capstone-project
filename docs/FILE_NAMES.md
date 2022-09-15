# File names

In order to optimize for smaller bundles and reduce the filesize we can split a file into smaller
files. We also separate tests and stories from the actual components or functions.

## Example

```
components
   ┣━ Button
   ┃  ┣━ Button.stories.js
   ┃  ┣━ Button.{spec,test}.js
   ┃  ┣━ index.js
   ┃  ┣━ styled.js (optional)
   ┃  ┗━ *.js
   ┣━ Header.js
   ┗━ …
utils
   ┣━ unit.js
   ┣━ unit.spec.js
   ┗━ …
```

-   `MyComponent.stories.js`: The story for this component
-   `MyComponent.{spec,test}.js`: The tests for this component or function
-   `index.js`: the main component (`export default`)
-   `styled.js`: local styled components
-   `[*].js`: add more files in case you need them
    -   i.e. `constants.{js,json}`

## Exports

We use named exports in all files except for the `index.js` in. We prefer `export default` to allow
better developer experience when using components with dynamic imports.

## Naming Pattern

### Components

Component files start with an uppercase letter (i.e. `Button.js`).  
If the components also has tests and/or stories or additional related files we move it into a folder
(i.e `Button/index.js`)

### Pages

Pages should start with a lowercase letter (i.e. `about.js`)

### Utilities and other functions

Functions should start with a lowercase letter (i.e. `unit.js`)
