[![Build Status](https://travis-ci.org/anmuel/md-cms.svg?branch=master)](https://travis-ci.org/anmuel/md-cms)

# Description

A playground project to dig around with Typescript 2, Hapi & Co.

Create a pseudo-CMS which generates its content from underlying markdown files.

# Using this module

- To use the `Server` class in a TypeScript file -

```ts
import { Server } from "md-cms";

const server = new Server(3000);
server.connect();
```

- To use the `Server` class in a JavaScript file -

```js
const Server = require('md-cms').Server;

const server = new Server(3000);
server.connect();
```
