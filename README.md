<h2 align="center">
  🌀 Gumroad API Tester
</h2>
<h3 align="center">
  A web tool for easily testing the Gumroad API.
</h3>
<p align="center">
  <a href="https://badge.fury.io/js/gumroad-api-tester" target="_blank" rel="noopener noreferrer"><img src="https://badge.fury.io/js/gumroad-api-tester.svg" alt="npm Version" /></a>&nbsp;
  <a href="https://github.com/justinmahar/gumroad-api-tester/" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/badge/GitHub-Source-success" alt="View project on GitHub" /></a>&nbsp;
  <a href="https://github.com/justinmahar/gumroad-api-tester/actions?query=workflow%3ADeploy" target="_blank" rel="noopener noreferrer"><img src="https://github.com/justinmahar/gumroad-api-tester/workflows/Deploy/badge.svg" alt="Deploy Status" /></a>&nbsp;
  <a href="https://github.com/sponsors/justinmahar" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=GitHub&color=%23fe8e86" alt="Sponsor"/></a>
</p>

## Get Started

**[Open the Gumroad API Tester](https://justinmahar.github.io/gumroad-api-tester/?path=/story/tools-gumroad-api--tester)**

## Documentation

Read the **[official documentation](https://justinmahar.github.io/gumroad-api-tester/)**.

## Overview

[Gumroad](https://gumroad.com/) is a platform that allows you to sell digital products such as books, memberships, courses, and more.

Using this tool, you can test out the [Gumroad API](https://app.gumroad.com/api) using your [access token](https://app.gumroad.com/settings/advanced#application-form). This tool can also be helpful if you need to make changes not supported via the website, such as adding resource subscriptions.

All v2 endpoints are available for quick selection, or you can manually enter things if you'd like. Some parameters are optional—be sure to reference the [API docs](https://app.gumroad.com/api) when in doubt.

When retrieving products, buy links are shown so that you can test product purchases right from within this testing tool.

Try the `GET: /user` endpoint for a quick test of your access token.

This project is [open sourced on GitHub](https://github.com/justinmahar/gumroad-api-tester) under the [MIT License](https://github.com/justinmahar/gumroad-api-tester#mit-license).

🎉 Happy selling!

**[→ Get started here ←](https://justinmahar.github.io/gumroad-api-tester/?path=/story/tools-gumroad-api--tester)**

### Features include:

- **🌀 Quickly and easily test calls to the Gumroad API**
  - Plug in your access token, choose your desired endpoint, and go!
- **🧬 Structured and raw responses**
  - View responses as an interactive tree or as raw text
- **📝 Easy query and URL param editing**
  - Easily edit your endpoint params before sending

[lock:donate]::🚫---------------------------------------

## Donate 

I hope this project makes your life a little easier! If it does and you'd like to show your appreciation, consider supporting the project with a coffee or sponsorship. 

Your support helps keep the project going and will earn you some serious virtual high fives. Maybe even a virtual fist bump if you're feeling extra cool.

<a href="https://github.com/sponsors/justinmahar">
  <img src="https://justinmahar.github.io/react-kindling/support/sponsor.png" alt="Sponsor via GitHub" height="35" />
</a> <a href="https://paypal.me/thejustinmahar/5">
  <img src="https://justinmahar.github.io/react-kindling/support/coffee-1.png" alt="Buy me a coffee" height="35" />
</a> <a href="https://paypal.me/thejustinmahar/15">
  <img src="https://justinmahar.github.io/react-kindling/support/coffee-3.png" alt="Buy me 3 coffees" height="35" />
</a> <a href="https://paypal.me/thejustinmahar/25">
  <img src="https://justinmahar.github.io/react-kindling/support/coffee-5.png" alt="Buy me 5 coffees" height="35" />
</a>

[/lock:donate]::---------------------------------------🚫

## Table of Contents

- [Get Started](#get-started)
- [Documentation](#documentation)
- [Overview](#overview)
  - [Features include:](#features-include)
- [Donate](#donate)
- [Table of Contents](#table-of-contents)
- [Installation](#installation)
- [Usage](#usage)
  - [Via Website](#via-website)
  - [Via `npm`](#via-npm)
- [TypeScript](#typescript)
- [Icon Attribution](#icon-attribution)
- [Contributing](#contributing)
- [⭐ Found It Helpful? Star It!](#-found-it-helpful-star-it)
- [License](#license)


## Installation

```
npm i gumroad-api-tester
```

## Usage

### Via Website

Go here: **[Gumroad API Tester](https://justinmahar.github.io/gumroad-api-tester/?path=/story/tools-gumroad-api--tester)**

### Via `npm`

If you want to use the widget yourself, you can install this package via npm and use the exported `GumroadAPIWidget`.

```jsx
import { GumroadAPIWidget } from 'gumroad-api-tester';
```

```jsx
<GumroadAPIWidget />
```

> Note: The API widget depends on [Bootstrap 5](https://getbootstrap.com/docs/5.0/getting-started/introduction/) via [react-bootstrap](https://react-bootstrap.github.io/). You must import the Bootstrap styles yourself. For additional styling, I am using the [Zephyr swatch](https://bootswatch.com/zephyr/) from [Bootswatch](https://bootswatch.com/).

[lock:typescript]::🚫---------------------------------------

## TypeScript

Type definitions have been included for [TypeScript](https://www.typescriptlang.org/) support.

[/lock:typescript]::---------------------------------------🚫

[lock:icon]::🚫---------------------------------------

## Icon Attribution

Favicon by [Twemoji](https://github.com/twitter/twemoji).

[/lock:icon]::---------------------------------------🚫

[lock:contributing]::🚫---------------------------------------

## Contributing

Open source software is awesome and so are you. 😎

Feel free to submit a pull request for bugs or additions, and make sure to update tests as appropriate. If you find a mistake in the docs, send a PR! Even the smallest changes help.

For major changes, open an issue first to discuss what you'd like to change.

[/lock:contributing]::---------------------------------------🚫

## ⭐ Found It Helpful? [Star It!](https://github.com/justinmahar/gumroad-api-tester/stargazers)

If you found this project helpful, let the community know by giving it a [star](https://github.com/justinmahar/gumroad-api-tester/stargazers): [👉⭐](https://github.com/justinmahar/gumroad-api-tester/stargazers)

## License

See [LICENSE.md](https://justinmahar.github.io/gumroad-api-tester/?path=/story/license--page).