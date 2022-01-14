# nexus-module

nexus-module v1.0.0 is built for Nexus Wallet Module v

This package will likely be useful for you if you are developing a [Nexus Wallet Module](https://github.com/Nexusoft/NexusInterface/tree/master/docs/Modules).

## Usage

### Import resources from `NEXUS` global variable

`nexus-module` enables you to get resources from `NEXUS` global variable via `import`. For example, if you want to get `TextField` component:

```
// Without nexus-module
const { TextField } = NEXUS.components

// With nexus-module
import { TextField } from 'nexus-module'
```

For `NEXUS.libraries`:

```
// Without nexus-module
const { React } = NEXUS.libraries

// With nexus-module
import React from 'nexus-module/lib/react'
```

### Import libraries with webpack aliases

Some libraries like `react-redux` requires libraries that already provided through `NEXUS` like `react` as peer dependency. The problem is that if you add `react` as a direct dependency of your module project, it will be a different instance from the `NEXUS.libraries.React` instance, which was used to create common components found in `NEXUS.components`. Therefore, it might cause troubles when you use those common components.

The solution is that you should define webpack aliases on webpack (or whatever bundler that you're using) to map library names to those exported from `nexus-module`, e.g. mapping 'react' to 'nexus-module/lib/react', so that when a library like `react-redux` looks for its peer dependencies, it will find the instances that are already provided by `NEXUS` global variable, not a new one.

`nexus-module` made webpack aliases ready for you to use. You can just add it to your webpack config:

```
import { webpackAliases } from 'nexus-module';

const webpackConfig = {
  // ...your other configs
  resolve: {
    alias: {
      ...webpackAliases
      // ...your other aliases
    }
  }
}
```

### Configure browserslist targets

`nexus-module` exports the **browserslist** query which will be useful in some cases like configuring target browsers for `@babel/preset-env`.

```
import { browserslistQuery } from 'nexus-module';

const babelConfig = {
  presets: [
    ['@babel/preset-env', { targets: browserslistQuery }]
  ]
}
```

### Store wallet data into Redux

First you need to add `walletDataReducer` into your redux reducer, for example:

```
import { walletDataReducer } from 'nexus-module;

export default combineReducers({
  nexus: walletDataReducer
  // ...other reducers
});
```

Next, call `listenToWalletData` to keep wallet data state in Redux updated:

```
import { listenToWalletData } from 'nexus-module;

listenToWalletData(store)
```

Then you can retrieve wallet data from Redux state whenever you want

```
const walletData = useSelector(state => state.nexus)

// walletData shape will look like this
{
  initialized,  // boolean
  theme,        // object
  settings,     // object
  coreInfo,     // object
  userStatus,   // object
  addressBook,  // object
};
```

### Automate updating module state and storage with Redux middlewares

Nexus Wallet provides you with `updateState` and `updateStorage` functions so that you can persist some module data as long as the wallet is still running (with `updateState`), or indefinitely (with `updateStorage`).

If the data you want to persist is stored inside a Redux store, `nexus-module` makes the process easier for you with `stateMiddleware` and `storageMiddleware`.

```
import { stateMiddleware, storageMiddleware } from 'nexus-module';

function configureStore() {
  const middlewares = [
    // Automatically save state.settings to disk whenever there's a change
    storageMiddleware((state) => state.settings),
    // Automatically save state.ui to wallet state whenever there's a change
    stateMiddleware((state) => state.ui),
    // ...other middlewares
  ];
  // Use middlewares to create redux store...
}
```

Remember to repopulate the persisted data to the corresponding state when your module is initialized, for example:

```
// state.settings reducer
import { INITIALIZE } from 'nexus-module';

const initialState = {}

export default (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZE:
      return action.payload?.storageData || state;

    // ...handle other action types

    default:
      return state;
  }
};
```
