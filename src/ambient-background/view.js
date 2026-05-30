import { startBackground } from './background';

function init() {
	const blocks = document.querySelectorAll(
		'.wp-block-ambient-backgrounds-ambient-background'
	);

	blocks.forEach((block) => {
		const canvas = block.querySelector('.ambient-background-canvas');
		if (!canvas) return;

		startBackground(canvas, {
			backgroundType: block.dataset.backgroundType || 'blur',
			backgroundColor: block.dataset.backgroundColor || 'hsla(0,0%,5%,1)',
			circleCount: Number(block.dataset.circleCount) || 150,
			baseRadius: Number(block.dataset.baseRadius) || 100,
			rangeRadius: Number(block.dataset.rangeRadius) || 200,
			startingHue: Number(block.dataset.startingHue) || 220,
			rangeHue: Number(block.dataset.rangeHue) || 60,
			cycleHue: block.dataset.cycleHue === 'true',
			hueSpeed: Number(block.dataset.hueSpeed) || 1,
			starCount: Number(block.dataset.starCount) || 5000,
			speedFactor: Number(block.dataset.speedFactor) || 0.05,
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
