import memoize from 'micro-memoize';
import get from 'lodash/get'


// Sprite config used by getSprite()
const sprites = {
	// All these sprite 'variants' will be searched for within each sub-path
	variants: ['default', 'female', 'shiny', 'shiny_female'],

	// These 'paths' specify where to look for sprites within the item. They must end with a '.'
	// Small-sprite paths prioritize smaller sprites, which are also likely to have 'back' images
	smallSpritePaths: ['sprites.', 'sprites.other.official-artwork.', 'sprites.other.home.'],
	// Large-sprite paths prioritizes sub-paths that often are high-resolution sprites (512px)
	largeSpritePaths: ['sprites.other.home.', 'sprites.other.official-artwork.', 'sprites.'],
};


/**
 * Helper to find the best available sprite-URL for each data item.
 * There are many possible sprites within an item, but every item includes different ones.
 * This helper finds a sprite for every item by searching _multiple_ sub-paths and sprite-variants.
 *
 * @type {memoize.Memoized<function(Object, string=, string=): *>}
 * @param {Object} item     A details item containing sprite URLs
 * @param {string} [size]   One of 'small' or 'large'
 * @param {string} [side]   One of 'front' or 'back'
 */
const getSprite = memoize((item, size = 'small', side = 'front') => {
	const paths = sprites[`${size}SpritePaths`];

	const findInPath = path => sprites.variants.reduce((url, type) => (
		url || get(item, `${path}${side}_${type}`)
	), '');

	// Find first available sprite using paths & variants specified
	return (
		findInPath(paths[0]) ||
		findInPath(paths[1]) ||
		findInPath(paths[2]) ||
		''
	)
});


function showSpriteFront(item, elem, size = 'small') {
	try {
		const sprite = getSprite(item, size, 'front');
		if (sprite) elem.firstChild.src = sprite;
	} catch (e) {}
}

function showSpriteBack(item, elem, size = 'small') {
	try {
		const sprite = getSprite(item, size, 'back');
		if (sprite) elem.firstChild.src = sprite;
	} catch (e) {}
}

export { getSprite, showSpriteFront, showSpriteBack };
