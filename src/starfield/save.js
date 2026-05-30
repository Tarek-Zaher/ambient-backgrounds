import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const {
		starCount,
		speedFactor,
		backgroundColor,
		starColor,
		warpOnPress,
		warpSpeedFactor,
	} = attributes;

	const blockProps = useBlockProps.save({
		style: { position: 'relative', overflow: 'hidden' },
		'data-star-count': starCount,
		'data-speed-factor': speedFactor,
		'data-background-color': backgroundColor,
		'data-star-color': starColor,
		'data-warp-on-press': warpOnPress,
		'data-warp-speed-factor': warpSpeedFactor,
	});

	return (
		<div {...blockProps}>
			<div
				className="starfield-canvas"
				style={{
					position: 'absolute',
					inset: 0,
					overflow: 'hidden',
					pointerEvents: 'none',
					zIndex: 0,
				}}
			/>
			<div
				className="starfield-content"
				style={{ position: 'relative', zIndex: 1 }}
			>
				<InnerBlocks.Content />
			</div>
		</div>
	);
}
