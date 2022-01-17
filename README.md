# nexus-module

nexus-module v1.0.0 is built for Nexus Wallet Module v3.1.0

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

Then you can import libraries as if they were direct dependencies of your project:

```
// Instead of this
import React from 'nexus-module/lib/react';
import styled from 'nexus-module/lib/emotionStyled';

// You can do this
import React from 'react';
import styled from '@emotion/styled';
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

## API reference

- **walletVersion**: from NEXUS.walletVersion

- **GlobalStyles**: from NEXUS.components.GlobalStyles
- **ThemeController**: from NEXUS.components.ThemeController
- **Icon**: from NEXUS.components.Icon
- **Panel**: from NEXUS.components.Panel
- **AutoSuggest**: from NEXUS.components.AutoSuggest
- **FieldSet**: from NEXUS.components.FieldSet
- **Switch**: from NEXUS.components.Switch
- **Modal**: from NEXUS.components.Modal
- **Tooltip**: from NEXUS.components.Tooltip
- **Select**: from NEXUS.components.Select
- **TextField**: from NEXUS.components.TextField
- **FormField**: from NEXUS.components.FormField
- **Link**: from NEXUS.components.Link
- **Arrow**: from NEXUS.components.Arrow
- **Tab**: from NEXUS.components.Tab
- **Button**: from NEXUS.components.Button
- **Dropdown**: from NEXUS.components.Dropdown

- **color**: from NEXUS.utilities.color
- **copyToClipboard**: from NEXUS.utilities.copyToClipboard
- **send**: from NEXUS.utilities.send
- **showNotification**: from NEXUS.utilities.showNotification
- **showErrorDialog**: from NEXUS.utilities.showErrorDialog
- **showSuccessDialog**: from NEXUS.utilities.showSuccessDialog
- **showInfoDialog**: from NEXUS.utilities.showInfoDialog
- **rpcCall**: from NEXUS.utilities.rpcCall
- **apiCall**: from NEXUS.utilities.apiCall
- **secureApiCall**: from NEXUS.utilities.secureApiCall
- **proxyRequest**: from NEXUS.utilities.proxyRequest
- **confirm**: from NEXUS.utilities.confirm
- **updateState**: from NEXUS.utilities.updateState
- **updateStorage**: from NEXUS.utilities.updateStorage
- **onceInitialize**: from NEXUS.utilities.onceInitialize
- **onWalletDataUpdated**: from NEXUS.utilities.onWalletDataUpdated

- **browserslistQuery**: _String_ - Browserslist query that specifies the supported Nexus Wallet's Electron version.
- **webpackAliases**: _Object_ - Alias config for webpack. Add this object to `resolve.alias` webpack config, so that third party libraries from `NEXUS.libraries` can be imported as if they were direct dependencies of the project.
- **walletDataReducer**: _(state: Object, action: Object) => state: Object_ - Redux reducer for wallet data.
- **listenToWalletData**: _(store: Object) => void_ - Listen to any changes from wallet data and dispatch Redux actions accordingly.
- **INITIALIZE**: _String_ - Redux action type, dispatched when the module is initialized.
- **UPDATE_WALLET_DATA**: _String_ - Redux action type, dispatched when the wallet data is updated.
- **stateMiddleware**: _(getPersistedState: (state: Object) => persistedState: Object) => middleware: Function_ - Get a Redux middleware that automatically update the specified module state to the wallet so that it's not lost when user navigates away from the module.
- **storageMiddleware**: _(getStoredData: (state: Object) => storedData: Object) => middleware: Function_ - Get a Redux middleware that automatically store the data to the disk so that it's not lost when user closes the wallet.
