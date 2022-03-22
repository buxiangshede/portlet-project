# Getting Start

## Installation

```bash
npm ci
```

## Development

```bash
npm start
```

## Build for production

```bash
npm run build
```

## Test

```bash
npm run test
```

## Other scripts

### `npm run mock`

Start a http server with port:3000 for data mock, you can change `proxy` setting in `webpack.config.js` 
to determine which api can be proxy to `localhost:3000`.

### `npm run lint`

Lint changed `JS` and `CSS` files.

### `npm run lint-all`

Lint all `JS` and `CSS` files.

### `npm run prettier`

Format change `JS` files code style using `prettier`.

### `npm run prettier-all`

Format all `JS` files code style using `prettier`.

### `npm run analyze`

Analyze js bundle size.
