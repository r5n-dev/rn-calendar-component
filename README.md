# @versum/rn-calendar


## Docs

TODO:

## Setup

Create or add to your `.npmrc` this line:
```
@versum:registry=https://npm.pkg.github.com/
```

Then you will be able to install it through `yarn`:
```bash
yarn add @versum/rn-calendar
```

## Usage
```js
import { Calendar } from '@versum/rn-calendar'

export default () => {
  return <Calendar startISODate="2020-01-01" endISODate="2020-12-31" />
}
```

## Contributing

### Setup

```
yarn bootstrap
```

### Use [Example](./Example) app to test your changes. You can run it with those commands:

```
yarn example run-ios
yarn example run-android
```

### Make sure that lints and tests passes:

```
yarn lint && yarn test
```

## Publishing

### Change `GITHUB_TOKEN` in .npmrc to valid one with `packages:write` scope.
After that just use:
- `yarn release <major | minor | patch | $version>`
with proper version i.e.

```
yarn release 1.0.0
```


