# rn-calendar

## Docs

TODO:

## Setup

```bash
yarn add rn-calendar-component
```

## Usage

```js
import { Calendar } from 'rn-calendar-component';

export default () => {
  return <Calendar startISODate="2020-01-01" endISODate="2020-12-31" />;
};
```

## Contributing

### Setup

```
yarn bootstrap
```

### Use [Example](./example) app to test your changes. You can run it with those commands:

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
