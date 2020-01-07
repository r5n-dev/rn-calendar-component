# rn-calendar

## Docs

TODO:

## Setup

```
yarn add @versum/rn-calendar
```

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

```
yarn release <major | minor | patch | $version>
```
