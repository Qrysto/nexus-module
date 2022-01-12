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

### Redux middlewares for persisting module state and storage

### Redux reducer and actions for storing wallet data
