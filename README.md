# Ambient Backgrounds

A WordPress plugin that adds an animated, ambient, and customizable background block to the page editor. After activating the plugin you will see **Ambient Background** in your list of block options. Add it to the page like any other block and add any content inside. Pick a background style — **Blur** or **Starfield** — from the **Type** dropdown, and customize the animation in the Block Editor side panel to match your brand or liking.

## Features

- Block-editor native (Gutenberg)
- Live animated preview inside the editor
- Selectable background styles (Blur and Starfield) from a dropdown
- Customizable colors and animations
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

## Testing with wp-env

Follow the steps outlined in the official WordPress Developer Docs [here](https://developer.wordpress.org/block-editor/getting-started/devenv/get-started-with-wp-env/) to test the plugin using wp-env.

## Roadmap

- Additional background types in the Type dropdown
- Better default formatting for Inner Blocks
