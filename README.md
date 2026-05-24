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

## Testing with wp-env

[wp-env](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-env/) runs a local WordPress site in Docker. Add a `.wp-env.json` in the project root so this folder is mounted as a plugin:

```json
{
  "plugins": [ "." ]
}
```

### Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (or another Docker engine) installed and running
- Node.js 18+

### Start the environment

```sh
npm install
npm run build
npx @wordpress/env start
```

On first run, Docker images are downloaded; this can take a few minutes.

| URL | Purpose |
| --- | --- |
| http://localhost:8888 | Site front end |
| http://localhost:8888/wp-admin | Admin (login below) |

Default credentials: **admin** / **password**

### Test the plugin

1. In **Plugins**, activate **Ambient Backgrounds**.
2. Create or edit a page (or post).
3. Insert the **Ambient Background** block, adjust settings in the sidebar, and add inner blocks if you like.
4. Preview or view the page on the front end to confirm the animation runs behind your content.

While developing block assets, run `npm start` in a second terminal; changes rebuild into `build/` and the editor picks them up on refresh.

### Stop or reset

```sh
npx @wordpress/env stop
npx @wordpress/env destroy   # remove containers and volumes
```

## Installation

1. Run `npm run build`.
2. Copy or symlink this folder into `wp-content/plugins/`.
3. Activate **Ambient Backgrounds** in the WordPress admin.

## Roadmap

- Additional background types (selectable from a dropdown)
- Better default formatting for Inner Blocks
