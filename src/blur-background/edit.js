import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InnerBlocks,
	InspectorControls,
} from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	TextControl,
} from '@wordpress/components';
import { useEffect, useRef } from '@wordpress/element';
import { startBlurBackground } from './animation';

export default function Edit({ attributes, setAttributes }) {
	const {
		circleCount,
		baseRadius,
		rangeRadius,
		startingHue,
		rangeHue,
		backgroundColor,
	} = attributes;

	const blockProps = useBlockProps({
		style: {
			position: 'relative',
			minHeight: '400px',
			overflow: 'hidden',
		},
	});

	const bgRef = useRef(null);

	useEffect(() => {
		if (!bgRef.current) return undefined;
		const cleanup = startBlurBackground(bgRef.current, {
			circleCount,
			baseRadius,
			rangeRadius,
			startingHue,
			rangeHue,
			backgroundColor,
		});
		return cleanup;
	}, [
		circleCount,
		baseRadius,
		rangeRadius,
		startingHue,
		rangeHue,
		backgroundColor,
	]);

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Animation', 'ambient-backgrounds')}>
					<RangeControl
						label={__('Circle count', 'ambient-backgrounds')}
						value={circleCount}
						onChange={(v) => setAttributes({ circleCount: v })}
						min={1}
						max={500}
					/>
					<RangeControl
						label={__('Base radius', 'ambient-backgrounds')}
						value={baseRadius}
						onChange={(v) => setAttributes({ baseRadius: v })}
						min={10}
						max={500}
					/>
					<RangeControl
						label={__('Radius range', 'ambient-backgrounds')}
						value={rangeRadius}
						onChange={(v) => setAttributes({ rangeRadius: v })}
						min={0}
						max={500}
					/>
				</PanelBody>
				<PanelBody title={__('Color', 'ambient-backgrounds')}>
					<RangeControl
						label={__('Starting hue', 'ambient-backgrounds')}
						value={startingHue}
						onChange={(v) => setAttributes({ startingHue: v })}
						min={0}
						max={360}
						help={__('0=red, 120=green, 220=blue, 300=magenta', 'ambient-backgrounds')}
					/>
					<RangeControl
						label={__('Hue range', 'ambient-backgrounds')}
						value={rangeHue}
						onChange={(v) => setAttributes({ rangeHue: v })}
						min={0}
						max={360}
					/>
					<TextControl
						label={__('Background color (CSS)', 'ambient-backgrounds')}
						value={backgroundColor}
						onChange={(v) => setAttributes({ backgroundColor: v })}
						help={__('Any valid CSS color, e.g. hsla(0,0%,5%,1) or #111111', 'ambient-backgrounds')}
					/>
				</PanelBody>
			</InspectorControls>
			<div {...blockProps}>
				<div
					ref={bgRef}
					style={{
						position: 'absolute',
						inset: 0,
						overflow: 'hidden',
						pointerEvents: 'none',
						zIndex: 0,
					}}
				/>
				<div style={{ position: 'relative', zIndex: 1 }}>
					<InnerBlocks />
				</div>
			</div>
		</>
	);
}
