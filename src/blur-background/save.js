import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const {
		circleCount,
		baseRadius,
		rangeRadius,
		startingHue,
		rangeHue,
		backgroundColor,
	} = attributes;

	const blockProps = useBlockProps.save({
		style: { position: 'relative', overflow: 'hidden' },
		'data-circle-count': circleCount,
		'data-base-radius': baseRadius,
		'data-range-radius': rangeRadius,
		'data-starting-hue': startingHue,
		'data-range-hue': rangeHue,
		'data-background-color': backgroundColor,
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
