import { startBlurBackground } from './animation';

function init() {
	const blocks = document.querySelectorAll(
		'.wp-block-ambient-backgrounds-blur-background'
	);

	blocks.forEach((block) => {
		const canvas = block.querySelector('.ambient-background-canvas');
		if (!canvas) return;

		startBlurBackground(canvas, {
			circleCount: Number(block.dataset.circleCount) || 150,
			baseRadius: Number(block.dataset.baseRadius) || 100,
			rangeRadius: Number(block.dataset.rangeRadius) || 200,
			startingHue: Number(block.dataset.startingHue) || 220,
			rangeHue: Number(block.dataset.rangeHue) || 60,
			backgroundColor:
				block.dataset.backgroundColor || 'hsla(0,0%,5%,1)',
		});
	});
}

if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', init);
} else {
	init();
}
