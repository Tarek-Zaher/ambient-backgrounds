import { startStarfield } from './animation';

function init() {
	const blocks = document.querySelectorAll(
		'.wp-block-ambient-backgrounds-starfield'
	);

	blocks.forEach((block) => {
		const canvas = block.querySelector('.starfield-canvas');
		if (!canvas) return;

		startStarfield(canvas, {
			starCount: Number(block.dataset.starCount) || 5000,
			speedFactor: Number(block.dataset.speedFactor) || 0.05,
			backgroundColor: block.dataset.backgroundColor || '#000000',
			starColor: block.dataset.starColor || '#ffffff',
			warpOnPress: block.dataset.warpOnPress === 'true',
			warpSpeedFactor: Number(block.dataset.warpSpeedFactor) || undefined,
		});
	});
}

if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', init);
} else {
	init();
}
