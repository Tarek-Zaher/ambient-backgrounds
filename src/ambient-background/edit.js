import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InnerBlocks,
	InspectorControls,
	PanelColorSettings,
} from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	TextControl,
	ToggleControl,
	SelectControl,
} from '@wordpress/components';
import { useEffect, useRef } from '@wordpress/element';
import { startBackground } from './background';

export default function Edit({ attributes, setAttributes }) {
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
		const cleanup = startBackground(bgRef.current, {
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
		});
		return cleanup;
	}, [
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
	]);

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Background', 'ambient-backgrounds')}>
					<SelectControl
						label={__('Type', 'ambient-backgrounds')}
						value={backgroundType}
						options={[
							{ label: __('Blur', 'ambient-backgrounds'), value: 'blur' },
							{
								label: __('Starfield', 'ambient-backgrounds'),
								value: 'starfield',
							},
						]}
						onChange={(v) => setAttributes({ backgroundType: v })}
					/>
				</PanelBody>

				{backgroundType === 'blur' && (
					<>
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
								help={__(
									'0=red, 120=green, 220=blue, 300=magenta',
									'ambient-backgrounds'
								)}
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
								help={__(
									'Any valid CSS color, e.g. hsla(0,0%,5%,1) or #111111',
									'ambient-backgrounds'
								)}
							/>
							<ToggleControl
								label={__('Cycle hue over time', 'ambient-backgrounds')}
								checked={cycleHue}
								onChange={(v) => setAttributes({ cycleHue: v })}
								help={__(
									'Slowly shifts all circle colors as the animation runs.',
									'ambient-backgrounds'
								)}
							/>
							{cycleHue && (
								<RangeControl
									label={__('Hue cycle speed', 'ambient-backgrounds')}
									value={hueSpeed}
									onChange={(v) => setAttributes({ hueSpeed: v })}
									min={0}
									max={1}
									step={0.05}
								/>
							)}
						</PanelBody>
					</>
				)}

				{backgroundType === 'starfield' && (
					<>
						<PanelBody title={__('Stars', 'ambient-backgrounds')}>
							<RangeControl
								label={__('Star count', 'ambient-backgrounds')}
								value={starCount}
								onChange={(v) => setAttributes({ starCount: v })}
								min={100}
								max={20000}
								step={100}
							/>
							<RangeControl
								label={__('Speed', 'ambient-backgrounds')}
								value={speedFactor}
								onChange={(v) => setAttributes({ speedFactor: v })}
								min={0}
								max={1}
								step={0.01}
							/>
						</PanelBody>
						<PanelBody title={__('Warp on press', 'ambient-backgrounds')}>
							<ToggleControl
								label={__('Speed up while pressed', 'ambient-backgrounds')}
								checked={warpOnPress}
								onChange={(v) => setAttributes({ warpOnPress: v })}
								help={__(
									'While the pointer or finger is held down on the block, the stars accelerate.',
									'ambient-backgrounds'
								)}
							/>
							{warpOnPress && (
								<RangeControl
									label={__('Warp speed', 'ambient-backgrounds')}
									value={warpSpeedFactor}
									onChange={(v) => setAttributes({ warpSpeedFactor: v })}
									min={0}
									max={2}
									step={0.05}
								/>
							)}
						</PanelBody>
						<PanelColorSettings
							title={__('Color', 'ambient-backgrounds')}
							colorSettings={[
								{
									value: starColor,
									onChange: (v) =>
										setAttributes({ starColor: v || '#ffffff' }),
									label: __('Star color', 'ambient-backgrounds'),
								},
							]}
						>
							<TextControl
								label={__('Background color (CSS)', 'ambient-backgrounds')}
								value={backgroundColor}
								onChange={(v) => setAttributes({ backgroundColor: v })}
								help={__(
									'Any valid CSS color, e.g. #000000 or hsla(0,0%,5%,1)',
									'ambient-backgrounds'
								)}
							/>
						</PanelColorSettings>
					</>
				)}
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
