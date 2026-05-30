import { startBackground } from './background';

// Read helpers that only fall back when a value is genuinely absent.
// A plain `Number(x) || default` would treat a legitimate 0 (e.g. speed 0)
// as "missing" and overwrite it with the default, so the frontend would
// disagree with the editor for any value the user sets to zero.
const numAttr = (raw, fallback) => {
	if (raw === undefined || raw === '') return fallback;
	const n = Number(raw);
	return Number.isNaN(n) ? fallback : n;
};
const strAttr = (raw, fallback) =>
	raw === undefined || raw === '' ? fallback : raw;
const boolAttr = (raw, fallback) =>
	raw === undefined || raw === '' ? fallback : raw === 'true';

function init() {
	const blocks = document.querySelectorAll(
		'.wp-block-ambient-backgrounds-ambient-background'
	);

	blocks.forEach((block) => {
		const canvas = block.querySelector('.ambient-background-canvas');
		if (!canvas) return;

		const d = block.dataset;
		startBackground(canvas, {
			backgroundType: strAttr(d.backgroundType, 'blur'),
			backgroundColor: strAttr(d.backgroundColor, 'hsla(0,0%,5%,1)'),
			circleCount: numAttr(d.circleCount, 150),
			baseRadius: numAttr(d.baseRadius, 100),
			rangeRadius: numAttr(d.rangeRadius, 200),
			startingHue: numAttr(d.startingHue, 220),
			rangeHue: numAttr(d.rangeHue, 60),
			cycleHue: boolAttr(d.cycleHue, false),
			hueSpeed: numAttr(d.hueSpeed, 1),
			starCount: numAttr(d.starCount, 5000),
			speedFactor: numAttr(d.speedFactor, 0.05),
			starColor: strAttr(d.starColor, '#ffffff'),
			warpOnPress: boolAttr(d.warpOnPress, true),
			warpSpeedFactor: numAttr(d.warpSpeedFactor, undefined),
		});
	});
}

if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', init);
} else {
	init();
}
