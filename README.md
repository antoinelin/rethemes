<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/toinelin/react-themes">
    <img src="https://user-images.githubusercontent.com/11920757/120935076-5a5ef780-c701-11eb-9ab4-ba89dffa15df.png" alt="Logo" >
  </a>

  <p align="center">
    Manage color themes in your React application
    <br />
    <br />
    <!-- <a href="https://github.com/toinelin/react-themes">View Demo</a>
    · -->
    <a href="https://github.com/toinelin/react-themes/issues">Report Bug</a>
    ·
    <a href="https://github.com/toinelin/react-themes/issues">Request Feature</a>
  </p>
</p>

A small, fast and accessible solution to manage your color themes in your React application. It works with a functionnal aproach letting you create your own React Context Provider and getting all you need to make it easy to create a theme picker. Based on `prefers-color-scheme` user's browser preferences, it helps you to add a dark mode, and/or add as many themes as you need on your app (like a colorblind theme one).

<!-- TABLE OF CONTENTS -->
<h2 style="display: inline-block">Table of Contents</h2>
<ol>
  <li><a href="#motivations">Motivations</a></li>
  <li>
    <a href="#getting-started">Getting Started</a>
    <ul>
      <li><a href="#prerequisites">Prerequisites</a></li>
      <li><a href="#installation">Installation</a></li>
    </ul>
  </li>
  <li><a href="#usage">Usage</a></li>
  <li><a href="#contributing">Contributing</a></li>
  <li><a href="#license">License</a></li>
  <li><a href="#contact">Contact</a></li>
  <li><a href="#acknowledgements">Acknowledgements</a></li>
</ol>

## Getting Started

To get a local copy up and running follow these simple steps.

### Installation

```sh
$ npm install react-themes
```

or using [Yarn](https://yarnpkg.com/)

```sh
$ yarn add react-themes
```



<!-- USAGE EXAMPLES -->
## Usage

### Create your `theme.js` file

First, import `create` from `react-themes` and use it to create your context provider: `ThemeProvider`, and React hook: `useTheme`

```javascript
// theme.js
import { create } from 'react-themes'

const { ThemeProvider, useTheme } = create({
  themes: ['light', 'dark'],
  defaultTheme: 'light',
})

export {
  ThemeProvider,
  useTheme
}
```

Under the hood, if  you specify `light` and `dark` in the `themes` argument, the library will sync automatically with the user's browser preferences (`prefers-color-scheme`).

### Add the provider in your application

Next, add the provider:

```javascript
// App.js
import { ThemeProvider } from './theme.js'

export function App() {
  return (
    <ThemeProvider>
      <MyApp />
    </ThemeProvider>
  )
}
```

### Create your theme picker

Use the hook `useTheme` to get the active theme and the method to change active theme. `useTheme` returns a `themes` props to help you creating a theme picker.

```javascript
// ThemePicker.js
import { useTheme } from './theme.js'

export function ThemePicker() {
  const { activeTheme, setActiveTheme, themes} = useTheme

  const setDarkTheme = () => {
    setActiveTheme('dark')
  }

  const setLightTheme = () => {
    setActiveTheme('light')
  }

  return (
    <div>
      <Button onClick={setDarkTheme}>Change theme to dark</Button>
      <Button onClick={setLightTheme}>Change theme to light</Button>
      <ul>
        {themes.map(theme => (
          <li key={theme.key}>
            <Button onClick={theme.setActive}>Change theme to {theme.key}</Button>
          </li>
        ))}
      </ul>
    </div>
  )
}
```

### Add custom themes

With `react-theme` you can manage any themes you want. To do so, just add as many themes as you like to the `themes` argument of the `create` method

```javascript
// theme.js
const { ThemeProvider, useTheme } = create({
  themes: ['light', 'dark', 'colorblind', 'high-contrast'],
  defaultTheme: 'light',
})
```

They wil be available on `useTheme`

```javascript
// ThemePicker.js
const { activeTheme, setActiveTheme, themes} = useTheme

const setColorblindTheme = () => {
  setActiveTheme('colorblind')
}

const setHighContrastTheme = () => {
  setActiveTheme('high-contrast')
}

// `themes` will contains colorblind and high-contrast too
```

### Manage CSS colors with `react-themes`

The library will automatically append a classlist related to the active theme to the `body` HTML element with the `theme` prefix.

You can use CSS variables to manage colors like:

```css
 /* theme.css */
body.theme-light {
  --text-color: black;
}

body.theme-dark {
  --text-color: white;
}

body.theme-colorblind {
  --text-color: black;
}

body.theme-high-contrast {
  --text-color: purple;
}
```

Then use them on your CSS files:

```css
 /* theme.css */
.block {
  color: var(--text-color);
}
```

## API

#### `create` arguments

| Option                  | Type                                      | Description                                                 |
| ----------------------- | ------------------------------------------| ------------------------------------------------------------|
| `themes`                | `string[]`                                | List of themes you want to use                              |
| `defaultTheme`          | `string`                                  | Theme you would like to use as default.                     |
| `expiryDuration`        | `number`                                  | List of themes to map on, helping you create a theme picker |

</br>

Note: `defaultTheme` is Based on `themes`. If `defaultTheme` is not includes in `themes` it will be added.

Note 2: all strings in `themes` are inferred as a union type (Theme) dispatched to the context and hook (you will have the auto-completion each time you should be able to update or access to it).

<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.

<!-- CONTACT -->
## Contact

Antoine Lin - [@vahilloff](https://twitter.com/vahilloff) - contact@antoinelin.com

Project Link: [https://github.com/toinelin/react-themes](https://github.com/toinelin/react-themes)

<!-- ACKNOWLEDGEMENTS -->
## Acknowledgements

* []()
* []()
* []()

_Please feel free to open a pull request to add your project to the list!_

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/toinelin/repo.svg?style=for-the-badge
[contributors-url]: https://github.com/toinelin/repo/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/toinelin/repo.svg?style=for-the-badge
[forks-url]: https://github.com/toinelin/repo/network/members
[stars-shield]: https://img.shields.io/github/stars/toinelin/repo.svg?style=for-the-badge
[stars-url]: https://github.com/toinelin/repo/stargazers
[issues-shield]: https://img.shields.io/github/issues/toinelin/repo.svg?style=for-the-badge
[issues-url]: https://github.com/toinelin/repo/issues
[license-shield]: https://img.shields.io/github/license/toinelin/repo.svg?style=for-the-badge
[license-url]: https://github.com/toinelin/repo/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/toinelin
