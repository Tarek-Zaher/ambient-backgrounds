<?php
/**
 * Plugin Name:       Ambient Backgrounds
 * Description:       Adds animated ambient background blocks with inner content support.
 * Version:           0.1.0
 * Requires at least: 6.4
 * Requires PHP:      7.4
 * Author:            Tarek Zaher
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       ambient-backgrounds
 *
 * @package AmbientBackgrounds
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function ambient_backgrounds_register_blocks() {
	register_block_type( __DIR__ . '/build/ambient-background' );
	register_block_type( __DIR__ . '/build/starfield' );
}
add_action( 'init', 'ambient_backgrounds_register_blocks' );
