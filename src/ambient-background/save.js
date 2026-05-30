import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const {
		backgroundType,
		backgroundColor,
		circleCount,
		baseRadius,
		rangeRadius,
		startingHue,
		rangeHue,
		cycleHue,
		hueSpeed,
		starCount,
		speedFactor,
		starColor,
		warpOnPress,
		warpSpeedFactor,
	} = attributes;

	const blockProps = useBlockProps.save({
		style: { position: 'relative', overflow: 'hidden' },
		'data-background-type': backgroundType,
		'data-background-color': backgroundColor,
		'data-circle-count': circleCount,
		'data-base-radius': baseRadius,
		'data-range-radius': rangeRadius,
		'data-starting-hue': startingHue,
		'data-range-hue': rangeHue,
		'data-cycle-hue': cycleHue,
		'data-hue-speed': hueSpeed,
		'data-star-count': starCount,
		'data-speed-factor': speedFactor,
		'data-star-color': starColor,
		'data-warp-on-press': warpOnPress,
		'data-warp-speed-factor': warpSpeedFactor,
	});

	return (
		<div {...blockProps}>
			<div
				className="ambient-background-canvas"
				style={{
					position: 'absolute',
					inset: 0,
					overflow: 'hidden',
					pointerEvents: 'none',
					zIndex: 0,
				}}
			/>
			<div
				className="ambient-background-content"
				style={{ position: 'relative', zIndex: 1 }}
			>
				<InnerBlocks.Content />
			</div>
		</div>
	);
}
