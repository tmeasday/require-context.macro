Trying to get https://www.npmjs.com/package/babel-plugin-require-context-hook working with babel macros

Try:

```
# Storybook mode
yarn babel ./test.js

# vs Jest mode
NODE_ENV=test yarn babel ./test.js
```
