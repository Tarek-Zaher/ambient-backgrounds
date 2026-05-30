/**
 * Dispatcher: starts the correct background animation for the chosen
 * `backgroundType`. Shared by the editor preview (edit.js) and the
 * frontend (view.js) so the type-to-animation mapping lives in one place.
 *
 * Returns the cleanup function from whichever animation was started.
 */

import { startAmbientBackground } from './animation';
import { startStarfield } from './starfield';

export function startBackground(container, options = {}) {
	const { backgroundType = 'blur', ...rest } = options;

	if (backgroundType === 'starfield') {
		return startStarfield(container, rest);
	}
	return startAmbientBackground(container, rest);
}
