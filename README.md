# Ambient Backgrounds

A WordPress plugin that adds animated, ambient, and customizable background blocks to the page editor. After activating the plugin you will see **Ambient Background** in your list of block options. Add it to the page like any other block and add any content inside. Customize the animation in the Block Editor SidePanel to match your brand or liking.

## Features

- Block-editor native (Gutenberg)
- Live animated preview inside the editor
- Customizable colors and animations.
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
- Better default formatting for Inner Blocks
