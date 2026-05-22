# Ambient Backgrounds

A WordPress plugin that adds animated ambient background blocks. Drop the **Ambient Background** block onto a page, nest any content inside, and a noise-driven blurred-circle animation will fill the background behind it.

## Features

- Block-editor native (Gutenberg)
- Live animated preview inside the editor
- Customizable circle count, radius range, hue range, starting hue, and background color
- Inner blocks: place any content on top of the background

## Development

```sh
npm install
npm start        # watch mode
npm run build    # production build (outputs to build/)
```

The plugin reads from `build/ambient-background/block.json` at runtime, so you must run a build before activating.

## Installation

1. Run `npm run build`.
2. Copy or symlink this folder into `wp-content/plugins/`.
3. Activate **Ambient Backgrounds** in the WordPress admin.

## Roadmap

- Additional background types (selectable from a dropdown)
- Color picker for background color (currently a CSS string field)
- More motion controls (speed, blur strength, lifetime)
