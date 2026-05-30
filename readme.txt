=== Ambient Backgrounds ===
Contributors: tarekzaher
Tags: background, ambient, animation, blur, starfield
Requires at least: 6.4
Tested up to: 6.8
Requires PHP: 7.4
Stable tag: 0.1.0
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Add animated, customizable ambient background blocks — a soft blur or a flying starfield — behind any content in the block editor.

== Description ==

Ambient Backgrounds adds animated, ambient, and fully customizable background blocks to the WordPress block editor (Gutenberg). Drop a background block onto any page, place your content inside it like any other block, and tune the animation from the block sidebar to match your brand.

The plugin currently provides two background types, each a native block:

* **Ambient Background** — soft, noise-driven blurred circles that fade, swirl, and drift. Customize the circle count, radius, color hues, background color, and an optional slow hue cycle.
* **Starfield** — a perspective starfield flying toward the viewer, with an optional "warp on press" speed boost. Customize the star count, speed, star color, and background color.

Both blocks render a live animated preview directly in the editor and support inner blocks, so any content you add sits cleanly on top of the animation.

All animation runs on the client with the HTML canvas API. The plugin makes no external or remote calls.

The complete, un-minified source (including the build tooling) is available on GitHub: https://github.com/Tarek-Zaher/ambient-backgrounds

== Features ==

* Block-editor native (Gutenberg), no shortcodes
* Live animated preview inside the editor
* Two background types: Ambient blur and Starfield
* Customizable colors, speed, and animation parameters via the block sidebar
* Inner blocks: place any content on top of the background
* Wide and full alignment support

== Installation ==

1. Upload the `ambient-backgrounds` folder to the `/wp-content/plugins/` directory, or install the plugin through the **Plugins** screen in WordPress.
2. Activate the plugin through the **Plugins** screen in WordPress.
3. Edit any page or post, click the block inserter, and add the **Ambient Background** or **Starfield** block.
4. Add your content inside the block and adjust the animation settings in the block sidebar.

== Frequently Asked Questions ==

= Where do these blocks appear in the inserter? =

Both blocks are listed under the **Design** category. Search for "ambient", "background", or "starfield".

= Can I put text and other blocks on top of the animation? =

Yes. Each background block supports inner blocks, so you can add headings, paragraphs, buttons, columns, or any other block on top of the animation.

= Does the plugin load anything from a remote server? =

No. All animation runs in the browser using the canvas API. The plugin makes no external HTTP requests.

= Will the animation slow down my site? =

The animation only runs on pages where you add a background block, and it uses `requestAnimationFrame` so it pauses when the tab is in the background. You can lower the circle or star count in the block sidebar to reduce the workload on lower-powered devices.

== Changelog ==

= 0.1.0 =
* Initial release.
* Adds the Ambient Background block (noise-driven blurred circles).
* Adds the Starfield block (perspective starfield with optional warp-on-press).
