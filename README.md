# Node.js License Checker

It's a GitHub Action which helps you to find unallowed licenses in your project.

## Example

```yaml
name: Check Licenses
on:
  push:
    branches: [main]
  pull_request:

jobs:
  licenses:
    name: Check licenses
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v2

      # Install only production dependencies
      # if you don't care about licenses of devDependencies
      # E.g. GPL license is allowed in devDependencies
      - run: yarn --frozen-lockfile --production

      - uses: daynin/nodejs-license-checker
        with:
          exclude-private-packages: true
          allow-only:  |
            MIT
            BSD-3-Clause
            ISC
```

## Input parameters

See supported input parameters list in [action.yml](./action.yml). Most of them are passed to [license-checker](https://github.com/davglass/license-checker), so you can check options description and examples [there](https://github.com/davglass/license-checker#options) or submit a PR passing a new option.

## Contributing

Don't forget to build changes and push them to GitHub (`dist` folder).
