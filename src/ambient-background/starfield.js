/**
 * Canvas animation: a perspective starfield flying toward the viewer.
 * One of the background styles offered by the Ambient Background block.
 *
 * Adapted from the Starfield component so it lives inside a block container
 * (sized to the container, not the whole window) and cleans up after itself.
 */

const STAR_FIELD_WIDTH = 1600;
const STAR_FIELD_HEIGHT = 900;
const STAR_DEPTH = 1000;

/** Parse a CSS hex color into an [r, g, b] triple. Falls back to white. */
function hexToRgb(hex) {
	if (Array.isArray(hex)) return hex;
	const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(
		String(hex).trim()
	);
	if (!m) return [255, 255, 255];
	return [parseInt(m[1], 16), parseInt(m[2], 16), parseInt(m[3], 16)];
}

/**
 * Start the starfield animation inside `container`.
 * Returns a cleanup function that tears it down.
 */
export function startStarfield(container, options = {}) {
	const {
		starCount = 5000,
		speedFactor = 0.05,
		backgroundColor = 'black',
		starColor = '#ffffff',
		warpOnPress = true,
		warpSpeedFactor,
	} = options;

	const [sr, sg, sb] = hexToRgb(starColor);

	const canvas = document.createElement('canvas');
	canvas.style.cssText =
		'position:absolute;top:0;left:0;width:100%;height:100%;';
	container.appendChild(canvas);
	const c = canvas.getContext('2d');
	if (!c) return () => {};

	let w = container.offsetWidth;
	let h = container.offsetHeight;

	function setCanvasExtents() {
		w = container.offsetWidth;
		h = container.offsetHeight;
		canvas.width = w;
		canvas.height = h;
	}
	setCanvasExtents();

	function makeStars(count) {
		const out = [];
		for (let i = 0; i < count; i++) {
			out.push({
				x: Math.random() * STAR_FIELD_WIDTH - STAR_FIELD_WIDTH / 2,
				y: Math.random() * STAR_FIELD_HEIGHT - STAR_FIELD_HEIGHT / 2,
				z: Math.random() * STAR_DEPTH,
			});
		}
		return out;
	}

	const stars = makeStars(starCount);

	const baseSpeed = speedFactor;
	const warpSpeed = warpSpeedFactor ?? speedFactor * 4;
	let targetSpeed = baseSpeed;
	let liveSpeed = baseSpeed;

	const press = () => {
		if (warpOnPress) targetSpeed = warpSpeed;
	};
	const release = () => {
		targetSpeed = baseSpeed;
	};

	function clear() {
		c.fillStyle = backgroundColor;
		c.fillRect(0, 0, canvas.width, canvas.height);
	}

	function putStar(x, y, brightness, radius) {
		const alpha = Math.min(1, brightness);
		c.fillStyle = `rgba(${sr},${sg},${sb},${alpha})`;
		c.beginPath();
		c.arc(x, y, radius, 0, Math.PI * 2);
		c.fill();
	}

	function moveStars(distance) {
		for (let i = 0; i < stars.length; i++) {
			const s = stars[i];
			s.z -= distance;
			while (s.z <= 1) s.z += STAR_DEPTH;
		}
	}

	let rafId;
	let prevTime;

	function tick(time) {
		const elapsed = time - prevTime;
		prevTime = time;

		// Smooth, frame-rate-independent easing toward the target speed.
		const k = 1 - Math.pow(0.0001, elapsed / 1000);
		liveSpeed += (targetSpeed - liveSpeed) * k;
		moveStars(elapsed * liveSpeed);

		clear();

		const cx = w / 2;
		const cy = h / 2;

		for (let i = 0; i < stars.length; i++) {
			const star = stars[i];
			const x = cx + star.x / (star.z * 0.001);
			const y = cy + star.y / (star.z * 0.001);
			if (x < 0 || x >= w || y < 0 || y >= h) continue;

			const d = star.z / STAR_DEPTH;
			const b = Math.min(1, Math.max(0.25, Math.pow(1 - d, 0.65) * 1.25));
			const radius = 0.5 + (1 - d) * 1.5;
			putStar(x, y, b, radius);
		}

		rafId = requestAnimationFrame(tick);
	}

	function init(time) {
		prevTime = time;
		rafId = requestAnimationFrame(tick);
	}
	rafId = requestAnimationFrame(init);

	const observer = new ResizeObserver(() => setCanvasExtents());
	observer.observe(container);

	// Warp-on-press: speed up while the pointer/finger is held down on the block.
	// The canvas container itself has pointer-events disabled, so listen on the
	// block wrapper (its parent), which receives events from the inner content.
	const pressTarget = container.parentElement || container;
	// Release on the container's own window. In the editor the block renders
	// inside an iframe, so the global `window` never sees its mouseup/touchend;
	// the owning document's window does (and on the frontend this is just window).
	const releaseTarget = container.ownerDocument.defaultView || window;
	pressTarget.addEventListener('mousedown', press);
	pressTarget.addEventListener('touchstart', press, { passive: true });
	releaseTarget.addEventListener('mouseup', release);
	releaseTarget.addEventListener('touchend', release);
	releaseTarget.addEventListener('touchcancel', release);

	return () => {
		cancelAnimationFrame(rafId);
		observer.disconnect();
		pressTarget.removeEventListener('mousedown', press);
		pressTarget.removeEventListener('touchstart', press);
		releaseTarget.removeEventListener('mouseup', release);
		releaseTarget.removeEventListener('touchend', release);
		releaseTarget.removeEventListener('touchcancel', release);
		if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
	};
}
