import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InnerBlocks,
	InspectorControls,
	PanelColorSettings,
} from '@wordpress/block-editor';
import { PanelBody, RangeControl, ToggleControl } from '@wordpress/components';
import { useEffect, useRef } from '@wordpress/element';
import { startStarfield } from './animation';

export default function Edit({ attributes, setAttributes }) {
	const {
		starCount,
		speedFactor,
		backgroundColor,
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
		const cleanup = startStarfield(bgRef.current, {
			starCount,
			speedFactor,
			backgroundColor,
			starColor,
			warpOnPress,
			warpSpeedFactor,
		});
		return cleanup;
	}, [
		starCount,
		speedFactor,
		backgroundColor,
		starColor,
		warpOnPress,
		warpSpeedFactor,
	]);

	return (
		<>
			<InspectorControls>
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
					title={__('Colors', 'ambient-backgrounds')}
					colorSettings={[
						{
							value: starColor,
							onChange: (v) =>
								setAttributes({ starColor: v || '#ffffff' }),
							label: __('Star color', 'ambient-backgrounds'),
						},
						{
							value: backgroundColor,
							onChange: (v) =>
								setAttributes({ backgroundColor: v || '#000000' }),
							label: __('Background color', 'ambient-backgrounds'),
						},
					]}
				/>
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
